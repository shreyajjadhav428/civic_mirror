// File Path: backend/src/app.js

import express from 'express';
import cors from 'cors';
import healthRoute from './routes/health.route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/health', healthRoute);

// Global Error Handler (Fallback)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;