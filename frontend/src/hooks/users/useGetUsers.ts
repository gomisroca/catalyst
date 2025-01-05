import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['getUsers', 'users'],
    queryFn: () => userService.getUsers(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
