import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as notificationApi from "../api/notification-api";

export function useNotification(type, selectedId) {
  const queryClient = useQueryClient();
  const getNotifications = (id) => {
    return useQuery({
      queryKey: ["notifications", id],
      queryFn: () => notificationApi.getNotifications(id),
      select: (response) => response.data,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const getNotificationById = (id) => {
    return useQuery({
      queryKey: ["notification", id],
      queryFn: () => notificationApi.getNotificationById(id),
      enabled: !!id, // Only run query if id is provided
      select: (response) => response.data,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const createNotification = () => {
    return useMutation({
      mutationFn: notificationApi.createNotification,
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["noticeRequests"] });
      },
    });
  };

  const updateNotification = () => {
    return useMutation({
      mutationFn: ({ id, data }) =>
        notificationApi.updateNotification(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["noticeRequest", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["noticeRequests"] });
      },
    });
  };

  const deleteNotification = () => {
    return useMutation({
      mutationFn: (id) => notificationApi.deleteNotification(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["noticeRequests"] });
      },
    });
  };

  return {
    getNotifications: (type) => getNotifications(type),
    getNotificationById: (id) => getNotificationById(id),
    createNotification,
    updateNotification,
    deleteNotification,
  };
}
