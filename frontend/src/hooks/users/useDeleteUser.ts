import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';
import { getCookie, removeCookie } from '@/lib/cookies';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const accessToken = getCookie('__catalyst__jwt');

  return useMutation({
    mutationFn: () => {
      if (!accessToken) throw new Error('No access token found');
      return userService.deleteUser(accessToken!);
    },
    onSuccess: () => {
      removeCookie('__catalyst__jwt');
      queryClient.invalidateQueries({ queryKey: ['self', 'users', accessToken] });
    },
    retry: 1, // Retry once on failure
  });
};
