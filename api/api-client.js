import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an axios instance with a base URL
const API_URL = "https://your-api-url.com/api"; // Replace with your actual API URL

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token in requests
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem("auth_token");

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

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized errors (expired token, etc.)
    if (error.response && error.response.status === 401) {
      // Clear stored tokens
      await AsyncStorage.removeItem("auth_token");
      // You could also navigate to login screen here or trigger a context update
    }

    return Promise.reject(error);
  }
);
