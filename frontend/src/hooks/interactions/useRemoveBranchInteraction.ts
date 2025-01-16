import { interactionService } from '@/api/services/interactionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveBranchInteraction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ branchId, interaction }: { branchId: string; interaction: string }) => {
      return interactionService.removeBranchInteraction(branchId, interaction);
    },
    onSuccess: (_, { branchId }) => {
      queryClient.invalidateQueries({ queryKey: ['getBranch', 'branches', branchId] });
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to remove ${interaction} from branch:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
