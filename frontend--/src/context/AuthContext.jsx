import {
  createContext,
  useContext,
  useState,
} from "react";

import { loginUser, registerUser } from "../api/auth.api";

// ── DEVELOPMENT AUTH BYPASS TOGGLE ───────────────────────────────────
// Set to false when ready for production authentication
export const DEV_BYPASS_AUTH = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (DEV_BYPASS_AUTH) {
      return { id: "dev_user_1", email: "dev@civicmirror.local", role: "admin" };
    }
    const storedUser = localStorage.getItem("civicmirror_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    if (DEV_BYPASS_AUTH) {
      return "dev_mock_token_123";
    }
    return localStorage.getItem("civicmirror_token");
  });

  const login = async (email, password) => {
    if (DEV_BYPASS_AUTH) {
      const mockUser = {
        id: "dev_user_1",
        email: email || "dev@civicmirror.local",
        role: "admin",
      };
      const mockResponse = {
        authenticated: true,
        token: "dev_mock_token_123",
        role: "admin",
        user: mockUser,
      };
      setToken(mockResponse.token);
      setUser(mockUser);
      return mockResponse;
    }

    const response = await loginUser(email, password);

    if (!response.authenticated || !response.token) {
      throw new Error(response.message || "Authentication failed.");
    }

    const userData = {
      id: response.user?.id || "user_1",
      email: response.user?.email || email,
      role: response.role || "citizen",
    };

    localStorage.setItem("civicmirror_token", response.token);
    localStorage.setItem("civicmirror_user", JSON.stringify(userData));

    setToken(response.token);
    setUser(userData);

    return response;
  };

  const register = async (email, password, role = "citizen") => {
    if (DEV_BYPASS_AUTH) {
      return { success: true, message: "Bypassed registration in development mode" };
    }
    return await registerUser(email, password, role);
  };

  const logout = () => {
    localStorage.removeItem("civicmirror_token");
    localStorage.removeItem("civicmirror_user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: DEV_BYPASS_AUTH ? true : Boolean(token),
        DEV_BYPASS_AUTH,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}