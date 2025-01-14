import { Request, Response } from 'express';
import { ProjectService } from '@/services/project.service';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { createProjectSchema, updateProjectSchema } from '@/schemas/ProjectSchema';
import { BasicUser } from '@/schemas/UserSchema';
import parseForm from '@/utils/parse-form';

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
      const project = await this.projectService.findById(req.params.id, req.user as BasicUser);
      if (!project) return sendError(res, 'Project not found', 404);

      sendSuccess(res, project);
    } catch (error: any) {
      console.error('Failed to get project:', error);
      sendError(res, `Failed to get project: ${error.message}`);
    }
  };

  getAll = async (req: Request, res: Response) => {
    const { userId } = req.query;
    try {
      const projects = await this.projectService.findAll(userId as string, req.user as BasicUser);
      sendSuccess(res, projects);
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);
      sendError(res, `Failed to fetch projects: ${error.message}`);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { fields, files } = await parseForm(req);

      if (!files.avatar || files.avatar.length === 0) {
        return sendError(res, 'Avatar file is required');
      }
      const avatar = files.avatar[0];

      const projectData = {
        name: fields.name[0],
        description: fields.description[0],
        avatar: avatar,
        permissions: fields.permissions ? fields.permissions[0].split(',') : [],
        allowedUsers: fields.allowedUsers?.[0]?.split(',') ?? [],
      };

      const validationResult = createProjectSchema.safeParse(projectData);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.projectService.create(projectData, req.user as BasicUser);
      sendSuccess(res, 'Project created successfully');
    } catch (error: any) {
      console.error('Failed to create project:', error);
      sendError(res, `Failed to create project: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { fields, files } = await parseForm(req);

      let avatar;
      if (files.avatar && files.avatar.length !== 0) {
        avatar = files.avatar[0];
      }

      const projectData = {
        name: fields.name[0],
        description: fields.description[0],
        avatar: avatar,
        permissions: fields.permissions ? fields.permissions[0].split(',') : [],
        allowedUsers: fields.allowedUsers?.[0]?.split(',') ?? [],
      };

      const validationResult = updateProjectSchema.safeParse(projectData);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.projectService.update(req.params.id, projectData, req.user as BasicUser);
      sendSuccess(res, 'Project updated successfully');
    } catch (error: any) {
      console.error('Failed to update project:', error);
      sendError(res, `Failed to update project: ${error.message}`);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.projectService.delete(req.params.id, req.user as BasicUser);
      sendSuccess(res, 'Project deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete project:', error);
      sendError(res, `Failed to delete project: ${error.message}`);
    }
  };
}
