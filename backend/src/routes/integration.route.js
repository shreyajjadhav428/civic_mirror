import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { processMediaUpload } from '../controllers/upload.controller.js';
import { streamAiStatus } from '../controllers/sse.controller.js';

const router = Router();

// Multi-modal upload route (expects a field named 'media')
router.post('/upload/media', upload.single('media'), processMediaUpload);

// SSE Streaming route
router.get('/stream/ai-status', streamAiStatus);

export default router;