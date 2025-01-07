import formidable from 'formidable';
import { db } from '../utils/db.js';
import { projectsCache } from '../utils/cache.js';
import { uploadImage } from '../utils/upload-image.js';

export class ProjectService {
  constructor() {
    this.db = db;
  }

  async findById(id) {
    try {
      if (projectsCache.has(id)) {
        return projectsCache.get(id);
      }
      const dbProject = await this.db.project.findUnique({
        where: { id },
        include: {
          author: true,
          branches: true,
          permissions: true,
        },
      });
      if (!dbProject) {
        throw new Error('Project not found');
      }
      projectsCache.set(dbProject.id, dbProject);
      return dbProject;
    } catch (error) {
      console.error('Failed to fetch project:', error);
      throw new Error('Failed to fetch project: ' + error.message);
    }
  }

  async findAll() {
    try {
      if (projectsCache.has('projects')) {
        return projectsCache.get('projects');
      }

      const projects = await this.db.project.findMany({
        include: {
          author: true,
          branches: true,
          permissions: true,
        },
      });

      projectsCache.set('projects', projects);

      return projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw new Error('Failed to fetch projects: ' + error.message);
    }
  }

  async create(user, data) {
    try {
      const form = formidable({});

      const parseForm = (req) =>
        new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
          });
        });

      const { fields, files } = await parseForm(data);

      const permissions = fields.permissions[0].split(',');

      let allowedUsers = [];
      if (fields.allowedUsers && fields.allowedUsers.length > 0) {
        allowedUsers = fields.allowedUsers[0].split(',');
      }

      const project = await this.db.project.create({
        data: {
          name: fields.name[0],
          description: fields.description[0],
          authorId: user.id,
          avatar: await uploadImage(files.avatar[0], 'projects'),
        },
      });

      const [_, mainBranch] = await this.db.$transaction([
        this.db.permissions.create({
          data: {
            projectId: project.id,
            private: permissions.includes('private'),
            allowCollaborate: permissions.includes('allowCollaborate'),
            allowBranch: permissions.includes('allowBranch'),
            allowShare: permissions.includes('allowShare'),
            allowedUsers: allowedUsers.length > 0 ? allowedUsers : undefined,
          },
        }),
        this.db.branch.create({
          data: {
            name: 'main',
            description: 'Main branch of ' + project.name,
            authorId: user.id,
            default: true,
            projectId: project.id,
          },
        }),
      ]);

      await this.db.permissions.create({
        data: {
          branchId: mainBranch.id,
          private: permissions.includes('private'),
          allowCollaborate: permissions.includes('allowCollaborate'),
          allowBranch: permissions.includes('allowBranch'),
          allowShare: permissions.includes('allowShare'),
          allowedUsers: allowedUsers.length > 0 ? allowedUsers : undefined,
        },
      });

      projectsCache.set(project.id, project);

      return project;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw new Error('Failed to create project: ' + error.message);
    }
  }

  async update(id, data) {
    try {
      const form = formidable({});

      const parseForm = (req) =>
        new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
          });
        });

      const { fields, files } = await parseForm(data);

      const currentProject = await this.db.project.findUnique({
        where: { id },
      });
      if (!currentProject) {
        throw new Error('Project not found');
      }

      const permissions = fields.permissions[0].split(',');
      const currentPermissions = await this.db.permissions.findUnique({
        where: { projectId: currentProject.id },
      });

      let allowedUsers = [];
      if (fields.allowedUsers && fields.allowedUsers.length > 0) {
        allowedUsers = fields.allowedUsers[0].split(',');
      }

      const [project, _] = await this.db.$transaction([
        this.db.project.update({
          where: { id },
          data: {
            name: fields.name[0] ? fields.name[0] : currentProject.name,
            description: fields.description[0] ? fields.description[0] : currentProject.description,
            avatar: files.avatar ? await uploadImage(files.avatar[0], 'projects') : currentProject.avatar,
          },
          include: {
            author: true,
            branches: true,
            permissions: true,
          },
        }),
        this.db.permissions.update({
          where: {
            projectId: id,
          },
          data: {
            private: permissions.includes('private'),
            allowCollaborate: permissions.includes('allowCollaborate'),
            allowBranch: permissions.includes('allowBranch'),
            allowShare: permissions.includes('allowShare'),
            allowedUsers: allowedUsers.length > 0 ? allowedUsers : currentPermissions?.allowedUsers,
          },
        }),
      ]);

      projectsCache.set(project.id, project);

      return project;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw new Error('Failed to update project: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const project = await this.db.project.findUnique({
        where: { id },
      });
      if (!project) {
        throw new Error('Project not found');
      }
      await this.db.project.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error('Failed to delete project: ' + error.message);
    }
  }
}
