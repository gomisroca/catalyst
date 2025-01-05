export const ENDPOINTS = {
  USERS: {
    LIST: '/users',
    SELF: '/users/self',
    FOLLOWED: '/users/followed',
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: '/users/self',
    DELETE: '/users/self',
  },
  AUTH: {
    DISCORD: '/auth/discord',
    FACEBOOK: '/auth/facebook',
    GOOGLE: '/auth/google',
  },
  INTERACTIONS: {
    FOLLOW: (id: string) => `/interactions/user/${id}/follow`,
  },
};
