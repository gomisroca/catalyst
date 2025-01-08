import { Request, Response } from 'express';
import { ProjectService } from '@/services/project.service';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { createProjectSchema, updateProjectSchema } from '@/schemas/ProjectSchema';
import { BasicUser } from '@/schemas/UserSchema';

export class ProjectController {
  projectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  healthCheck = (_: Request, res: Response) => {
    try {
      sendSuccess(res, 'Projects Endpoint Healthy');
    } catch (error: any) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const project = await this.projectService.findById(req.params.id);
      if (!project) return sendError(res, 'Project not found', 404);
      sendSuccess(res, project);
    } catch (error: any) {
      console.error('Failed to get project:', error);
      sendError(res, `Failed to get project: ${error.message}`);
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const projects = await this.projectService.findAll();
      sendSuccess(res, projects);
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);
      sendError(res, `Failed to fetch projects: ${error.message}`);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const validationResult = createProjectSchema.safeParse(req.body);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.projectService.create(req.user as BasicUser, req.body);
      sendSuccess(res, 'Project created successfully');
    } catch (error: any) {
      console.error('Failed to create project:', error);
      sendError(res, `Failed to create project: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const validationResult = updateProjectSchema.safeParse(req.body);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.projectService.update(req.params.id, req.body);
      sendSuccess(res, 'Project updated successfully');
    } catch (error: any) {
      console.error('Failed to update project:', error);
      sendError(res, `Failed to update project: ${error.message}`);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.projectService.delete(req.params.id);
      sendSuccess(res, 'Project deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete project:', error);
      sendError(res, `Failed to delete project: ${error.message}`);
    }
  };
}
