import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/services/userService';

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ['getUser', 'users', id],
    queryFn: () => userService.getUser(id),
    enabled: !!id, // Ensure the query runs only if id is provided
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60,
    retry: 1, // Retry once on failure
  });
};
