import express from 'express';
import cors from 'cors';
import healthRoute from './routes/health.route.js';
import projectRoute from './routes/project.route.js';
import complaintRoute from './routes/complaint.route.js';
import aiRoute from './routes/ai.route.js';
import documentRoute from './routes/document.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoute);
app.use('/api/projects', projectRoute);
app.use('/api/complaints', complaintRoute);
app.use('/api/ai', aiRoute); 
app.use('/api/documents', documentRoute);


// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;