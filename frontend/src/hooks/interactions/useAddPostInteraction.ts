import { interactionService } from '@/api/services/interactionService';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type AddPostInteractionVariables = {
  postId: string;
  interaction: string;
};

type AddPostInteractionResponse = Interaction;

export const useAddPostInteraction = (
  options?: UseMutationOptions<AddPostInteractionResponse, Error, AddPostInteractionVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<AddPostInteractionResponse, Error, AddPostInteractionVariables>({
    mutationFn: ({ postId, interaction }: { postId: string; interaction: string }) => {
      return interactionService.addPostInteraction(postId, interaction);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['getPost', 'posts', variables.postId] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to add ${interaction} to post:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
