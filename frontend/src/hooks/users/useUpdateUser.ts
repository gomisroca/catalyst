import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';
import { getCookie } from '@/lib/cookies';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const accessToken = getCookie('__catalyst__jwt');

  return useMutation({
    mutationFn: (userData: FormData) => {
      if (!accessToken) throw new Error('No access token found');
      return userService.updateUser(accessToken!, userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['self', 'users', accessToken] });
    },
    retry: 1, // Retry once on failure
  });
};
