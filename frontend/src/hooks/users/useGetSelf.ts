import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';
import { getCookie } from '@/lib/cookies';

export const useGetSelf = () => {
  const accessToken = getCookie('__catalyst__jwt');

  return useQuery({
    queryKey: ['self', 'users', accessToken],
    queryFn: () => userService.getSelf(accessToken!),
    enabled: !!accessToken, // Ensures the query doesn't run without an accessToken
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
