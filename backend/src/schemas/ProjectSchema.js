import { ProjectSchema } from './BaseSchema.js';

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
