import { Router } from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', updateUserProfile);

export default router;