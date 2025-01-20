import { useInfiniteQuery } from '@tanstack/react-query';
import { projectService } from '@/api/services/projectService';

export const useGetProjects = ({ userId, limit = 10 }: { userId: string; limit?: number }) => {
  return useInfiniteQuery({
    queryKey: ['projects', { userId, limit }],
    queryFn: ({ pageParam }) =>
      projectService.getProjects({
        userId,
        cursor: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
  });
};
