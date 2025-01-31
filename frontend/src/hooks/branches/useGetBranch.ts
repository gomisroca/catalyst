import { useQuery } from '@tanstack/react-query';
import { branchService } from '@/api/services/branchService';

export const useGetBranch = (id: string) => {
  return useQuery({
    queryKey: ['getBranch', 'branches', id],
    queryFn: () => branchService.getBranch(id),
    enabled: !!id, // Ensure the query runs only if id is provided
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
