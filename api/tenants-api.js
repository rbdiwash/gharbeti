import apiClient from "./api-client";

// Maintenance API endpoints
const TENANTS_ENDPOINTS = {
  GET_ALL: "/tenants",
  CREATE: "/tenants/invite",
  GET_BY_ID: (id) => `/tenants/${id}/`,
  GET_BY_LANDLORD_ID: (landlordId) => `/tenants/getByLandlordId/${landlordId}`,
  UPDATE: (id) => `/tenants/${id}`,
  DELETE: (id) => `/tenants/${id}`,
  ADD_COMMENT: (id) => `/tenants/${id}/comments`,
  VERIFY_INVITATION: "/tenants/verify",
  SET_PASSWORD: "/tenants/set-password",
};

export const getTenants = async (landlordId) => {
  // For demo purposes, we'll mock the API call

  // Real API call for production
  const params = landlordId;

  try {
    const response = await apiClient.get(TENANTS_ENDPOINTS.GET_ALL, {
      params,
    });
    return response;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw error;
  }
};

export const verifyInvitation = async (data) => {
  try {
    const response = await apiClient.post(
      TENANTS_ENDPOINTS.VERIFY_INVITATION,
      data
    );
    return response;
  } catch (error) {
    console.error(
      "Error verifying invitation:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const setPassword = async (data) => {
  try {
    const response = await apiClient.post(TENANTS_ENDPOINTS.SET_PASSWORD, data);
    console.log(response?.data);
    return response;
  } catch (error) {
    console.error("Error setting password:", error);
    throw error;
  }
};
export const getTenantByLandlordId = async (landlordId) => {
  try {
    const response = await apiClient.get(
      TENANTS_ENDPOINTS.GET_BY_LANDLORD_ID(landlordId)
    );
    return response;
  } catch (error) {
    console.error(
      "Error fetching tenant request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createTenant = async (requestData) => {
  try {
    const response = await apiClient.post(
      TENANTS_ENDPOINTS.CREATE,
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error creating tenant request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateTenant = async (id, requestData) => {
  try {
    const response = await apiClient.put(
      TENANTS_ENDPOINTS.UPDATE(id),
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating tenant request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteTenant = async (id) => {
  try {
    const response = await apiClient.delete(TENANTS_ENDPOINTS.DELETE(id));
    return response;
  } catch (error) {
    console.error(
      "Error deleting tenant request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
