import { z } from 'zod';
import { ProjectSchema } from '@/schemas/BaseSchema';

export const createProjectSchema = ProjectSchema.partial().omit({
  id: true,
  trendingActivity: true,
  trendingPopularity: true,
  activity: true,
  popularity: true,
  createdAt: true,
  updatedAt: true,
  author: true,
  branches: true,
});

export const updateProjectSchema = ProjectSchema.partial().omit({
  id: true,
  trendingActivity: true,
  trendingPopularity: true,
  activity: true,
  popularity: true,
  createdAt: true,
  updatedAt: true,
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
