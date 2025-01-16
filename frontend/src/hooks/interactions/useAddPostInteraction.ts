import { interactionService } from '@/api/services/interactionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddPostInteraction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, interaction }: { postId: string; interaction: string }) => {
      return interactionService.addPostInteraction(postId, interaction);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['getPost', 'posts', postId] });
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to add ${interaction} to post:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
