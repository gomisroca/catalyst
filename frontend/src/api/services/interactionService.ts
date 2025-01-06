import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { type User } from '@/api/schemas/UserSchema';
import { UserSchema } from '@/api/schemas/BaseSchema';

export const interactionService = {
  followUser: async (profileId: string) => {
    const response = await apiService.get<User>(ENDPOINTS.INTERACTIONS.FOLLOW(profileId));
    return UserSchema.parse(response);
  },
};
