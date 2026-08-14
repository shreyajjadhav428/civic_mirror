import api from "./axios.config";

/**
 * Ask CivicMirror AI RAG conversational assistant / file a complaint.
 */
export const askCivicMirror = async (prompt) => {
  const response = await api.post("/ai/ask", { prompt });
  return response.data;
};

/**
 * Fetch public pincode intelligence (active issues and ongoing projects).
 */
export const getPublicPincodeData = async (pincode) => {
  const response = await api.get(`/citizen/pincode/${pincode}`);
  return response.data;
};

/**
 * Fetch citizen personal stats.
 */
export const getCitizenStats = async () => {
  const response = await api.get("/citizen/stats");
  return response.data;
};

/**
 * Fetch citizen past AI chat history.
 */
export const getChatHistory = async () => {
  const response = await api.get("/citizen/history");
  return response.data;
};

/**
 * Fetch all citizen complaint requests.
 */
export const getCitizenRequests = async () => {
  const response = await api.get("/complaints");
  return response.data;
};
