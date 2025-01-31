import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useGetProject = (id: string) => {
  return useQuery({
    queryKey: ['getProject', 'projects', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id, // Ensure the query runs only if id is provided
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
