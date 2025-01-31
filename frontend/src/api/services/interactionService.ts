import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { type User } from '@/api/schemas/UserSchema';
import { InteractionSchema, UserSchema } from '@/api/schemas/BaseSchema';

export const interactionService = {
  followUser: async (profileId: string) => {
    try {
      const res = await apiService.get<Res<User>>(ENDPOINTS.INTERACTIONS.FOLLOW(profileId));
      return UserSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to follow user:', error);
      throw error;
    }
  },

  unfollowUser: async (profileId: string) => {
    try {
      const res = await apiService.delete<Res<User>>(ENDPOINTS.INTERACTIONS.FOLLOW(profileId));
      return UserSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
      throw error;
    }
  },

  addBranchInteraction: async (branchId: string, interaction: string) => {
    try {
      const res = await apiService.get<Res<Interaction>>(ENDPOINTS.INTERACTIONS.BRANCH(branchId, interaction));
      return InteractionSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to add branch interaction:', error);
      throw error;
    }
  },

  removeBranchInteraction: async (branchId: string, interaction: string) => {
    try {
      const res = await apiService.delete<Res<Interaction>>(ENDPOINTS.INTERACTIONS.BRANCH(branchId, interaction));
      return InteractionSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to remove branch interaction:', error);
      throw error;
    }
  },

  addPostInteraction: async (postId: string, interaction: string) => {
    try {
      const res = await apiService.get<Res<Interaction>>(ENDPOINTS.INTERACTIONS.POST(postId, interaction));
      return InteractionSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to add post interaction:', error);
      throw error;
    }
  },

  removePostInteraction: async (postId: string, interaction: string) => {
    try {
      const res = await apiService.delete<Res<Interaction>>(ENDPOINTS.INTERACTIONS.POST(postId, interaction));
      return InteractionSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to remove post interaction:', error);
      throw error;
    }
  },
};
