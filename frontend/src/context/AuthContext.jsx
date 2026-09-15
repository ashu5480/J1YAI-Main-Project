import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export const api = axios.create({ baseURL: API, withCredentials: true });

let onUnauthorized = null;

// If the backend is not deployed, static hosts (e.g. Vercel SPA fallback) answer
// /api/* with index.html (HTTP 200, HTML) instead of JSON/401. Reject those so
// auth + admin screens degrade gracefully instead of treating HTML as a user,
// an inquiries list, etc.
api.interceptors.response.use(
  (res) => {
    const looksLikeHtml =
      typeof res.data === "string" &&
      /^\s*(<!doctype html|<html)/i.test(String(res.data).slice(0, 2048));
    if (looksLikeHtml) {
      const err = new Error("API unavailable (backend not deployed).");
      err.response = {
        status: 503,
        data: { detail: "API unavailable (backend not deployed)." },
      };
      return Promise.reject(err);
    }
    return res;
  },
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
