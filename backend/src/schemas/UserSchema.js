import { baseUserSchema } from './BaseSchema.js';

export const updateUserSchema = baseUserSchema.partial().omit({
  id: true,
  role: true,
});
