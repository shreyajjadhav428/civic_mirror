import { Router } from 'express';
import { 
  getAdminOverview, 
  getComplaintClusters, 
  getClusterInsights, 
  getPincodeIntelligence,
  getUniqueQueries,
  getAdminInquiries,
  getMunicipalFiles,
  updateComplaintStatus
} from '../controllers/admin.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);
router.use(requireRole('admin'));

router.get('/overview', getAdminOverview);
router.get('/clusters', getComplaintClusters);
router.post('/insights', getClusterInsights);
router.get('/pincode/:pincode', getPincodeIntelligence);

// Endpoints for admin queries, inquiries, files, and status update
router.get('/queries', getUniqueQueries);
router.get('/inquiries', getAdminInquiries);
router.get('/files', getMunicipalFiles);
router.patch('/complaints/:id/status', updateComplaintStatus);

export default router;