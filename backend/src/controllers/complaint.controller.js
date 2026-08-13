import {
  createComplaintRepo,
  getComplaintByIdRepo,
  findMatchingProject
} from '../repositories/complaint.repository.js';

/**
 * POST /api/complaints
 * Processes incoming citizen complaint text, checks pincode project alignment,
 * and sets the initial summary and admin flag.
 */
export const createComplaint = async (req, res) => {
  try {
    const { description, category, pincode } = req.body;

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