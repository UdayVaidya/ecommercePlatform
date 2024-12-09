import axios from "axios";

// Use the environment variable defined in your .env file
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend URL in .env
});

// Attach the token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
