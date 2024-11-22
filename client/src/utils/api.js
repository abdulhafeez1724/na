import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("API request error:", error);
    return Promise.reject(error);
  }
);


export default api;
