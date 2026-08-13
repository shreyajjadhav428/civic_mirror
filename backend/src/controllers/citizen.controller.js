import { supabase } from '../config/supabase.js';

/**
 * GET /api/citizen/stats
 * Fetches personal complaint metrics for the logged-in citizen.
 */
export const getCitizenStats = async (req, res) => {
  try {
    const citizenId = req.user.userId;

    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('status')
      .eq('citizen_id', citizenId); // Assumes we add citizen_id to complaints table when they submit

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
    const citizenId = req.user.userId;

    const { data: history, error } = await supabase
      .from('chat_sessions')
      .select('id, prompt, pincode, created_at')
      .eq('citizen_id', citizenId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ status: 'success', data: history || [] });
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