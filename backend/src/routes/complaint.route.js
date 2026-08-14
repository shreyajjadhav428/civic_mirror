import { Router } from 'express';
import { createComplaint, getComplaintById, getComplaintsList } from '../controllers/complaint.controller.js';

const router = Router();

router.get('/', getComplaintsList);
router.post('/', createComplaint);
router.get('/:id', getComplaintById);

export default router;