"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authApi from "../api/auth-api";
import Toast from "react-native-toast-message";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    isLoggedIn: false,
    role: null,
    user: null,
    isLoading: true,
    userData: null,
  });
  const [otpVisible, setOtpVisible] = useState(false);

  // ── Register (landlord) ──────────────────────────────────────────────────
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Registration failed",
        position: "bottom",
      });
    },
  });

  // ── Verify registration OTP → auto-login ─────────────────────────────────
  // Called from OTPScreen after landlord email verification
  const verifyRegistrationOtpMutation = useMutation({
    mutationFn: authApi.verifyRegistrationOtp,
    onSuccess: (response) => {
      const data = response.data;
      setState({
        isLoggedIn: true,
        role: data.role,
        user: data.email,
        isLoading: false,
        userData: data,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Invalid or expired OTP",
        position: "bottom",
      });
    },
  });

  // ── Resend registration OTP ──────────────────────────────────────────────
  const resendVerificationOtpMutation = useMutation({
    mutationFn: authApi.resendVerificationOtp,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Failed to resend OTP",
        position: "bottom",
      });
    },
  });

  // ── Login ────────────────────────────────────────────────────────────────
  // Returns token directly — no OTP step for login
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const data = response.data;
      setState({
        isLoggedIn: true,
        role: data.role,
        user: data.email,
        isLoading: false,
        userData: data,
      });
    },
    onError: (error) => {
      // Don't show toast for 403 unverified email — LoginScreen handles navigation
      console.log(error);
      if (error?.response?.data?.isEmailVerified === false) {
        setOtpVisible(true);
      } else {
        Toast.show({
          type: "error",
          text1:
            error?.response?.data?.message ||
            "Login Failed! Something went wrong",
          position: "bottom",
        });
      }
    },
  });

  // ── Verify invitation ────────────────────────────────────────────────────
  const verifyInvitationMutation = useMutation({
    mutationFn: authApi.verifyInvitation,
    onSuccess: (data) => {
      console.log("Invitation verified:", data);
    },
  });

  // ── Register tenant ──────────────────────────────────────────────────────
  const registerTenantMutation = useMutation({
    mutationFn: authApi.registerTenant,
    onSuccess: async (response) => {
      const { user, role, token } = response.data;
      await AsyncStorage.setItem("userData", JSON.stringify({ user, role }));
      setState({ isLoggedIn: true, role, user, isLoading: false });
    },
  });

  // ── Change password ──────────────────────────────────────────────────────
  const changePasswordMutation = useMutation({
    mutationFn: authApi.changePassword,
    onError: (error) => {
      console.error("Password change failed:", error?.response?.data?.message);
    },
  });

  // ── Logout ───────────────────────────────────────────────────────────────
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setState({ isLoggedIn: false, role: null, user: null, isLoading: false });
      queryClient.clear();
    },
  });

  // ── Restore session on mount ─────────────────────────────────────────────
  useEffect(() => {
    async function loadUserData() {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          setState((s) => ({ ...s, isLoading: false }));
          return;
        }
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setState({
            isLoggedIn: true,
            role: userData.role,
            user: userData.user ?? userData.email,
            isLoading: false,
            userData,
          });
        } else {
          setState((s) => ({ ...s, isLoading: false }));
        }
      } catch (error) {
        console.error("Failed to load auth state:", error);
        setState((s) => ({ ...s, isLoading: false }));
      }
    }
    loadUserData();
  }, []);

  // ── Exposed functions ────────────────────────────────────────────────────
  const login = useCallback(
    (credentials) => loginMutation.mutateAsync(credentials),
    [loginMutation],
  );

  const register = useCallback(
    (data) => registerMutation.mutateAsync(data),
    [registerMutation],
  );

  const verifyRegistrationOtp = useCallback(
    (data) => verifyRegistrationOtpMutation.mutateAsync(data),
    [verifyRegistrationOtpMutation],
  );

  const resendVerificationOtp = useCallback(
    (email) => resendVerificationOtpMutation.mutateAsync(email),
    [resendVerificationOtpMutation],
  );

  const verifyInvitation = useCallback(
    (data) => verifyInvitationMutation.mutateAsync(data),
    [verifyInvitationMutation],
  );

  const registerTenant = useCallback(
    (data) => registerTenantMutation.mutateAsync(data),
    [registerTenantMutation],
  );

  const logout = useCallback(
    () => logoutMutation.mutateAsync(),
    [logoutMutation],
  );

  const updateUserProfile = useCallback(
    async (updatedData) => {
      try {
        const newUserData = { ...state.user, ...updatedData };
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify({ ...userData, user: newUserData }),
          );
        }
        setState((prev) => ({ ...prev, user: newUserData }));
        return true;
      } catch (error) {
        console.error("Error updating user profile:", error);
        return false;
      }
    },
    [state.user],
  );

  const value = {
    // State
    isLoggedIn: state.isLoggedIn,
    role: state.role,
    user: state.user,
    isLoading: state.isLoading,
    userData: state.userData,
    setState,
    state,
    setOtpVisible,
    otpVisible,
    // Login (direct — no OTP)
    login,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Register landlord
    register,
    isRegistering: registerMutation.isPending,
    registrationError: registerMutation.error,

    // Registration email OTP
    verifyRegistrationOtp,
    isVerifyingOtp: verifyRegistrationOtpMutation.isPending,
    resendVerificationOtp,
    isResendingOtp: resendVerificationOtpMutation.isPending,

    // Invitation verification
    verifyInvitation,
    isVerifyingInvitation: verifyInvitationMutation.isPending,
    verificationError: verifyInvitationMutation.error,
    verificationData: verifyInvitationMutation.data?.data,

    // Tenant registration
    registerTenant,

    // Logout
    logout,
    isLoggingOut: logoutMutation.isPending,

    // Profile
    updateUserProfile,

    // Change password
    changePassword: useCallback(
      (data) => changePasswordMutation.mutateAsync(data),
      [changePasswordMutation],
    ),
    isChangingPassword: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
