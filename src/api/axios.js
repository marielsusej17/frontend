import axios from "axios";

// ✅ FIX: evitar undefined en Vercel
const API_URL =
  import.meta.env.VITE_API_URL ??
  "https://backend-z35t.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true,

});

// 🔐 Interceptor para token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;