import api from "./axios.config";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const registerUser = async (email, password, role = "citizen", area = "Shanti Nagar", pincode = "110025") => {
  try {
    const response = await api.post("/auth/register", { email, password, role, area, pincode });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/auth/profile/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    const response = await api.put(`/auth/profile/${userId}`, data);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export default api;