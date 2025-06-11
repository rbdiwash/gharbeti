import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as paymentsApi from "../api/payments-api";

export function usePayments(type, selectedId) {
  const queryClient = useQueryClient();
  const getPayments = (id) => {
    return useQuery({
      queryKey: ["payments", id],
      queryFn: () => paymentsApi.getPayments(id),
      select: (response) => response.data,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const getPaymentById = (id) => {
    return useQuery({
      queryKey: ["payment", id],
      queryFn: () => paymentsApi.getPaymentById(id),
      enabled: !!id, // Only run query if id is provided
      select: (response) => response.data,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const createPayment = () => {
    return useMutation({
      mutationFn: paymentsApi.createPayment,
      queryKey: ["payments"],
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      },
    });
  };

  const updatePayment = () => {
    return useMutation({
      mutationFn: ({ id, data }) => paymentsApi.updatePayment(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["payment", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      },
    });
  };

  const deletePayment = () => {
    return useMutation({
      mutationFn: (id) => paymentsApi.deletePayment(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["payments"] });
      },
    });
  };

  return {
    getPayments: (id) => getPayments(id),
    getPaymentById: (id) => getPaymentById(id),
    createPayment,
    updatePayment,
    deletePayment,
  };
}
