import { postService } from '@/api/services/postService';
import { useQuery } from '@tanstack/react-query';

export const useGetPosts = ({ branchId, userId }: { branchId?: string; userId?: string }) => {
  return useQuery({
    queryKey: ['getPosts', 'posts'],
    queryFn: () => postService.getPosts({ branchId, userId }),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
