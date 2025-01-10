import { z } from 'zod';
import { ProjectSchema } from './BaseSchema';

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.any(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.any(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
