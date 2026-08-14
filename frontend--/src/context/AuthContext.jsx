import {
  createContext,
  useContext,
  useState,
} from "react";

import { loginUser, registerUser } from "../api/auth.api";

// ─────────────────────────────────────────────────────────────────────
// DEVELOPMENT AUTH BYPASS
// Set to false when backend authentication is ready.
// ─────────────────────────────────────────────────────────────────────

export const DEV_BYPASS_AUTH = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (DEV_BYPASS_AUTH) {
      return {
        id: "user-citizen-1",
        email: "citizen@civicmirror.com",
        role: "citizen",
      };
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

  // ─────────────────────────────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────────────────────────────

  const login = async (
    email,
    password,
    selectedRole = "citizen"
  ) => {
    if (DEV_BYPASS_AUTH) {
      const mockUser = {
        id: selectedRole === "admin" ? "user-admin-1" : "user-citizen-1",
        email: email || (selectedRole === "admin" ? "admin@civicmirror.com" : "citizen@civicmirror.com"),
        role: selectedRole,
      };

      const mockResponse = {
        authenticated: true,
        token: "dev_mock_token_123",
        role: selectedRole,
        user: mockUser,
      };

      setToken(mockResponse.token);
      setUser(mockUser);

      return mockResponse;
    }

    const response = await loginUser(email, password);

    if (!response.authenticated || !response.token) {
      throw new Error(
        response.message || "Authentication failed."
      );
    }

    const userData = {
      id: response.user?.id || "user-citizen-1",
      email: response.user?.email || email,
      role: response.role || "citizen",
    };

    localStorage.setItem(
      "civicmirror_token",
      response.token
    );

    localStorage.setItem(
      "civicmirror_user",
      JSON.stringify(userData)
    );

    setToken(response.token);
    setUser(userData);

    return response;
  };

  // ─────────────────────────────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────────────────────────────

  const register = async (email, password, role = "citizen") => {
    try {
      const response = await registerUser(email, password, role);
      if (response?.authenticated && response?.token) {
        const userData = {
          id: response.user?.id || "user-citizen-1",
          email: response.user?.email || email,
          role: response.role || role,
        };

        localStorage.setItem("civicmirror_token", response.token);
        localStorage.setItem("civicmirror_user", JSON.stringify(userData));

        setToken(response.token);
        setUser(userData);
      }
      return response;
    } catch (err) {
      console.error("Error in AuthContext register:", err);
      throw err;
    }
  };

  // ─────────────────────────────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────────────────────────────

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
        isAuthenticated: DEV_BYPASS_AUTH
          ? true
          : Boolean(token),
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

// ─────────────────────────────────────────────────────────────────────
// useAuth Hook
// ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}