import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as maintenanceApi from "../api/maintenance-api";

export function useMaintenance(id) {
  const queryClient = useQueryClient();

  const getMaintenanceRequests = (status) => {
    console.log(status);
    return useQuery({
      queryKey: ["maintenanceRequests", status],
      queryFn: () => maintenanceApi.getMaintenanceRequests(status),
      select: (response) => response.data,
      // staleTime: 1 * 60 * 1000, // 5 minutes
    });
  };

  const getMaintenanceRequestById = (id) => {
    return useQuery({
      queryKey: ["maintenanceRequest", id],
      queryFn: () => maintenanceApi.getMaintenanceRequestById(id),
      enabled: !!id, // Only run query if id is provided
      select: (response) => response.data,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const createMaintenanceRequest = () => {
    return useMutation({
      mutationFn: maintenanceApi.createMaintenanceRequest,
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["maintenanceRequests"] });
      },
    });
  };

  const updateMaintenanceRequest = () => {
    return useMutation({
      mutationFn: ({ id, data }) =>
        maintenanceApi.updateMaintenanceRequest(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["maintenanceRequest", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["maintenanceRequests"] });
      },
    });
  };

  const addMaintenanceComment = () => {
    return useMutation({
      mutationFn: ({ id, comment }) =>
        maintenanceApi.addMaintenanceComment(id, comment),
      // Optimistic update
      onMutate: async (variables) => {
        // Cancel any outgoing refetches to avoid overwriting our optimistic update
        await queryClient.cancelQueries({
          queryKey: ["maintenanceRequest", variables.id],
        });

        // Snapshot the previous value
        const previousData = queryClient.getQueryData([
          "maintenanceRequest",
          variables.id,
        ]);

        // Optimistically update the cache
        if (previousData) {
          queryClient.setQueryData(
            ["maintenanceRequest", variables.id],
            (old) => {
              if (!old || !old.data || !old.data.updates) return old;

              return {
                ...old,
                data: {
                  ...old.data,
                  updates: [
                    ...old.data.updates,
                    {
                      id: `temp-${Date.now()}`,
                      date: new Date().toLocaleDateString(),
                      time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                      text: variables.comment,
                      type: "tenant",
                    },
                  ],
                },
              };
            }
          );
        }

        // Return the snapshot
        return { previousData };
      },
      // If the mutation fails, roll back to the previous value
      onError: (err, variables, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(
            ["maintenanceRequest", variables.id],
            context.previousData
          );
        }
      },
      // Always refetch after error or success
      onSettled: (_, __, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["maintenanceRequest", variables.id],
        });
      },
    });
  };

  const deleteMaintenanceRequest = () => {
    return useMutation({
      mutationFn: maintenanceApi.deleteMaintenanceRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["maintenanceRequests"] });
      },
    });
  };

  return {
    getMaintenanceRequests: (status) => getMaintenanceRequests(status),
    getMaintenanceRequestById: (id) => getMaintenanceRequestById(id),
    createMaintenanceRequest,
    updateMaintenanceRequest,
    addMaintenanceComment,
    deleteMaintenanceRequest,
  };
}
