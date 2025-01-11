import { z } from 'zod';
import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { ProjectSchema } from '@/api/schemas/BaseSchema';
import { type Project, type CreateProjectData, type UpdateProjectData } from '@/api/schemas/ProjectSchema';

export const projectService = {
  getProject: async (id: string) => {
    try {
      const response = await apiService.get<Project>(ENDPOINTS.PROJECTS.DETAIL(id));
      return ProjectSchema.parse(response);
    } catch (error) {
      console.error('Failed to get project:', error);
      throw error;
    }
  },

  getProjects: async ({ userId }: { userId?: string }) => {
    try {
      const response = await apiService.get<Project[]>(ENDPOINTS.PROJECTS.LIST({ userId }));
      return z.array(ProjectSchema).parse(response);
    } catch (error) {
      console.error('Failed to get projects:', error);
      throw error;
    }
  },

  createProject: async (projectData: FormData) => {
    try {
      const response = await apiService.post<Project>(ENDPOINTS.PROJECTS.CREATE, projectData);
      return ProjectSchema.parse(response);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  updateProject: async (id: string, projectData: FormData) => {
    try {
      const response = await apiService.put<unknown>(ENDPOINTS.PROJECTS.UPDATE(id), projectData);
      return ProjectSchema.parse(response);
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
