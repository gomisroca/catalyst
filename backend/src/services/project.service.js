import { db } from '../utils/db.js';
import { fetchFromCacheOrDB, projectsCache } from '../utils/cache.js';
import { uploadImage } from '../utils/upload-image.js';
import parseForm from '../utils/parse-form.js';

export class ProjectService {
  constructor() {
    this.db = db;
  }

  async findById(id) {
    try {
      const project = await fetchFromCacheOrDB(projectsCache, id, () =>
        this.db.project.findUnique({
          where: { id },
          include: { author: true, branches: true, permissions: true },
        })
      );
      if (!project) throw new Error('Project not found');
      return project;
    } catch (error) {
      console.error('Failed to fetch project:', error);
      throw new Error('Failed to fetch project');
    }
  }

  async findAll() {
    try {
      return await fetchFromCacheOrDB(projectsCache, 'projects', () =>
        this.db.project.findMany({
          include: { author: true, branches: true, permissions: true },
        })
      );
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw new Error('Failed to fetch projects');
    }
  }

  async create(user, data) {
    try {
      const { fields, files } = await parseForm(data);

      const permissions = fields.permissions[0]?.split(',') || [];
      const allowedUsers = fields.allowedUsers?.[0]?.split(',') || [];
      const avatar = await uploadImage(files.avatar?.[0], 'projects');

      const project = await this.db.project.create({
        data: {
          name: fields.name[0],
          description: fields.description[0],
          authorId: user.id,
          avatar,
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
            allowedUsers: allowedUsers.length ? allowedUsers : undefined,
          },
        }),
        this.db.branch.create({
          data: {
            name: 'main',
            description: `Main branch of ${project.name}`,
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
          allowedUsers: allowedUsers.length ? allowedUsers : undefined,
        },
      });

      projectsCache.set(project.id, project);

      return project;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw new Error('Failed to create project');
    }
  }

  async update(id, data) {
    try {
      const { fields, files } = await parseForm(data);

      const currentProject = await this.db.project.findUnique({ where: { id } });
      if (!currentProject) throw new Error('Project not found');

      const permissions = fields.permissions?.[0]?.split(',') || [];
      const allowedUsers = fields.allowedUsers?.[0]?.split(',') || [];
      const avatar = files.avatar ? await uploadImage(files.avatar[0], 'projects') : currentProject.avatar;

      const updatedProject = await this.db.project.update({
        where: { id },
        data: {
          name: fields.name?.[0] || currentProject.name,
          description: fields.description?.[0] || currentProject.description,
          avatar,
        },
        include: { author: true, branches: true, permissions: true },
      });

      await this.db.permissions.update({
        where: { projectId: id },
        data: {
          private: permissions.includes('private'),
          allowCollaborate: permissions.includes('allowCollaborate'),
          allowBranch: permissions.includes('allowBranch'),
          allowShare: permissions.includes('allowShare'),
          allowedUsers: allowedUsers.length ? allowedUsers : undefined,
        },
      });

      projectsCache.set(updatedProject.id, updatedProject);

      return updatedProject;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw new Error('Failed to update project');
    }
  }

  async delete(id) {
    try {
      const project = await this.db.project.findUnique({ where: { id } });
      if (!project) throw new Error('Project not found');

      await this.db.project.delete({ where: { id } });
      projectsCache.delete(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error('Failed to delete project');
    }
  }
}
