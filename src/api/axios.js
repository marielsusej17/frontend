import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-z35t.onrender.com/api", // ✅ TU BACKEND
  headers: {
    "Content-Type": "application/json",
  },
});

// Token automático
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;