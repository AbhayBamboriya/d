import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  timeout: 60000, // 60 seconds
});

export default axiosInstance;
