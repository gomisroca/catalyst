import { postService } from '@/api/services/postService';
import { useQuery } from '@tanstack/react-query';

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ['getPost', 'posts', id],
    queryFn: () => postService.getPost(id),
    enabled: !!id, // Ensure the query runs only if id is provided
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
