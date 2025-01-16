import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/api/services/postService';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, postData }: { id: string; postData: FormData }) => {
      return postService.updatePost(id, postData);
    },
    onSuccess: (postData) => {
      queryClient.invalidateQueries({ queryKey: ['posts', postData.id] });
    },
    retry: 1, // Retry once on failure
  });
};
