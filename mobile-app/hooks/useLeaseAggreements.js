import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as leaseApi from "../api/lease-aggrements";

export function useLeaseAggreements() {
  const queryClient = useQueryClient();

  const getLeaseAggreements = (id) => {
    return useQuery({
      queryKey: ["leaseAggreements"],
      queryFn: () => leaseApi.getLeaseAggreements(id),
      select: (response) => {
        return response.data?.agreements;
      },
      // staleTime: 1 * 60 * 1000, // 5 minutes
    });
  };

  const createLeaseAgreement = () => {
    return useMutation({
      mutationFn: (data) => leaseApi.createLeaseAgreement(data),
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["maintenanceRequests"] });
      },
    });
  };

  const updateLeaseAgreement = () => {
    return useMutation({
      mutationFn: ({ id, data }) => leaseApi.updateLeaseAgreement(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["maintenanceRequest", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["maintenanceRequests"] });
      },
    });
  };

  return {
    getLeaseAggreements,
    createLeaseAgreement,
    updateLeaseAgreement,
  };
}
