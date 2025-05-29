import Toast from "react-native-toast-message";
import apiClient from "./api-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Auth API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_INVITATION: "/auth/verify-invitation",
  REGISTER_TENANT: "/auth/register-tenant",
  LOGOUT: "/auth/logout",
  CHANGE_PASSWORD: "/auth/change-password",
};

export const register = async (data) => {
  const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data);
  // if (response?.data) {
  //   Toast.success({
  //     type: "success",
  //     text1: "Registration successful",
  //     position: "bottom",
  //   });
  // }
  return response;
};

export const login = async (credentials) => {
  const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
  // Store token and user data
  if (response.data) {
    try {
      // Store auth token
      await AsyncStorage.setItem("authToken", response.data.token);
      // Store user data
      const userData = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role,
        data: response.data,
        // Add any other user data you need to store
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error storing user data: asd", error);

      throw error;
    }
  }

  return response;
};

export const verifyInvitation = async (data) => {
  return apiClient.post(AUTH_ENDPOINTS.VERIFY_INVITATION, data);
};

export const changePassword = async (data) => {
  return apiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data);
};

export const logout = async () => {
  try {
    // Clear token and user data
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userData");

    // In a real app, we might also call an API endpoint to invalidate the token
    // if (process.env.NODE_ENV !== 'development') {
    //   await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    // }

    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

export const checkAuth = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const userDataString = await AsyncStorage.getItem("userData");

    return !!token && !!userDataString;
  } catch (error) {
    return false;
  }
};
