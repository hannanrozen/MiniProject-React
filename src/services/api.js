import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Request being sent:", config);
    config.headers["x-api-key"] = "reqres-free-v1";
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
