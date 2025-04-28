import apiClient from "./api-client";

// Maintenance API endpoints
const MAINTENANCE_ENDPOINTS = {
  GET_ALL: "/maintenance",
  CREATE: "/maintenance",
  GET_BY_ID: (id) => `/maintenance/${id}/`,
  UPDATE: (id) => `/maintenance/${id}`,
  DELETE: (id) => `/maintenance/${id}`,
  ADD_COMMENT: (id) => `/maintenance/${id}/comments`,
};

export const getMaintenanceRequests = async (status) => {
  // For demo purposes, we'll mock the API call
  // Real API call for production
  const params = status ? { status } : {};
  return apiClient.get(MAINTENANCE_ENDPOINTS.GET_ALL, { params });
};

export const getMaintenanceRequestById = async (id) => {
  try {
    const response = await apiClient.get(MAINTENANCE_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    console.error(
      "Error fetching maintenance request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createMaintenanceRequest = async (requestData) => {
  try {
    const response = await apiClient.post(
      MAINTENANCE_ENDPOINTS.CREATE,
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error creating maintenance request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateMaintenanceRequest = async (id, requestData) => {
  try {
    const response = await apiClient.put(
      MAINTENANCE_ENDPOINTS.UPDATE(id),
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating maintenance request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addMaintenanceComment = async (id, comment) => {
  try {
    const response = await apiClient.post(
      MAINTENANCE_ENDPOINTS.ADD_COMMENT(id),
      { comment }
    );
    return response;
  } catch (error) {
    console.error(
      "Error adding maintenance comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteMaintenanceRequest = async (id) => {
  try {
    const response = await apiClient.delete(MAINTENANCE_ENDPOINTS.DELETE(id));
    return response;
  } catch (error) {
    console.error(
      "Error deleting maintenance request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
