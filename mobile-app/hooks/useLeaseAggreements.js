import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as leaseApi from "../api/lease-aggrements";

export function useLeaseAggreements() {
  const queryClient = useQueryClient();

  const getLeaseAggreements = (id) => {
    return useQuery({
      queryKey: ["leaseAgreements", id],
      queryFn: () => leaseApi.getLeaseAggreements(id),
      enabled: !!id,
      select: (response) => response?.data?.agreements ?? [],
    });
  };

  const createLeaseAgreement = () => {
    return useMutation({
      mutationFn: (data) => leaseApi.createLeaseAgreement(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["leaseAgreements"] });
      },
    });
  };

  const updateLeaseAgreement = () => {
    return useMutation({
      mutationFn: ({ id, data }) => leaseApi.updateLeaseAgreement(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["leaseAgreements"] });
        queryClient.invalidateQueries({
          queryKey: ["leaseAgreements", variables.id],
        });
      },
    });
  };

  return {
    getLeaseAggreements,
    createLeaseAgreement,
    updateLeaseAgreement,
  };
}
