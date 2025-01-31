import { interactionService } from '@/api/services/interactionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      return interactionService.unfollowUser(userId);
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['getUser', 'users', userId] });
    },
    onError: (error) => {
      console.error('Failed to unfollow user:', error);
    },
    retry: 1, // Retry once on failure
  });
};
