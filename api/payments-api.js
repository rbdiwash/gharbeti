import apiClient from "./api-client";

// Maintenance API endpoints
const PAYMENTS_ENDPOINTS = {
  GET_ALL: (id) => `/payments/landlord/${id}`,
  CREATE: "/payments",
  GET_BY_ID: (id) => `/payments/tenant/${id}`,
  UPDATE: (id) => `/payments/${id}`,
  DELETE: (id) => `/payments/${id}`,
  ADD_COMMENT: (id) => `/payments/${id}/comments`,
};

export const getPayments = async (id) => {
  try {
    const response = await apiClient.get(PAYMENTS_ENDPOINTS.GET_ALL(id));
    return response;
  } catch (error) {
    console.error(
      "Error fetching payments:",
      error.response?.data || error.message
    );
  }
};

export const getPaymentById = async (id) => {
  console.log("id", id);
  try {
    const response = await apiClient.get(PAYMENTS_ENDPOINTS.GET_BY_ID(id));
    console.log("response", response);
    return response;
  } catch (error) {
    console.error(
      "Error fetching payment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createPayment = async (requestData) => {
  console.log("dddddd", requestData);
  try {
    const response = await apiClient.post(
      PAYMENTS_ENDPOINTS.CREATE,
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

export const updateNoticeRequest = async (id, requestData) => {
  try {
    const response = await apiClient.put(
      NOTICE_ENDPOINTS.UPDATE(id),
      requestData
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating notice request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
