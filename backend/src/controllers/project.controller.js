import { ProjectService } from '../services/project.service.js';

export class ProjectController {
  projectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  healthCheck = (_, res) => {
    try {
      return res.status(200).send('Projects Endpoint Healthy');
    } catch (error) {
      return res.status(500).json({ error: 'Failed health check' });
    }
  };

  getById = async (req, res) => {
    try {
      const project = await this.projectService.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(project);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getAll = async (_, res) => {
    try {
      const projects = await this.projectService.findAll();
      return res.json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  };

  create = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      await this.projectService.create(req.user, req.body);
    } catch (error) {
      console.error('Failed to create project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  };

  update = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await this.projectService.update(req.params.id, req.user, req.body);
    } catch (error) {
      console.error('Failed to update project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  };

  delete = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await this.projectService.delete(req.params.id);
    } catch (error) {
      console.error('Failed to delete project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  };
}
