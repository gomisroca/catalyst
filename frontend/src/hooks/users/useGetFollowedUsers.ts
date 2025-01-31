import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';

export const useGetFollowedUsers = () => {
  return useQuery({
    queryKey: ['getFollowedUsers', 'users'],
    queryFn: () => userService.getFollowedUsers(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
