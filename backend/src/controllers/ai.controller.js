import { generateExplainableAnswer } from '../services/gemini.service.js';
import { supabase } from '../config/supabase.js';

/**
 * POST /api/ai/ask
 * Returns guaranteed structured decision JSON for the frontend UI.
 */
export const askCivicMirror = async (req, res) => {
  try {
    const { prompt, pincode } = req.body;

    if (!prompt || !pincode) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'Both prompt and pincode are required.'
      });
    }

    // Retrieve active projects with complete fields for pincode
    const { data: localProjects, error: dbError } = await supabase
      .from('projects')
      .select(`
        project_code, 
        title, 
        category, 
        pincode,
        status, 
        progress, 
        expected_completion, 
        departments(name),
        budgets(total_allocated, spent)
      `)
      .eq('pincode', pincode)
      .in('status', ['In Progress', 'Planning']);

    if (dbError) throw dbError;

    // Generate structured JSON decision card content
    const decisionCardData = await generateExplainableAnswer(prompt, localProjects || []);

    return res.status(200).json({
      status: 'success',
      data: decisionCardData
    });

  } catch (error) {
    console.error('Error in AI controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};