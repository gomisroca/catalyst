import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';

export const useGetSelf = () => {
  return useQuery({
    queryKey: ['self', 'users'],
    queryFn: () => userService.getSelf(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
