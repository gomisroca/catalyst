import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return userService.deleteUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['self'] });
    },
    retry: 1, // Retry once on failure
  });
};
