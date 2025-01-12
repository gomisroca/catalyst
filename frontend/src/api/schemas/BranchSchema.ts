import { z } from 'zod';
import { BranchSchema } from './BaseSchema';

export const createBranchFormSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

export const createBranchSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.string()).optional(),
});

export const updateBranchFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

export const updateBranchSchema = z.object({
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.string()).optional(),
});

export type Branch = z.infer<typeof BranchSchema>;
export type CreateBranchFormData = z.infer<typeof createBranchFormSchema>;
export type CreateBranchData = z.infer<typeof createBranchSchema>;
export type UpdateBranchFormData = z.infer<typeof updateBranchFormSchema>;
export type UpdateBranchData = z.infer<typeof updateBranchSchema>;
