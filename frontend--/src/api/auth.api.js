import axios from "axios"; // HTTP Client

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("civicmirror_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("civicmirror_token");
      localStorage.removeItem("civicmirror_user");
    }

    return Promise.reject(error);
  }
);

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