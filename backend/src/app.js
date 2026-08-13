import express from 'express';
import cors from 'cors';

import healthRoute from './routes/health.route.js';
import projectRoute from './routes/project.route.js';
import complaintRoute from './routes/complaint.route.js';
import aiRoute from './routes/ai.route.js';
import documentRoute from './routes/document.route.js';
import authRoute from './routes/auth.route.js';
import adminRoute from './routes/admin.route.js'; // Admin Route Import

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoute);
app.use('/api/projects', projectRoute);
app.use('/api/complaints', complaintRoute);
app.use('/api/ai', aiRoute);
app.use('/api/documents', documentRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute); // Mounted Admin Route

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
