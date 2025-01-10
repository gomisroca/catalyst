import { z } from 'zod';
import { BranchSchema } from './BaseSchema';

export const createBranchSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.string()),
});

export const updateBranchSchema = z.object({
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.string()).optional(),
});

export type Branch = z.infer<typeof BranchSchema>;
export type CreateBranchData = z.infer<typeof createBranchSchema>;
export type UpdateBranchData = z.infer<typeof updateBranchSchema>;
