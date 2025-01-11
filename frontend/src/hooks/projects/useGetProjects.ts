import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useGetProjects = ({ userId }: { userId?: string }) => {
  return useQuery({
    queryKey: ['getProjects', 'projects'],
    queryFn: () => projectService.getProjects({ userId }),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
