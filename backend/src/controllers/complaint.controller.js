import {
  createComplaintRepo,
  getComplaintByIdRepo,
  findMatchingProject
} from '../repositories/complaint.repository.js';
import { supabase } from '../config/supabase.js';

/**
 * GET /api/complaints
 * Fetches citizen complaint records from Supabase (filtered by user_id if provided).
 */
export const getComplaintsList = async (req, res) => {
  try {
    const { user_id } = req.query;

    let userArea = 'Shanti Nagar';
    let userPincode = '110025';

    // Retrieve citizen's area and pincode directly from the users table
    if (user_id) {
      const { data: userProfile } = await supabase
        .from('users')
        .select('area, pincode')
        .eq('id', user_id)
        .single();

      if (userProfile?.area) userArea = userProfile.area;
      if (userProfile?.pincode) userPincode = userProfile.pincode;
    }

    let query = supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data: dbComplaints, error } = await query;

    if (error) throw error;

    const formattedRequests = (dbComplaints || []).map((c) => {
      const finalPincode = c.pincode || userPincode || '110025';
      const finalArea = userArea || 'Shanti Nagar';
      const locationStr = `${finalArea}, ${finalPincode}`;

      return {
        id: c.complaint_code || c.id,
        title: c.description ? (c.description.length > 50 ? c.description.slice(0, 50) + '...' : c.description) : `${c.category || 'Civic'} Issue`,
        description: c.description || 'No description provided.',
        location: locationStr,
        area: finalArea,
        pincode: finalPincode,
        date: c.created_at ? new Date(c.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent',
        status: c.status === 'Pending' ? 'Under review' : (c.status || 'Under review'),
        category: c.category || 'General',
        user_id: c.user_id || user_id || 'user-citizen-1'
      };
    });

    return res.status(200).json({
      status: 'success',
      data: formattedRequests,
      user_area: userArea,
      user_pincode: userPincode
    });
  } catch (error) {
    console.error('Error fetching complaints list:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/complaints
 * Processes incoming citizen complaint text, checks pincode project alignment,
 * and sets the initial summary and admin flag.
 */
export const createComplaint = async (req, res) => {
  try {
    const { description, category, pincode, user_id } = req.body;

    if (!description || !category || !pincode) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'Missing required fields: description, category, and pincode are required.'
      });
    }

    // 1. Check for an active project matching pincode and category
    const matchingProject = await findMatchingProject(pincode, category);

    let projectId = null;
    let adminFlagged = false;
    let aiSummary = '';

    if (matchingProject) {
      projectId = matchingProject.id;
      adminFlagged = false;
      aiSummary = `Associated with active project ${matchingProject.project_code} (${matchingProject.title}). Scheduled completion: ${matchingProject.expected_completion}.`;
    } else {
      projectId = null;
      adminFlagged = true;
      aiSummary = `No ongoing project found in pincode ${pincode} for category '${category}'. Request flagged for municipal administrative review.`;
    }

    const complaintCode = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const complaintId = `cmp-${Date.now()}`;

    const newComplaintData = {
      id: complaintId,
      complaint_code: complaintCode,
      user_id: user_id || 'user-citizen-1',
      description,
      category,
      pincode,
      status: 'Pending',
      project_id: projectId,
      admin_flagged: adminFlagged,
      ai_summary: aiSummary
    };

    // 2. Persist to database
    const createdComplaint = await createComplaintRepo(newComplaintData);

    return res.status(201).json({
      status: 'success',
      data: createdComplaint
    });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/complaints/:id
 * Fetches complaint record by ID or CMP code.
 */
export const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await getComplaintByIdRepo(id);

    if (!complaint) {
      return res.status(404).json({
        error: 'NotFound',
        message: `Complaint '${id}' was not found.`
      });
    }

    return res.status(200).json({
      status: 'success',
      data: complaint
    });
  } catch (error) {
    console.error('Error retrieving complaint:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};