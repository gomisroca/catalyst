import { authService } from '@/api/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return authService.signOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['self'] });
    },
    onError: (error) => {
      console.error('Failed to sign out:', error);
    },
    retry: 1, // Retry once on failure
  });
};
