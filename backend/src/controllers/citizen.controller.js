import { supabase } from '../config/supabase.js';

/**
 * GET /api/citizen/stats
 * Fetches personal complaint metrics for the logged-in citizen.
 */
export const getCitizenStats = async (req, res) => {
  try {
    // Support both JWT-authenticated requests and dev-mode query-param fallback
    const citizenId = req.query?.user_id || req.user?.userId || 'user-citizen-1';

    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('status')
      .eq('user_id', citizenId); // correct column name — complaints table uses user_id

    if (error) throw error;

    const stats = {
      total: complaints?.length || 0,
      pending: complaints?.filter(c => c.status === 'Pending' || c.status === 'In Progress').length || 0,
      resolved: complaints?.filter(c => c.status === 'Resolved').length || 0
    };

    return res.status(200).json({ status: 'success', data: stats });
  } catch (error) {
    console.error('Error fetching citizen stats:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/citizen/history
 * Fetches the user's past AI chat sessions.
 */
export const getChatHistory = async (req, res) => {
  try {
    const citizenId = req.query.user_id || req.user?.userId || 'user-citizen-1';

    const { data: history, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('citizen_id', citizenId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const formattedSessions = (history || []).map((s) => {
      let parsedExplanation = null;
      try {
        parsedExplanation = typeof s.ai_explanation === 'string'
          ? JSON.parse(s.ai_explanation)
          : s.ai_explanation;
      } catch (e) {
        parsedExplanation = { summary: s.prompt };
      }

      // Extract _raw_sources that were embedded at persist time, then strip
      // the private key from the explanation object returned to the frontend.
      const rawSources = parsedExplanation?._raw_sources || { projects: [], documents: [] };
      const { _raw_sources, ...cleanExplanation } = parsedExplanation || {};

      return {
        id: s.id,
        prompt: s.prompt,
        pincode: s.pincode,
        explanation: cleanExplanation,
        raw_sources: rawSources,
        created_at: s.created_at
      };
    });

    return res.status(200).json({ status: 'success', data: formattedSessions });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/citizen/pincode/:pincode
 * Public version of pincode intelligence (safe for citizens, no sensitive admin data).
 */
export const getPublicPincodeData = async (req, res) => {
  try {
    const { pincode } = req.params;

    const { data: activeIssues } = await supabase
      .from('complaints')
      .select('category, status, created_at')
      .eq('pincode', pincode)
      .neq('status', 'Resolved');

    const { data: projects } = await supabase
      .from('projects')
      .select('title, category, status, progress, expected_completion')
      .eq('pincode', pincode);

    return res.status(200).json({
      status: 'success',
      data: {
        pincode,
        activeIssuesCount: activeIssues?.length || 0,
        projectsCount: projects?.length || 0,
        recentIssues: activeIssues?.slice(0, 5) || [], // Only show top 5 to citizens
        activeProjects: projects || []
      }
    });
  } catch (error) {
    console.error('Error fetching public pincode data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};