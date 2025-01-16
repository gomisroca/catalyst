import { interactionService } from '@/api/services/interactionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBranchInteraction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ branchId, interaction }: { branchId: string; interaction: string }) => {
      return interactionService.addBranchInteraction(branchId, interaction);
    },
    onSuccess: (_, { branchId }) => {
      queryClient.invalidateQueries({ queryKey: ['getBranch', 'branches', branchId] });
    },
    onError: (error, { interaction }) => {
      console.error(`Failed to add ${interaction} to branch:`, error);
    },
    retry: 1, // Retry once on failure
  });
};
