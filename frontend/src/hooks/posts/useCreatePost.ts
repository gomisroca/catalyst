import { postService } from '@/api/services/postService';
import { useMutation } from '@tanstack/react-query';

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (postData: FormData) => {
      return postService.createPost(postData);
    },
    retry: 1, // Retry once on failure
  });
};
