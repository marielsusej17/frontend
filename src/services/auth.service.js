import api from "../api/axios";

export const loginRequest = (data) => {
  return api.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};