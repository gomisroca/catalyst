import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';
import { getCookie } from '@/lib/cookies';

export const useGetFollowedUsers = () => {
  const accessToken = getCookie('__catalyst__jwt');
  return useQuery({
    queryKey: ['getFollowedUsers', 'users', accessToken],
    queryFn: () => userService.getFollowedUsers(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
