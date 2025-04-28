import apiClient from "./api-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Auth API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_INVITATION: "/auth/verify-invitation",
  REGISTER_TENANT: "/auth/register-tenant",
  LOGOUT: "/auth/logout",
};

export const login = async (credentials) => {
  // For demo purposes, we'll mock the API call
  //   if (process.env.NODE_ENV === "development") {
  //     // Simulate API delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Mock logic to determine user type based on email
  //     const email = credentials.email.toLowerCase();
  //     let userType, userData, token;

  //     if (email.includes("landlord") || email === "admin@gharbeti.com") {
  //       userType = "landlord";
  //       userData = {
  //         id: "123",
  //         name: "Raj Landlord",
  //         email: email,
  //         phone: "+91 98765 12345",
  //         properties: [
  //           { id: "prop1", name: "Green Valley Apartments" },
  //           { id: "prop2", name: "Blue Heights" },
  //         ],
  //       };
  //       token = "mock-landlord-token-123456";
  //     } else if (email.includes("tenant") || email === "john@example.com") {
  //       userType = "tenant";
  //       userData = {
  //         id: "456",
  //         name: "John Doe",
  //         email: email,
  //         phone: "+91 98765 43210",
  //         property: {
  //           id: "prop1",
  //           name: "Apartment 303, Green Valley",
  //         },
  //       };
  //       token = "mock-tenant-token-123456";
  //     } else {
  //       // Simulate authentication failure
  //       throw new Error("Invalid credentials");
  //     }

  //     // Store token
  //     await AsyncStorage.setItem("authToken", token);

  //     // Return mock response
  //     return {
  //       data: {
  //         user: userData,
  //         userType,
  //         token,
  //       },
  //     };
  //   }

  // Real API call for production
  const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
  console.log(response?.data, credentials);
  // Store token
  if (response.data.token) {
    await AsyncStorage.setItem("authToken", response.data.token);
  }

  return response;
};

export const verifyInvitation = async (data) => {
  // For demo purposes, we'll mock the API call
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation logic
    if (data.invitationCode === "123456" && data.email.includes("@")) {
      return {
        data: {
          success: true,
          message: "Invitation code verified successfully.",
          propertyDetails: {
            id: "prop1",
            name: "Apartment 303, Green Valley",
          },
        },
      };
    } else {
      throw {
        response: {
          data: {
            success: false,
            message: "Invalid invitation code or email.",
          },
        },
      };
    }
  }

  return apiClient.post(AUTH_ENDPOINTS.VERIFY_INVITATION, data);
};

export const registerTenant = async (data) => {
  // For demo purposes, we'll mock the API call
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock user data
    const userData = {
      id: Math.random().toString(36).substring(2, 9),
      name: "New Tenant",
      email: data.email,
      phone: "",
      property: {
        id: "prop1",
        name: "Apartment 303, Green Valley",
      },
    };

    const token =
      "mock-new-tenant-token-" + Math.random().toString(36).substring(2, 9);

    // Store token
    await AsyncStorage.setItem("authToken", token);

    return {
      data: {
        user: userData,
        userType: "tenant",
        token,
      },
    };
  }

  const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER_TENANT, data);

  // Store token
  if (response.data.token) {
    await AsyncStorage.setItem("authToken", response.data.token);
  }

  return response;
};

/**
 * Logout a user
 * @returns {Promise} - Success status
 */
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

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} - True if authenticated, false otherwise
 */
export const checkAuth = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const userDataString = await AsyncStorage.getItem("userData");

    return !!token && !!userDataString;
  } catch (error) {
    return false;
  }
};
