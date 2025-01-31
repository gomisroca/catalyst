import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: FormData) => {
      return userService.updateUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['self'] });
    },
    retry: 1, // Retry once on failure
  });
};
