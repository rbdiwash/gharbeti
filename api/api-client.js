import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base API URL - replace with your actual API URL
// const BASE_URL = "http://192.168.1.118:8000/api/";
const BASE_URL = "http://192.168.1.102:8000/api/";

// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from storage
    const token = await AsyncStorage.getItem("authToken");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Here you could implement token refresh logic
      // For now, we'll just clear the token and force logout
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");

      // Force reload the app or navigate to login
      // This will be handled by the auth context
    }

    return Promise.reject(error);
  }
);

export default apiClient;
