import { Router } from 'express';
import { askCivicMirror } from '../controllers/ai.controller.js';

const router = Router();

router.post('/ask', askCivicMirror);

export default router;