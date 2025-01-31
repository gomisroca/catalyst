import { useMutation, useQueryClient } from '@tanstack/react-query';
import { branchService } from '@/api/services/branchService';

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return branchService.deleteBranch(id);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['branches', id] });
    },
    retry: 1, // Retry once on failure
  });
};
