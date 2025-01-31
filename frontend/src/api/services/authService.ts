import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';

export const authService = {
  signOut: async () => {
    try {
      await apiService.delete(ENDPOINTS.AUTH.SIGNOUT);
    } catch (error) {
      console.error('Failed to sign out:', error);
      throw error;
    }
  },
};
