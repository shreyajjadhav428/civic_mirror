import { Router } from 'express';
import { getProjectByCode, getProjectsByPincode } from '../controllers/project.controller.js';

const router = Router();

router.get('/:projectCode', getProjectByCode);
router.get('/pincode/:pincode', getProjectsByPincode);

export default router;