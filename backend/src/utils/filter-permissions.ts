import { BasicUser } from '@/schemas/UserSchema';

export default function filterByPermissions(user?: BasicUser): Record<string, any> {
  if (user) {
    return {
      OR: [
        { permissions: { private: false } }, // Public branches/projects
        { permissions: { private: true, allowedUsers: { has: user.id } } }, // Private branches/projects user is allowed to access
      ],
    };
  }
  return { permissions: { private: false } }; // Public branches/projects only
}
