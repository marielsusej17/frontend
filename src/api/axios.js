import axios from "axios";

// 🔥 URL del backend (Render en producción)
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://carlosedison-3.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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