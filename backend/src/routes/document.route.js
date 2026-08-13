import { Router } from 'express';
import { ingestDocument } from '../controllers/document.controller.js';

const router = Router();

router.post('/ingest', ingestDocument);

export default router;