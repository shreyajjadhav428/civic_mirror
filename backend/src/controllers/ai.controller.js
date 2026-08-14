import { analyzePromptForTools, generateExplainableAnswer } from '../services/gemini.service.js';
import { supabase } from '../config/supabase.js';
import { packageEvidenceForAI } from '../utils/evidence.formatter.js';
import { generateEmbedding } from '../services/embedding.service.js';
import { searchSimilarDocumentsRepo } from '../repositories/document.repository.js';

export const askCivicMirror = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'BadRequest', message: 'A prompt is required.' });
    }

    let localProjects = [];
    let localDocuments = []; 
    let detectedPincode = null;
    let detectedCategory = null;

    // Fallback pincode extraction for 6-digit postal code (e.g., 110025, 400001, 560001)
    const pincodeMatch = prompt.match(/\b\d{6}\b/);
    if (pincodeMatch) {
      detectedPincode = pincodeMatch[0];
    }

    const analysisResponse = await analyzePromptForTools(prompt);

    if (analysisResponse.functionCalls && analysisResponse.functionCalls.length > 0) {
      const call = analysisResponse.functionCalls[0];
      
      if (call.name === 'search_projects') {
        const { pincode, category } = call.args;
        if (pincode) detectedPincode = pincode;
        if (category) detectedCategory = category;

        let query = supabase
          .from('projects')
          .select('project_code, title, category, status, progress, expected_completion, departments(name), budgets(total_allocated, spent)')
          .eq('pincode', detectedPincode)
          .in('status', ['In Progress', 'Planning']);
          
        if (detectedCategory) query = query.ilike('category', `%${detectedCategory}%`);
        
        const { data } = await query;
        localProjects = data || [];
      }
    } else if (detectedPincode) {
      let query = supabase
        .from('projects')
        .select('project_code, title, category, status, progress, expected_completion, departments(name), budgets(total_allocated, spent)')
        .eq('pincode', detectedPincode)
        .in('status', ['In Progress', 'Planning']);
      
      const { data } = await query;
      localProjects = data || [];
    }

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

    // 2. Generate the explainable answer
    const decisionCardData = await generateExplainableAnswer(prompt, packagedEvidence);

    // Check if an active project exists in the database evidence
    const isUnique = localProjects.length === 0;
    decisionCardData.isUniqueRequest = isUnique;
    if (!isUnique && localProjects.length > 0) {
      decisionCardData.status = localProjects[0].status || "In Progress";
    }

    let createdComplaint = null;

    if (isUnique) {
      // SCENARIO B: NO ACTIVE PROJECT -> Unique request automatically routed & flagged for Admin Dashboard
      const finalPincode = decisionCardData.detectedPincode || detectedPincode || '110025';
      const finalCategory = decisionCardData.detectedCategory || detectedCategory || 'General Infrastructure';
      const complaintCode = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
      const complaintId = `cmp-${Date.now()}`;

      const newComplaintData = {
        id: complaintId,
        complaint_code: complaintCode,
        description: prompt,
        category: finalCategory,
        pincode: finalPincode,
        status: 'Pending',
        project_id: null,
        admin_flagged: true,
        ai_summary: decisionCardData.summary || `Unique citizen prompt via AI agent. No active project found in pincode ${finalPincode}. Flagged for administrative review.`
      };

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

      // Log prompt into chat_sessions for query frequency tracking
      try {
        await supabase.from('chat_sessions').insert([{
          id: `chat-${Date.now()}`,
          prompt: prompt
        }]);
      } catch (e) {
        // Silently ignore if table not present
      }
    } else {
      // SCENARIO A: ACTIVE PROJECT MATCH -> Citizen reassured with active project details
      try {
        await supabase.from('chat_sessions').insert([{
          id: `chat-${Date.now()}`,
          prompt: prompt
        }]);
      } catch (e) {
        // Silently ignore if table not present
      }
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
          projects: localProjects,
          documents: localDocuments
        }
      }
    });

  } catch (error) {
    console.error('Error in AI controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};