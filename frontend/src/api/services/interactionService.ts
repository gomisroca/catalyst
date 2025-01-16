import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { type User } from '@/api/schemas/UserSchema';
import { BranchSchema, PostSchema, UserSchema } from '@/api/schemas/BaseSchema';

export const interactionService = {
  followUser: async (profileId: string) => {
    try {
      const response = await apiService.get<User>(ENDPOINTS.INTERACTIONS.FOLLOW(profileId));
      return UserSchema.parse(response);
    } catch (error) {
      console.error('Failed to follow user:', error);
      throw error;
    }
  },

  unfollowUser: async (profileId: string) => {
    try {
      const response = await apiService.delete<User>(ENDPOINTS.INTERACTIONS.FOLLOW(profileId));
      return UserSchema.parse(response);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
      throw error;
    }
  },

  addBranchInteraction: async (branchId: string, interaction: string) => {
    try {
      const response = await apiService.get<Branch>(ENDPOINTS.INTERACTIONS.BRANCH(branchId, interaction));
      return BranchSchema.parse(response);
    } catch (error) {
      console.error('Failed to add branch interaction:', error);
      throw error;
    }
  },

  removeBranchInteraction: async (branchId: string, interaction: string) => {
    try {
      const response = await apiService.delete<Branch>(ENDPOINTS.INTERACTIONS.BRANCH(branchId, interaction));
      return BranchSchema.parse(response);
    } catch (error) {
      console.error('Failed to remove branch interaction:', error);
      throw error;
    }
  },

  addPostInteraction: async (postId: string, interaction: string) => {
    try {
      const response = await apiService.get<Post>(ENDPOINTS.INTERACTIONS.POST(postId, interaction));
      return PostSchema.parse(response);
    } catch (error) {
      console.error('Failed to add post interaction:', error);
      throw error;
    }
  },

  removePostInteraction: async (postId: string, interaction: string) => {
    try {
      const response = await apiService.delete<Post>(ENDPOINTS.INTERACTIONS.POST(postId, interaction));
      return PostSchema.parse(response);
    } catch (error) {
      console.error('Failed to remove post interaction:', error);
      throw error;
    }
  },
};
