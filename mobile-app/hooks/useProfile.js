import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as profileApi from "../api/profile-api";

export function useProfile(id) {
  const queryClient = useQueryClient();

  const updateProfileRequest = () => {
    return useMutation({
      mutationFn: ({ id, data }) => profileApi.updateProfile(id, data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["profileRequest", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["profileRequests"] });
      },
    });
  };

  const changePasswordRequest = () => {
    return useMutation({
      mutationFn: ({ data }) => profileApi.changePassword(data),
      onSuccess: (_, variables) => {
        // Invalidate specific maintenance request query
        queryClient.invalidateQueries({
          queryKey: ["changePasswordRequest", variables.data],
        });
        queryClient.invalidateQueries({ queryKey: ["changePasswordRequest"] });
      },
    });
  };

  return {
    updateProfileRequest,
    changePasswordRequest,
  };
}
