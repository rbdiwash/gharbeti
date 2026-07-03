import apiClient from "./api-client";

// Maintenance API endpoints
const NOTICE_ENDPOINTS = {
  GET_ALL: "/notices",
  CREATE: "/notices",
  GET_BY_ID: (id) => `/notices/${id}/`,
  UPDATE: (id) => `/notices/${id}`,
  DELETE: (id) => `/notices/${id}`,
  ADD_COMMENT: (id) => `/notices/${id}/comments`,
};

export const getNoticeRequests = async (type) => {
  // For demo purposes, we'll mock the API call

  // Real API call for production
  const params = type ? { type } : {};
  return apiClient.get(NOTICE_ENDPOINTS.GET_ALL, { params });
};

export const getNoticeRequestById = async (id) => {
  try {
    const response = await apiClient.get(NOTICE_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    console.error(
      "Error fetching notice request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createNoticeRequest = async (requestData) => {
  console.log(requestData);
  try {
    const response = await apiClient.post(NOTICE_ENDPOINTS.CREATE, requestData);
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

export const addNoticeComment = async (id, comment) => {
  try {
    const response = await apiClient.post(NOTICE_ENDPOINTS.ADD_COMMENT(id), {
      comment,
    });
    return response;
  } catch (error) {
    console.error(
      "Error adding notice comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteNoticeRequest = async (id) => {
  try {
    const response = await apiClient.delete(NOTICE_ENDPOINTS.DELETE(id));
    return response;
  } catch (error) {
    console.error(
      "Error deleting notice request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
