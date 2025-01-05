import { interactionService } from '@/api/services/interactionService';
import { getCookie } from '@/lib/cookies';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const accessToken = getCookie('__catalyst__jwt');

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!accessToken) throw new Error('No access token found');
      return interactionService.followUser(accessToken, userId);
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['getUser', 'users', userId] });
    },
    onError: (error) => {
      console.error('Failed to follow user:', error);
    },
    retry: 1, // Retry once on failure
  });
};
