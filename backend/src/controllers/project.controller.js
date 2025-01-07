import { createProjectSchema, updateProjectSchema } from '../schemas/ProjectSchema.js';
import { ProjectService } from '../services/project.service.js';
import { sendError, sendSuccess } from '../utils/standard-responses.js';

export class ProjectController {
  projectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  healthCheck = (_, res) => {
    try {
      sendSuccess(res, 'Projects Endpoint Healthy');
    } catch (error) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  getById = async (req, res) => {
    try {
      const project = await this.projectService.findById(req.params.id);
      if (!project) return sendError(res, 'Project not found', 404);
      sendSuccess(res, project);
    } catch (error) {
      console.error('Failed to get project:', error);
      sendError(res, `Failed to get project: ${error.message}`);
    }
  };

  getAll = async (_, res) => {
    try {
      const projects = await this.projectService.findAll();
      sendSuccess(res, projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      sendError(res, `Failed to fetch projects: ${error.message}`);
    }
  };

  create = async (req, res) => {
    try {
      const { error } = createProjectSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message);
      await this.projectService.create(req.user, req.body);
      sendSuccess(res, 'Project created successfully');
    } catch (error) {
      console.error('Failed to create project:', error);
      sendError(res, `Failed to create project: ${error.message}`);
    }
  };

  update = async (req, res) => {
    try {
      const { error } = updateProjectSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message);
      await this.projectService.update(req.params.id, req.user, req.body);
      sendSuccess(res, 'Project updated successfully');
    } catch (error) {
      console.error('Failed to update project:', error);
      sendError(res, `Failed to update project: ${error.message}`);
    }
  };

  delete = async (req, res) => {
    try {
      await this.projectService.delete(req.params.id);
      sendSuccess(res, 'Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
      sendError(res, `Failed to delete project: ${error.message}`);
    }
  };
}
