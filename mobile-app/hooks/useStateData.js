import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../api/api-client";

export const useStateData = () => {
  const { state } = useAuth();
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  const ENDPOINTS = {
    PROFILE: (id) => `/profile/${id}`,
    NOTIFICATIONS: (id) => `/notifications/${id}`,
    ACTIVITIES: "/api/tenant/activities",
  };

  // Fetch tenant profile
  const fetchProfile = async () => {
    try {
      const response = await apiClient.get(
        ENDPOINTS.PROFILE(state?.userData?._id)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get(
        ENDPOINTS.NOTIFICATIONS(state?.userData?._id)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  };

  // Fetch recent activities
  // const fetchRecentActivities = async () => {
  //   try {
  //     const response = await axios.get("/api/tenant/activities", {
  //       headers: {
  //         Authorization: `Bearer ${state.token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching activities:", error);
  //     throw error;
  //   }
  // };

  // Profile query
  const profileQuery = useQuery({
    queryKey: ["tenantProfile"],
    queryFn: fetchProfile,
    enabled: !!state?.userData?.token,
  });

  // Notifications query
  const notificationsQuery = useQuery({
    queryKey: ["tenantNotifications"],
    queryFn: fetchNotifications,
    enabled: !!state?.userData?.token && isInitialized,
  });

  // Recent activities query
  // const activitiesQuery = useQuery({
  //   queryKey: ["tenantActivities"],
  //   queryFn: fetchRecentActivities,
  //   enabled: !!state.token && isInitialized,
  // });

  // Initialize data fetching
  const initializeData = () => {
    setIsInitialized(true);
  };

  // Refresh all data
  const refreshAllData = async () => {
    await Promise.all([
      queryClient.invalidateQueries(["tenantProfile"]),
      // queryClient.invalidateQueries(["tenantNotifications"]),
      // queryClient.invalidateQueries(["tenantActivities"]),
    ]);
  };

  // Refresh specific data
  const refreshProfile = () => queryClient.invalidateQueries(["tenantProfile"]);
  const refreshNotifications = () =>
    queryClient.invalidateQueries(["tenantNotifications"]);
  const refreshActivities = () =>
    queryClient.invalidateQueries(["tenantActivities"]);

  return {
    profile: profileQuery.data,
    notifications: notificationsQuery.data,
    // activities: activitiesQuery.data,
    isLoading: profileQuery.isLoading || notificationsQuery.isLoading,
    // activitiesQuery.isLoading,
    isError: profileQuery.isError || notificationsQuery.isError,
    // activitiesQuery.isError,
    error: profileQuery.error || notificationsQuery.error,
    initializeData,
    refreshAllData,
    refreshProfile,
    refreshNotifications,
    // refreshActivities,
  };
};
