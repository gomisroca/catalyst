import { useQuery } from '@tanstack/react-query';
import { branchService } from '@/api/services/branchService';

export const useGetBranches = ({ projectId, userId }: { projectId?: string; userId?: string }) => {
  return useQuery({
    queryKey: ['getBranches', 'branches'],
    queryFn: () => branchService.getBranches({ projectId, userId }),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
