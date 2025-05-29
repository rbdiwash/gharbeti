import apiClient from "./api-client";

// Maintenance API endpoints
const CHAT_ENDPOINTS = {
  GET_CHAT: (user1, user2) => `/messages/${user1}/${user2}`,
  POST: "/messages",
  GET_BY_ID: (id) => `/messages/${id}/`,
};

export const getChats = async (user1, user2) => {
  try {
    const reponse = await apiClient.get(CHAT_ENDPOINTS.GET_CHAT(user1, user2));
    return reponse;
  } catch (error) {
    console.error(
      "Error fetching chat request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatById = async (id) => {
  try {
    const response = await apiClient.get(CHAT_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    console.error(
      "Error fetching chat request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postChat = async (requestData) => {
  try {
    const response = await apiClient.post(CHAT_ENDPOINTS.POST, requestData);
    return response;
  } catch (error) {
    console.error(
      "Error creating chat request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
