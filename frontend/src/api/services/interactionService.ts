import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { type User } from '@/api/schemas/UserSchema';
import { UserSchema } from '@/api/schemas/BaseSchema';

export const interactionService = {
  followUser: async (accessToken: string, profileId: string) => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await apiService.get<User>(ENDPOINTS.INTERACTIONS.FOLLOW(profileId), options);
    return UserSchema.parse(response);
  },
};
