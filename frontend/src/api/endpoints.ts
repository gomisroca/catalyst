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
    SIGNOUT: '/auth/signout',
  },
  INTERACTIONS: {
    FOLLOW: (id: string) => `/interactions/user/${id}/follow`,
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id: string) => `/projects/${id}`,
    CREATE: '/projects',
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
  },
  BRANCHES: {
    LIST: '/branches',
    DETAIL: (id: string) => `/branches/${id}`,
    CREATE: '/branches',
    UPDATE: '/branches',
    DELETE: '/branches',
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: string) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: '/posts',
    DELETE: '/posts',
  },
};
