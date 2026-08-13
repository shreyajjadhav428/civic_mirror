import { Router } from 'express';
import { askCivicMirror } from '../controllers/ai.controller.js';
import { comparePriorities } from '../controllers/decision.controller.js';

const router = Router();

router.post('/ask', askCivicMirror);
router.post('/compare', comparePriorities);

export default router;