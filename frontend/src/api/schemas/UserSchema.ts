import { z } from 'zod';
import { baseUserSchema, UserSchema } from './BaseSchema';

export const updateUserSchema = baseUserSchema.partial().omit({
  id: true,
  role: true,
});

export type BasicUser = z.infer<typeof baseUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
