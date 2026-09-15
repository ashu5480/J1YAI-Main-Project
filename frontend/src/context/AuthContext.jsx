import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export const api = axios.create({ baseURL: API, withCredentials: true });

let onUnauthorized = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && !original.url.includes("/auth/")) {
      original._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch {
        onUnauthorized?.();
      }
    }
    return Promise.reject(error);
  }
);

export const formatApiError = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUnauthorized = () => setUser(false);
    api.get("/auth/me").then(({ data }) => setUser(data)).catch(() => setUser(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data);
  };

  const logout = async () => {
    try { await api.post("/auth/logout"); } finally { setUser(false); }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" data-testid="auth-loading">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }
  if (user === false) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
};
