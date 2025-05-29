import apiClient from "./api-client";

// Maintenance API endpoints
const PROFILE_ENDPOINTS = {
  UPDATE: (id) => `/profile/${id}`,
  CHANGE_PASSWORD: "/users/change-password",
};

export const updateProfile = async (id, requestData) => {
  try {
    const response = await apiClient.put(
      PROFILE_ENDPOINTS.UPDATE(id),
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const changePassword = async (requestData) => {
  try {
    const response = await apiClient.post(
      PROFILE_ENDPOINTS.CHANGE_PASSWORD,
      requestData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
