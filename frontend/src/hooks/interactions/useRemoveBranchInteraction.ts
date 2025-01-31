import { interactionService } from '@/api/services/interactionService';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type RemoveBranchInteractionVariables = {
  branchId: string;
  interaction: string;
};

type RemoveBranchInteractionResponse = Interaction;

export const useRemoveBranchInteraction = (
  options?: UseMutationOptions<RemoveBranchInteractionResponse, Error, RemoveBranchInteractionVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<RemoveBranchInteractionResponse, Error, RemoveBranchInteractionVariables>({
    mutationFn: ({ branchId, interaction }: { branchId: string; interaction: string }) => {
      return interactionService.removeBranchInteraction(branchId, interaction);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['getBranch', 'branches', variables.branchId] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to remove ${interaction} from branch:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
