import { Router } from 'express';
import { 
  getAdminOverview, 
  getComplaintClusters, 
  getClusterInsights, 
  getPincodeIntelligence,
  getUniqueQueries,     // NEW
  getMunicipalFiles     // NEW
} from '../controllers/admin.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);
router.use(requireRole('admin'));

router.get('/overview', getAdminOverview);
router.get('/clusters', getComplaintClusters);
router.post('/insights', getClusterInsights);
router.get('/pincode/:pincode', getPincodeIntelligence);

// New endpoints to close the UI gaps
router.get('/queries', getUniqueQueries);
router.get('/files', getMunicipalFiles);

export default router;