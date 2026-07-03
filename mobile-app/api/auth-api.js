import Toast from "react-native-toast-message";
import apiClient from "./api-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_EMAIL: "/auth/verify-email",             // Registration OTP verification
  RESEND_VERIFICATION_OTP: "/auth/resend-verification-otp",
  VERIFY_INVITATION: "/auth/verify-invitation",
  REGISTER_TENANT: "/auth/register-tenant",
  LOGOUT: "/auth/logout",
  CHANGE_PASSWORD: "/auth/change-password",
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_OTP: "/auth/verify-otp",                // Password reset OTP only
  RESET_PASSWORD: "/auth/reset-password",
};

export const register = async (data) => {
  const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data);
  return response;
};

// Verify the OTP sent during landlord registration → returns token
export const verifyRegistrationOtp = async ({ email, otp }) => {
  const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { email, otp });
  if (response.data?.token) {
    await AsyncStorage.setItem("authToken", response.data.token);
    const userData = {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      data: response.data,
    };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  }
  return response;
};

// Resend registration OTP (landlord email verification)
export const resendVerificationOtp = async (email) => {
  return apiClient.post(AUTH_ENDPOINTS.RESEND_VERIFICATION_OTP, { email });
};

export const login = async (credentials) => {
  const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
  if (response.data?.token) {
    await AsyncStorage.setItem("authToken", response.data.token);
    const userData = {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      role: response.data.role,
      data: response.data,
    };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  }
  return response;
};

export const verifyInvitation = async (data) => {
  return apiClient.post(AUTH_ENDPOINTS.VERIFY_INVITATION, data);
};

export const registerTenant = async (data) => {
  return apiClient.post(AUTH_ENDPOINTS.REGISTER_TENANT, data);
};

export const changePassword = async (data) => {
  return apiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data);
};

// Password reset OTP (different from registration OTP)
export const verifyOtp = async ({ email, otp }) => {
  return apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, { email, otp });
};

export const forgotPassword = async (data) => {
  return apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userData");
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
