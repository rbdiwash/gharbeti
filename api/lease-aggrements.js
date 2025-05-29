import apiClient from "./api-client";

// Maintenance API endpoints
const LEASE_AGREEMENTS_ENDPOINTS = {
  GET: (id) => `/lease-agreements/${id}`,
  CREATE: "/lease-agreements",
  UPDATE: (id) => `/lease-agreements/${id}`,
};

export const getLeaseAggreements = async (id) => {
  // For demo purposes, we'll mock the API call
  // Real API call for production
  return apiClient.get(LEASE_AGREEMENTS_ENDPOINTS.GET(id));
};

export const createLeaseAgreement = async (requestData) => {
  try {
    const response = await apiClient.post(
      LEASE_AGREEMENTS_ENDPOINTS.CREATE,
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error creating lease agreement:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateLeaseAgreement = async (id, requestData) => {
  try {
    const response = await apiClient.put(
      LEASE_AGREEMENTS_ENDPOINTS.UPDATE(id),
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating lease agreement:",
      error.response?.data || error.message
    );
    throw error;
  }
};
