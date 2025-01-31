import { z } from 'zod';
import { PostSchema } from './BaseSchema';

export const createPostSchema = z.object({
  branchId: z.string(),
  content: z.string(),
  media: z.any(),
});

export const updatePostSchema = z.object({
  content: z.string(),
  media: z.any(),
});

export type Post = z.infer<typeof PostSchema>;
export type CreatePostData = z.infer<typeof createPostSchema>;
export type UpdatePostData = z.infer<typeof updatePostSchema>;
