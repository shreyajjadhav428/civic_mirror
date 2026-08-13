import {
  createContext,
  useContext,
  useState,
} from "react";

import { loginUser, registerUser } from "../api/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(
      "civicmirror_user"
    );

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("civicmirror_token");
  });

  const login = async (email, password) => {
    const response = await loginUser(email, password);

    if (!response.authenticated || !response.token) {
      throw new Error("Authentication failed.");
    }

    const userData = {
      id: response.user.id,
      email: response.user.email,
      role: response.role,
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

  const register = async (email, password, role = "citizen") => {
    return await registerUser(
      email,
      password,
      role
    );
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
        isAuthenticated: Boolean(token),
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
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}