import axios from "axios";

export const api = axios.create({
  baseURL: "https://codewithrandom.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
});

// Attach auth token if present in localStorage
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});
