import { analyzePromptForTools, generateExplainableAnswer } from '../services/gemini.service.js';
import { supabase } from '../config/supabase.js';
import { packageEvidenceForAI } from '../utils/evidence.formatter.js';
import { generateEmbedding } from '../services/embedding.service.js';
import { searchSimilarDocumentsRepo } from '../repositories/document.repository.js';

export const askCivicMirror = async (req, res) => {
  try {
    const { prompt, user_id } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'BadRequest', message: 'A prompt is required.' });
    }

    // Guard: reject prompts that are too long or clearly not text
    if (typeof prompt !== 'string') {
      return res.status(400).json({ error: 'BadRequest', message: 'Prompt must be a text string.' });
    }
    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'BadRequest', message: 'Prompt exceeds the 2000 character limit. Please shorten your message.' });
    }

    let localProjects = [];
    let localDocuments = []; 
    let detectedPincode = null;
    let detectedCategory = null;
    let userPincode = '110025';
    let userArea = 'Shanti Nagar';

    // 0. Auto-resolve citizen profile pincode & area from Supabase users table
    if (user_id) {
      const { data: userProfile } = await supabase
        .from('users')
        .select('pincode, area')
        .eq('id', user_id)
        .maybeSingle();

      if (userProfile?.pincode) userPincode = userProfile.pincode;
      if (userProfile?.area) userArea = userProfile.area;
    }

    // Fallback: If no userProfile found by ID, fetch first user profile from Supabase users table
    if (!userPincode || userPincode === '110025') {
      const { data: firstUser } = await supabase
        .from('users')
        .select('pincode, area')
        .limit(1)
        .maybeSingle();

      if (firstUser?.pincode) userPincode = firstUser.pincode;
      if (firstUser?.area) userArea = firstUser.area;
    }

    // 1. Pincode extraction from prompt text or user profile
    const pincodeMatch = prompt.match(/\b\d{6}\b/);
    if (pincodeMatch) {
      detectedPincode = pincodeMatch[0];
    } else {
      detectedPincode = userPincode;
    }

    const effectivePrompt = pincodeMatch ? prompt : `${prompt} (Citizen Location Context: Area ${userArea}, Pincode ${userPincode})`;

    // 1. Direct project code search if citizen references a code (e.g. PRJ-EL-101, PRJ-999)
    const codeMatch = prompt.match(/\b(PRJ-[A-Z0-9-]+|[A-Z]{2,4}-\d+)\b/i);
    let directProject = null;
    if (codeMatch) {
      const { data: codeData } = await supabase
        .from('projects')
        .select('id, project_code, title, category, pincode, status, progress, expected_completion, department_id, departments(name, code), budgets(total_allocated, spent, people_affected)')
        .ilike('project_code', `%${codeMatch[0]}%`)
        .limit(1);
      if (codeData && codeData.length > 0) {
        directProject = codeData[0];
      }
    }

    // 2. Query all active & ongoing municipal projects in citizen's area
    let query = supabase
      .from('projects')
      .select('id, project_code, title, category, pincode, status, progress, expected_completion, department_id, departments(name, code), budgets(total_allocated, spent, people_affected)')
      .eq('pincode', detectedPincode)
      .in('status', ['In Progress', 'Planning', 'Completed']);

    const { data: areaProjects } = await query;
    let allAreaProjects = areaProjects || [];

    if (directProject && !allAreaProjects.some(p => p.id === directProject.id)) {
      allAreaProjects = [directProject, ...allAreaProjects];
    }

    localProjects = allAreaProjects;

    // RAG Document Similarity Search (pgvector)
    if (detectedPincode) {
      try {
        const promptEmbedding = await generateEmbedding(prompt);
        const similarDocs = await searchSimilarDocumentsRepo(promptEmbedding, detectedPincode, 0.3, 3);
        localDocuments = similarDocs || [];
      } catch (err) {
        // Gracefully ignore if RPC or documents table is not populated yet
      }
    }

    // 1. Package the evidence tightly for Gemini
    const packagedEvidence = packageEvidenceForAI(localProjects, localDocuments);

    // 2. Generate the explainable answer passing Supabase user profile context
    const decisionCardData = await generateExplainableAnswer(prompt, packagedEvidence, { userArea, userPincode });

    const activeCitizenId = user_id || 'user-citizen-1';
    const activePincode = decisionCardData.detectedPincode || detectedPincode || userPincode;
    decisionCardData.detectedPincode = activePincode;
    decisionCardData.detectedArea = userArea;

    // Check if input is spam, casual chatter, or off-topic text
    const isSpam = decisionCardData?.isSpam || false;

    if (isSpam) {
      // DO NOT CREATE COMPLAINT / DO NOT REGISTER IN SUPABASE
      return res.status(200).json({
        status: 'success',
        data: {
          is_spam: true,
          is_unique_request: false,
          admin_flagged: false,
          complaint_code: null,
          complaint: null,
          explanation: {
            summary: decisionCardData.summary || "This message does not appear to be a valid civic or municipal issue. If you genuinely have an infrastructure or municipal problem to report, please describe the issue details again so we can assist you.",
            reason: decisionCardData.reason || "Casual or off-topic input detected. No complaint ticket was created for administrative review.",
            status: "Invalid Input",
            priority: "None",
            expectedAction: "Please rephrase your prompt with a specific civic problem.",
            estimatedTimeline: "N/A",
            isUniqueRequest: false,
            isSpam: true,
            evidence: [],
            detectedCategory: decisionCardData.detectedCategory || "General",
            detectedPincode: activePincode
          },
          raw_sources: { projects: [], documents: [] }
        }
      });
    }

    // Check if an active project exists in the database evidence
    const isUnique = localProjects.length === 0;
    decisionCardData.isUniqueRequest = isUnique;
    if (!isUnique && localProjects.length > 0) {
      decisionCardData.status = localProjects[0].status || "In Progress";
    }

    // Persist chat session ONLY for genuine (non-spam) civic requests.
    // raw_sources are embedded inside ai_explanation so history restoration
    // can recover full project data without a schema change.
    try {
      await supabase.from('chat_sessions').insert([{
        citizen_id: activeCitizenId,
        prompt: prompt,
        pincode: activePincode,
        ai_explanation: JSON.stringify({
          ...decisionCardData,
          _raw_sources: { projects: localProjects, documents: localDocuments }
        })
      }]);
    } catch (e) {
      console.warn('Error recording chat_sessions:', e.message);
    }

    let createdComplaint = null;

    const finalPincode = decisionCardData.detectedPincode || detectedPincode || userPincode || '110025';
    const finalCategory = decisionCardData.detectedCategory || detectedCategory || 'General Infrastructure';
    const complaintCode = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const complaintId = `cmp-${Date.now()}`;

    let matchedProjectId = null;
    let matchedProject = null;
    let initialStatus = 'Pending';
    let adminFlagged = true;
    let defaultSummary = `Unique citizen prompt via AI agent. No active project found in pincode ${finalPincode}. Flagged for administrative review.`;

    if (!isUnique && localProjects.length > 0) {
      const refId = decisionCardData.evidence?.[0]?.reference_id;
      matchedProject = (refId && localProjects.find(p => p.project_code === refId || p.id === refId)) || localProjects[0];
      matchedProjectId = matchedProject.id || null;
      initialStatus = matchedProject.status || 'In Progress';
      adminFlagged = false;
      defaultSummary = `Associated with active project ${matchedProject.project_code || 'Ongoing'} (${matchedProject.title || 'Work'}). Scheduled completion: ${matchedProject.expected_completion || 'Ongoing'}.`;
    }

    const sortedProjects = matchedProject
      ? [matchedProject, ...localProjects.filter(p => p.id !== matchedProject.id)]
      : localProjects;

    const newComplaintData = {
      id: complaintId,
      complaint_code: complaintCode,
      user_id: activeCitizenId,
      description: prompt,
      category: finalCategory,
      pincode: finalPincode,
      status: initialStatus,
      project_id: matchedProjectId,
      admin_flagged: adminFlagged,
      ai_summary: decisionCardData.summary || defaultSummary
    };

    try {
      const { data: inserted, error: insertErr } = await supabase
        .from('complaints')
        .insert([newComplaintData])
        .select('*')
        .single();

      if (!insertErr && inserted) {
        createdComplaint = inserted;
      } else {
        createdComplaint = newComplaintData;
      }
    } catch (err) {
      console.warn('Error inserting complaint record:', err.message);
      createdComplaint = newComplaintData;
    }

    // 3. Return the response payload with assurance details & unique request flags
    return res.status(200).json({
      status: 'success',
      data: {
        is_unique_request: isUnique,
        admin_flagged: isUnique,
        complaint_code: createdComplaint ? createdComplaint.complaint_code : null,
        complaint: createdComplaint,
        explanation: decisionCardData,
        raw_sources: {
          projects: sortedProjects,
          documents: localDocuments
        }
      }
    });

  } catch (error) {
    console.error('Error in AI controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};