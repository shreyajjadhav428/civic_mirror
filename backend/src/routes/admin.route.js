import { Router } from 'express';
import { 
  getAdminOverview, 
  getComplaintClusters, 
  getClusterInsights, 
  getPincodeIntelligence 
} from '../controllers/admin.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// Apply JWT verification and admin role guard across all routes in this router
router.use(verifyToken);
router.use(requireRole('admin'));

router.get('/overview', getAdminOverview);
router.get('/clusters', getComplaintClusters);
router.post('/insights', getClusterInsights);
router.get('/pincode/:pincode', getPincodeIntelligence);

export default router;