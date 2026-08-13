import { Router } from 'express';
import { createComplaint, getComplaintById } from '../controllers/complaint.controller.js';

const router = Router();

router.post('/', createComplaint);
router.get('/:id', getComplaintById);

export default router;