import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';
import Cookies from 'js-cookie';

export const useGetSelf = () => {
  const cookieExists = Cookies.get('__catalyst__refreshToken') !== undefined;

  return useQuery({
    queryKey: ['self', 'users'],
    queryFn: () => userService.getSelf(),
    enabled: cookieExists,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
