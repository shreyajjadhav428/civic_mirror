// File Path: backend/src/routes/health.route.js

import { Router } from 'express';
import { getHealthStatus } from '../controllers/health.controller.js';

const router = Router();

router.get('/', getHealthStatus);

export default router;