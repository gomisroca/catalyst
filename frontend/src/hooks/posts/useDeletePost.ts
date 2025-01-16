import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/api/services/postService';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return postService.deletePost(id);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
    },
    retry: 1, // Retry once on failure
  });
};
