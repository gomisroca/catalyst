import { z } from 'zod';
import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { ProjectSchema } from '@/api/schemas/BaseSchema';
import { type Project, type CreateProjectData, type UpdateProjectData } from '@/api/schemas/ProjectSchema';

export const projectService = {
  getProject: async (id: string) => {
    try {
      const res = await apiService.get<Res<Project>>(ENDPOINTS.PROJECTS.DETAIL(id));
      return ProjectSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to get project:', error);
      throw error;
    }
  },

  getProjects: async ({ userId, cursor, limit }: { userId?: string; cursor: string | null; limit?: number }) => {
    try {
      const res = await apiService.get<PaginatedRes<Project[]>>(ENDPOINTS.PROJECTS.LIST({ userId, cursor, limit }));
      console.log(res);
      return {
        data: z.array(ProjectSchema).parse(res.data) ?? [],
        nextCursor: res.nextCursor,
        hasNextPage: res.hasNextPage,
      };
    } catch (error) {
      console.error('Failed to get projects:', error);
      throw error;
    }
  },

  createProject: async (projectData: FormData) => {
    try {
      const res = await apiService.post<Res<Project>>(ENDPOINTS.PROJECTS.CREATE, projectData);
      return ProjectSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  updateProject: async (id: string, projectData: FormData) => {
    try {
      const res = await apiService.put<Res<Project>>(ENDPOINTS.PROJECTS.UPDATE(id), projectData);
      return ProjectSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  },

  deleteProject: async (id: string) => {
    try {
      await apiService.delete<void>(ENDPOINTS.PROJECTS.DELETE(id));
      return id;
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  },
};

export type { Project, CreateProjectData, UpdateProjectData };
