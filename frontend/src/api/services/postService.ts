import { z } from 'zod';
import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { PostSchema } from '@/api/schemas/BaseSchema';
import { CreatePostData, Post, UpdatePostData } from '@/api/schemas/PostSchema';

export const postService = {
  getPost: async (id: string) => {
    try {
      const response = await apiService.get<Post>(ENDPOINTS.POSTS.DETAIL(id));
      return PostSchema.parse(response);
    } catch (error) {
      console.error('Failed to get post:', error);
      throw error;
    }
  },

  getPosts: async ({ branchId, userId }: { branchId?: string; userId?: string }) => {
    try {
      const response = await apiService.get<Post[]>(ENDPOINTS.POSTS.LIST({ branchId, userId }));
      return z.array(PostSchema).parse(response);
    } catch (error) {
      console.error('Failed to get posts:', error);
      throw error;
    }
  },

  createPost: async (postData: CreatePostData) => {
    try {
      const response = await apiService.post<Post>(ENDPOINTS.POSTS.CREATE, postData);
      return PostSchema.parse(response);
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  },

  updatePost: async (id: string, postData: UpdatePostData) => {
    try {
      const response = await apiService.put<Post>(ENDPOINTS.POSTS.UPDATE(id), postData);
      return PostSchema.parse(response);
    } catch (error) {
      console.error('Failed to update post:', error);
      throw error;
    }
  },

  deletePost: async (id: string) => {
    try {
      await apiService.delete<void>(ENDPOINTS.POSTS.DELETE(id));
      return id;
    } catch (error) {
      console.error('Failed to delete post:', error);
      throw error;
    }
  },
};

export type { Post, CreatePostData, UpdatePostData };
