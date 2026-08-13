import { Router } from 'express';
import { getCitizenStats, getChatHistory, getPublicPincodeData } from '../controllers/citizen.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// Protect citizen dashboard routes
router.get('/stats', verifyToken, requireRole('citizen'), getCitizenStats);
router.get('/history', verifyToken, requireRole('citizen'), getChatHistory);

// Public route (no token required)
router.get('/pincode/:pincode', getPublicPincodeData);

export default router;