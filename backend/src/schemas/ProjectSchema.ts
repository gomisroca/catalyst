import { z } from 'zod';
import { ProjectSchema } from '@/schemas/BaseSchema';

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.any(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.string()),
});

export const updateProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  avatar: z.any().optional(),
  permissions: z.array(z.string()).optional(),
  allowedUsers: z.array(z.string()).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
