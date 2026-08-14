import { Router } from 'express';
import { 
  getAdminOverview, 
  getComplaintClusters, 
  getClusterInsights, 
  getPincodeIntelligence,
  getUniqueQueries,
  getAdminInquiries,
  getMunicipalFiles,
  updateComplaintStatus,
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  dispatchClusterWorkOrder
} from '../controllers/admin.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);
router.use(requireRole('admin'));

router.get('/overview', getAdminOverview);
router.get('/clusters', getComplaintClusters);
router.post('/clusters/dispatch', dispatchClusterWorkOrder);
router.post('/insights', getClusterInsights);
router.get('/pincode/:pincode', getPincodeIntelligence);

// Endpoints for admin queries, inquiries, files, complaints status, and projects
router.get('/queries', getUniqueQueries);
router.get('/inquiries', getAdminInquiries);
router.get('/files', getMunicipalFiles);
router.patch('/complaints/:id/status', updateComplaintStatus);
router.get('/projects', getAdminProjects);
router.post('/projects', createAdminProject);
router.patch('/projects/:id', updateAdminProject);

export default router;