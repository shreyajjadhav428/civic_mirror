import api from "./axios.config";

/**
 * Fetch top-level admin overview metrics (Total Requests, Pending, Resolved, Flagged, Active Clusters).
 */
export const getAdminOverview = async (timeframe = "Today") => {
  const response = await api.get("/admin/overview", {
    params: { timeframe },
  });
  return response.data;
};

/**
 * Fetch complaint clusters grouped by pincode and category.
 */
export const getComplaintClusters = async () => {
  const response = await api.get("/admin/clusters");
  return response.data;
};

/**
 * Fetch AI insights for a specific complaint cluster.
 */
export const getClusterInsights = async (pincode, category) => {
  const response = await api.post("/admin/insights", { pincode, category });
  return response.data;
};

/**
 * Fetch geographic intelligence for a pincode.
 */
export const getPincodeIntelligence = async (pincode) => {
  const response = await api.get(`/admin/pincode/${pincode}`);
  return response.data;
};

/**
 * Fetch most common citizen natural language queries.
 */
export const getUniqueQueries = async () => {
  const response = await api.get("/admin/queries");
  return response.data;
};

/**
 * Fetch municipal files library.
 */
export const getMunicipalFiles = async () => {
  const response = await api.get("/admin/files");
  return response.data;
};

/**
 * Fetch public citizen inquiries logs & AI insight analytics.
 */
export const getAdminInquiries = async () => {
  const response = await api.get("/admin/inquiries");
  return response.data;
};

/**
 * Ingest document file / text, generate Gemini vector embedding, and insert into RAG knowledge store.
 */
export const ingestDocument = async (payload) => {
  const response = await api.post("/documents/ingest", payload);
  return response.data;
};

/**
 * Update a complaint status or flag.
 */
export const updateComplaintStatus = async (id, statusData) => {
  const response = await api.patch(`/admin/complaints/${id}/status`, statusData);
  return response.data;
};
