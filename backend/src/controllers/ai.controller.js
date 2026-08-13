import { analyzePromptForTools, generateExplainableAnswer } from '../services/gemini.service.js';
import { supabase } from '../config/supabase.js';
import { packageEvidenceForAI } from '../utils/evidence.formatter.js';

export const askCivicMirror = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'BadRequest', message: 'A prompt is required.' });
    }

    let localProjects = [];
    let localDocuments = []; // Future-proofing for RAG tool calls

    const analysisResponse = await analyzePromptForTools(prompt);

    if (analysisResponse.functionCalls && analysisResponse.functionCalls.length > 0) {
      const call = analysisResponse.functionCalls[0];
      
      if (call.name === 'search_projects') {
        const { pincode, category } = call.args;
        let query = supabase
          .from('projects')
          .select('project_code, title, category, status, progress, expected_completion, departments(name), budgets(total_allocated, spent)')
          .eq('pincode', pincode)
          .in('status', ['In Progress', 'Planning']);
          
        if (category) query = query.ilike('category', `%${category}%`);
        
        const { data } = await query;
        localProjects = data || [];
      }
    }

    // 1. Package the evidence tightly for Gemini
    const packagedEvidence = packageEvidenceForAI(localProjects, localDocuments);

    // 2. Generate the explanation
    const decisionCardData = await generateExplainableAnswer(prompt, packagedEvidence);

    // 3. Return the AI reasoning PLUS the raw data payload for the frontend drawer
    return res.status(200).json({
      status: 'success',
      data: {
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