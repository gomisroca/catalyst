import { interactionService } from '@/api/services/interactionService';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type RemovePostInteractionVariables = {
  postId: string;
  interaction: string;
};

type RemovePostInteractionResponse = Interaction;

export const useRemovePostInteraction = (
  options?: UseMutationOptions<RemovePostInteractionResponse, Error, RemovePostInteractionVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, interaction }: { postId: string; interaction: string }) => {
      return interactionService.removePostInteraction(postId, interaction);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['getPost', 'posts', variables.postId] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to remove ${interaction} from post:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
