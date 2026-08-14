import api from "./axios.config";

/**
 * Ask CivicMirror AI RAG conversational assistant / file a complaint.
 */
export const askCivicMirror = async (prompt, userId = "user-citizen-1") => {
  const response = await api.post("/ai/ask", { prompt, user_id: userId });
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
export const getChatHistory = async (userId = "user-citizen-1") => {
  const response = await api.get("/citizen/history", {
    params: { user_id: userId }
  });
  return response.data;
};

/**
 * Fetch citizen complaint requests (filtered by userId if provided).
 */
export const getCitizenRequests = async (userId = "user-citizen-1") => {
  const response = await api.get("/complaints", {
    params: { user_id: userId }
  });
  return response.data;
};
