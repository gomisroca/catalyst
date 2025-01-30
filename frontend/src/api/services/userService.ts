import { z } from 'zod';
import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { baseUserSchema, UserSchema } from '@/api/schemas/BaseSchema';
import { updateUserSchema, type User, type UpdateUserData } from '@/api/schemas/UserSchema';

export const userService = {
  getSelf: async () => {
    try {
      const res = await apiService.get<Res<User>>(ENDPOINTS.USERS.SELF);

      return baseUserSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to get self:', error);
      throw error;
    }
  },

  getUser: async (id: string) => {
    try {
      const res = await apiService.get<Res<User>>(ENDPOINTS.USERS.DETAIL(id));
      return UserSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  getFollowedUsers: async () => {
    try {
      const res = await apiService.get<Res<User[]>>(ENDPOINTS.USERS.FOLLOWED);
      return z.array(UserSchema).parse(res.data);
    } catch (error) {
      console.error('Failed to get followed users:', error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const res = await apiService.get<Res<User[]>>(ENDPOINTS.USERS.LIST);
      return z.array(UserSchema).parse(res.data);
    } catch (error) {
      console.error('Failed to get users:', error);
      throw error;
    }
  },

  updateUser: async (userData: FormData) => {
    try {
      updateUserSchema.parse(userData);
      const res = await apiService.put<Res<User>>(ENDPOINTS.USERS.UPDATE, userData);
      return baseUserSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  },

  deleteUser: async () => {
    try {
      await apiService.delete<void>(ENDPOINTS.USERS.DELETE);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  },
};

export type { User, UpdateUserData };
