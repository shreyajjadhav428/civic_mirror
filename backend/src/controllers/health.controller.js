// File Path: backend/src/controllers/health.controller.js

export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "civicmirror-api"
  });
};