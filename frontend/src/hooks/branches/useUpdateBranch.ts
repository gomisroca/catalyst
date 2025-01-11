import { useMutation, useQueryClient } from '@tanstack/react-query';
import { branchService, UpdateBranchData } from '@/api/services/branchService';

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, branchData }: { id: string; branchData: UpdateBranchData }) => {
      return branchService.updateBranch(id, branchData);
    },
    onSuccess: (branchData) => {
      queryClient.invalidateQueries({ queryKey: ['branches', branchData.id] });
    },
    retry: 1, // Retry once on failure
  });
};
