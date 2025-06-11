import apiClient from "./api-client";

// Maintenance API endpoints
const NOTIFICATION_ENDPOINTS = {
  GET_ALL: (id) => `/notifications/${id}`,
  CREATE: "/notifications/send",
  GET_BY_ID: (id) => `/notifications/${id}/`,
  UPDATE: (id) => `/notifications/${id}`,
  DELETE: (id) => `/notifications/${id}`,
};

export const getNotifications = async (id) => {
  // For demo purposes, we'll mock the API call

  // Real API call for production
  return apiClient.get(NOTIFICATION_ENDPOINTS.GET_ALL(id));
};

export const getNotificationById = async (id) => {
  try {
    const response = await apiClient.get(NOTIFICATION_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    console.error(
      "Error fetching notification:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createNotification = async (requestData) => {
  console.log(requestData);
  try {
    const response = await apiClient.post(
      NOTIFICATION_ENDPOINTS.CREATE,
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error creating notice request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateNotification = async (id, requestData) => {
  try {
    const response = await apiClient.put(
      NOTIFICATION_ENDPOINTS.UPDATE(id),
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating notification:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await apiClient.delete(NOTIFICATION_ENDPOINTS.DELETE(id));
    return response;
  } catch (error) {
    console.error(
      "Error deleting notification:",
      error.response?.data || error.message
    );
    throw error;
  }
};
