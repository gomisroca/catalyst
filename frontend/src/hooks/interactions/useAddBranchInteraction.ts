import { interactionService } from '@/api/services/interactionService';
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

type AddBranchInteractionVariables = {
  branchId: string;
  interaction: string;
};

type AddBranchInteractionResponse = Interaction;

export const useAddBranchInteraction = (
  options?: UseMutationOptions<AddBranchInteractionResponse, Error, AddBranchInteractionVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<AddBranchInteractionResponse, Error, AddBranchInteractionVariables>({
    mutationFn: ({ branchId, interaction }: { branchId: string; interaction: string }) => {
      return interactionService.addBranchInteraction(branchId, interaction);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['getBranch', 'branches', variables.branchId] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to add ${interaction} to branch:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
