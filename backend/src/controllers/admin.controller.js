import { supabase } from '../config/supabase.js';
import { generateAdminClusterInsights } from '../services/admin.service.js';

/**
 * GET /api/admin/overview
 * Returns top-level dashboard metrics (Total, Pending, Resolved, Flagged).
 */
export const getAdminOverview = async (req, res) => {
  try {
    const { count: totalRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true });
    const { count: pendingRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
    const { count: resolvedRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'Resolved');
    const { count: flaggedRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('admin_flagged', true);

    return res.status(200).json({
      status: 'success',
      data: {
        totalRequests: totalRequests || 0,
        pending: pendingRequests || 0,
        resolved: resolvedRequests || 0,
        flaggedForReview: flaggedRequests || 0
      }
    });
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/clusters
 * Groups complaints by category and pincode to create actionable issue clusters.
 */
export const getComplaintClusters = async (req, res) => {
  try {
    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('id, category, pincode, status, admin_flagged, description, created_at');

    if (error) throw error;

    // Group complaints by Pincode + Category
    const clustersMap = {};

    (complaints || []).forEach(c => {
      const key = `${c.pincode}_${c.category}`;
      if (!clustersMap[key]) {
        clustersMap[key] = {
          clusterId: `cluster-${key.toLowerCase()}`,
          pincode: c.pincode,
          category: c.category,
          complaintCount: 0,
          unmatchedCount: 0,
          complaints: []
        };
      }
      clustersMap[key].complaintCount += 1;
      if (c.admin_flagged) clustersMap[key].unmatchedCount += 1;
      clustersMap[key].complaints.push(c);
    });

    const clusters = Object.values(clustersMap);

    return res.status(200).json({
      status: 'success',
      count: clusters.length,
      data: clusters
    });
  } catch (error) {
    console.error('Error fetching clusters:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/admin/insights
 * Generates AI-driven root cause analysis and recommendations for a specific complaint cluster.
 */
export const getClusterInsights = async (req, res) => {
  try {
    const { pincode, category } = req.body;

    if (!pincode || !category) {
      return res.status(400).json({ error: 'BadRequest', message: 'pincode and category are required.' });
    }

    const { data: complaints } = await supabase
      .from('complaints')
      .select('id, description, status, admin_flagged, created_at')
      .eq('pincode', pincode)
      .ilike('category', `%${category}%`);

    const { data: activeProjects } = await supabase
      .from('projects')
      .select('project_code, title, status, progress, expected_completion')
      .eq('pincode', pincode);

    const clusterPayload = {
      pincode,
      category,
      total_complaints: complaints?.length || 0,
      complaint_descriptions: complaints?.map(c => c.description) || [],
      existing_projects_in_area: activeProjects || []
    };

    const insights = await generateAdminClusterInsights(clusterPayload);

    return res.status(200).json({
      status: 'success',
      data: {
        pincode,
        category,
        insights
      }
    });

  } catch (error) {
    console.error('Error generating cluster insights:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/pincode/:pincode
 * Returns geographic intelligence for a specified pincode[cite: 1].
 */
export const getPincodeIntelligence = async (req, res) => {
  try {
    const { pincode } = req.params;

    const { data: complaints } = await supabase
      .from('complaints')
      .select('*')
      .eq('pincode', pincode);

    const { data: projects } = await supabase
      .from('projects')
      .select('*, departments(name), budgets(*)')
      .eq('pincode', pincode);

    return res.status(200).json({
      status: 'success',
      data: {
        pincode,
        activeComplaintsCount: complaints?.filter(c => c.status !== 'Resolved').length || 0,
        resolvedComplaintsCount: complaints?.filter(c => c.status === 'Resolved').length || 0,
        ongoingProjectsCount: projects?.filter(p => p.status === 'In Progress').length || 0,
        complaints: complaints || [],
        projects: projects || []
      }
    });
  } catch (error) {
    console.error('Error fetching pincode intelligence:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
/**
 * GET /api/admin/queries
 * Aggregates raw natural language queries from citizens to spot trends.
 */
export const getUniqueQueries = async (req, res) => {
  try {
    // In a production environment, you might use Gemini to dynamically cluster these.
    // For this MVP, we will pull recent chat sessions and group them by raw prompt frequency.
    const { data: sessions, error } = await supabase
      .from('chat_sessions')
      .select('prompt');

    if (error) throw error;

    // Aggregate exact query matches (or similar phrasing logic)
    const queryCounts = (sessions || []).reduce((acc, session) => {
      const q = session.prompt.trim();
      acc[q] = (acc[q] || 0) + 1;
      return acc;
    }, {});

    // Format for the frontend UI: "Why is my road repair delayed? - 84 requests"
    const uniqueQueries = Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 trending queries

    return res.status(200).json({ status: 'success', data: uniqueQueries });
  } catch (error) {
    console.error('Error fetching unique queries:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/files
 * Retrieves the library of municipal data files uploaded by admins.
 */
export const getMunicipalFiles = async (req, res) => {
  try {
    const { data: files, error } = await supabase
      .from('municipal_files')
      .select('id, filename, file_type, size_bytes, status, last_updated')
      .order('last_updated', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ status: 'success', data: files || [] });
  } catch (error) {
    console.error('Error fetching municipal files:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};