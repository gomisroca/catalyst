import { z } from 'zod';
import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { updateUserSchema, type User, type UpdateUserData } from '@/api/schemas/UserSchema';
import { baseUserSchema, UserSchema } from '@/api/schemas/BaseSchema';

export const userService = {
  getSelf: async (accessToken: string) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await apiService.get<User>(ENDPOINTS.USERS.SELF, options);
      return baseUserSchema.parse(response);
    } catch (error) {
      console.error('Failed to get self:', error);
      throw error;
    }
  },

  getUser: async (id: string) => {
    try {
      const response = await apiService.get<User>(ENDPOINTS.USERS.DETAIL(id));
      return UserSchema.parse(response);
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  },

  getFollowedUsers: async (accessToken: string) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await apiService.get<User[]>(ENDPOINTS.USERS.FOLLOWED, options);
      return z.array(UserSchema).parse(response);
    } catch (error) {
      console.error('Failed to get followed users:', error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await apiService.get<User[]>(ENDPOINTS.USERS.LIST);
      return z.array(UserSchema).parse(response);
    } catch (error) {
      console.error('Failed to get users:', error);
      throw error;
    }
  },

  updateUser: async (accessToken: string, userData: FormData) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      updateUserSchema.parse(userData);
      const response = await apiService.put<unknown>(ENDPOINTS.USERS.UPDATE, userData, options);
      return baseUserSchema.parse(response);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  },

  deleteUser: async (accessToken: string) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await apiService.delete<void>(ENDPOINTS.USERS.DELETE, options);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  },
};

export type { User, UpdateUserData };
