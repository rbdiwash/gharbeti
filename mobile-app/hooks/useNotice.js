import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as noticeApi from "../api/notice-api";

export function useNotice(type, selectedId) {
  const queryClient = useQueryClient();
  const getNoticeRequests = () => {
    return useQuery({
      queryKey: ["notices", type],
      queryFn: () => noticeApi.getNoticeRequests(type),
      select: (response) => response.data,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const getNoticeRequestById = (id) => {
    return useQuery({
      queryKey: ["noticeRequest", id],
      queryFn: () => noticeApi.getNoticeRequestById(id),
      enabled: !!id, // Only run query if id is provided
      select: (response) => response.data,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const createNoticeRequest = () => {
    return useMutation({
      mutationFn: noticeApi.createNoticeRequest,
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["noticeRequests"] });
      },
    });
  };

  const updateNoticeRequest = () => {
    return useMutation({
      mutationFn: ({ id, data }) => noticeApi.updateNoticeRequest(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["noticeRequest", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["noticeRequests"] });
      },
    });
  };

  const deleteNoticeRequest = () => {
    return useMutation({
      mutationFn: (id) => noticeApi.deleteNoticeRequest(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["noticeRequests"] });
      },
    });
  };

  return {
    getNoticeRequests: (type) => getNoticeRequests(type),
    getNoticeRequestById: (id) => getNoticeRequestById(id),
    createNoticeRequest,
    updateNoticeRequest,
    deleteNoticeRequest,
  };
}
