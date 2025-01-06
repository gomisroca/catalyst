import { interactionService } from '@/api/services/interactionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      return interactionService.followUser(userId);
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
