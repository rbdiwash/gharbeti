import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as tenantsApi from "../api/tenants-api";

export function useTenants() {
  const queryClient = useQueryClient();

  const getTenants = (landlordId) => {
    return useQuery({
      queryKey: ["tenants", landlordId],
      queryFn: () => tenantsApi.getTenants(landlordId),
      select: (response) => response.data,
      enabled: !!landlordId, // Only run query if landlordId is provided
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const getTenantByLandlordId = (landlordId) => {
    return useQuery({
      queryKey: ["tenantRequest", landlordId],
      queryFn: () => tenantsApi.getTenantByLandlordId(landlordId),
      enabled: !!landlordId, // Only run query if landlordId is provided
      select: (response) => response.data,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const createTenant = () => {
    return useMutation({
      mutationFn: tenantsApi.createTenant,
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["tenantRequests"] });
      },
    });
  };

  const verifyInvitation = () => {
    return useMutation({
      mutationFn: tenantsApi.verifyInvitation,
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
      },
    });
  };

  const setPassword = () => {
    return useMutation({
      mutationFn: tenantsApi.setPassword,
    });
  };

  const updateTenant = () => {
    return useMutation({
      mutationFn: ({ id, data }) => tenantsApi.updateTenant(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["tenantRequest", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["tenantRequests"] });
      },
    });
  };

  const deleteTenant = () => {
    return useMutation({
      mutationFn: (id) => tenantsApi.deleteTenant(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tenantRequests"] });
      },
    });
  };

  return {
    getTenants,
    getTenantByLandlordId,
    createTenant,
    updateTenant,
    deleteTenant,
    verifyInvitation,
    setPassword,
  };
}
