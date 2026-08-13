import { supabase } from '../config/supabase.js';
import { generateDecisionIntelligence } from '../services/gemini.service.js';

/**
 * POST /api/ai/compare
 * Compares two or more municipal projects or sectors to explain priority decisions.
 */
export const comparePriorities = async (req, res) => {
  try {
    const { prompt, projectCodes } = req.body;

    if (!prompt || !projectCodes || !Array.isArray(projectCodes) || projectCodes.length < 2) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'A prompt and an array of at least 2 projectCodes are required for comparison.'
      });
    }

    // 1. Fetch complete data for all specified projects from Supabase
    const { data: projects, error } = await supabase
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
      .in('project_code', projectCodes);

    if (error) throw error;

    if (!projects || projects.length < 2) {
      return res.status(404).json({
        error: 'NotFound',
        message: 'Could not find sufficient project records in Supabase for the provided codes.'
      });
    }

    // 2. Generate comparative intelligence via Gemini
    const decisionIntelligence = await generateDecisionIntelligence(prompt, projects);

    return res.status(200).json({
      status: 'success',
      data: decisionIntelligence
    });

  } catch (error) {
    console.error('Error in decision controller:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};