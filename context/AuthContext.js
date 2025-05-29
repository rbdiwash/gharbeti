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

// Create auth context
const AuthContext = createContext({});

/**
 * Auth Provider component that provides authentication state and functions
 */
export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    isLoggedIn: false,
    role: null, // 'landlord', 'tenant', or null
    user: null,
    isLoading: true,
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      console.log("Registration successful");
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (response) => {
      const { user, email, role, token } = response.data;
      // Update auth state
      setState({
        isLoggedIn: true,
        role,
        user: email,
        isLoading: false,
        userData: response?.data,
      });
    },
    onError: (error) => {
      console.log(error);
      console.error("Login failed: ok", error?.response?.data?.message);
      Toast.show({
        type: "error",
        text1:
          error?.response?.data?.message ||
          "Login Failed! Something went wrong",
        position: "bottom",
      });
    },
  });

  // Verify invitation mutation
  const verifyInvitationMutation = useMutation({
    mutationFn: authApi.verifyInvitation,

    onSuccess: (data) => {
      // Handle successful invitation verification
      console.log("Invitation verified:", data);
    },
  });

  // Register tenant mutation
  const registerTenantMutation = useMutation({
    mutationFn: authApi.registerTenant,

    onSuccess: async (response) => {
      const { user, role, token } = response.data;

      // Store user data in AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify({ user, role }));

      // Update auth state
      setState({
        isLoggedIn: true,
        role,
        user,
        isLoading: false,
      });
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      console.log("Password changed successfully");
    },
    onError: (error) => {
      console.error("Password change failed:", error?.response?.data?.message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      // Reset auth state
      setState({
        isLoggedIn: false,
        role: null,
        user: null,
        isLoading: false,
      });

      // Clear all queries from the cache
      queryClient.clear();
    },
  });

  // Check authentication status on mount
  useEffect(() => {
    async function loadUserData() {
      try {
        // Check if token exists
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          setState({ ...state, isLoading: false });
          return;
        }

        // Load user data from storage
        const userDataString = await AsyncStorage.getItem("userData");

        if (userDataString) {
          const userData = JSON.parse(userDataString);

          setState({
            isLoggedIn: true,
            role: userData.role,
            user: userData.user,
            isLoading: false,
          });
        } else {
          setState({ ...state, isLoading: false });
        }
      } catch (error) {
        console.error("Failed to load auth state:", error);
        setState({ ...state, isLoading: false });
      }
    }

    loadUserData();
  }, []);

  // Login function
  const login = useCallback(
    (credentials) => {
      console.log(credentials);
      return loginMutation.mutateAsync(credentials);
    },
    [loginMutation]
  );

  // Register function
  const register = useCallback(
    (data) => {
      return registerMutation.mutateAsync(data);
    },
    [registerMutation]
  );
  // Verify invitation function
  const verifyInvitation = useCallback(
    (data) => {
      return verifyInvitationMutation.mutateAsync(data);
    },
    [verifyInvitationMutation]
  );

  // Register tenant function
  const registerTenant = useCallback(
    (data) => {
      return registerTenantMutation.mutateAsync(data);
    },
    [registerTenantMutation]
  );

  // Logout function
  const logout = useCallback(() => {
    return logoutMutation.mutateAsync();
  }, [logoutMutation]);

  // Update user profile
  const updateUserProfile = useCallback(
    async (updatedData) => {
      try {
        const newUserData = {
          ...state.user,
          ...updatedData,
        };

        // Update local storage
        const userDataString = await AsyncStorage.getItem("userData");

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              ...userData,
              user: newUserData,
            })
          );
        }

        // Update state
        setState((prevState) => ({
          ...prevState,
          user: newUserData,
        }));

        return true;
      } catch (error) {
        console.error("Error updating user profile:", error);
        return false;
      }
    },
    [state.user]
  );

  // Context value
  const value = {
    // State
    isLoggedIn: state.isLoggedIn,
    role: state.role,
    user: state.user,
    isLoading: state.isLoading,
    userData: state.userData,
    setState,
    state,

    // Login
    login,
    isLoggingIn: loginMutation.isLoading,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isLoading,
    registrationError: registerMutation.error,

    // Invitation verification
    verifyInvitation,
    isVerifyingInvitation: verifyInvitationMutation.isLoading,
    verificationError: verifyInvitationMutation.error,
    verificationData: verifyInvitationMutation.data?.data,

    // Tenant registration
    registerTenant,
    isRegistering: registerTenantMutation.isLoading,
    registrationError: registerTenantMutation.error,

    // Logout
    logout,
    isLoggingOut: logoutMutation.isLoading,

    // Profile
    updateUserProfile,

    // Change password
    changePassword: useCallback(
      (data) => {
        return changePasswordMutation.mutateAsync(data);
      },
      [changePasswordMutation]
    ),
    isChangingPassword: changePasswordMutation.isLoading,
    changePasswordError: changePasswordMutation.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Auth hook for easy context consumption
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
