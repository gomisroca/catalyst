import { branchService, CreateBranchData } from '@/api/services/branchService';
import { useMutation } from '@tanstack/react-query';

export const useCreateBranch = () => {
  return useMutation({
    mutationFn: (branchData: CreateBranchData) => {
      return branchService.createBranch(branchData);
    },
    retry: 1, // Retry once on failure
  });
};
