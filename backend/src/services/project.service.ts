import { IncomingMessage } from 'http';
import { PrismaClient } from '@prisma/client';
import { CreateProjectData, UpdateProjectData } from '@/schemas/ProjectSchema';
import convertFormidableToFile from '@/utils/convert-formidable';
import { BasicUser } from '@/schemas/UserSchema';
import { db } from '@/utils/db';
import { fetchFromCacheOrDB, projectsCache } from '@/utils/cache';
import { uploadImage } from '@/utils/upload-image';
import parseForm from '@/utils/parse-form';

export class ProjectService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  async findById(id: string) {
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

  async findAll(userId?: string) {
    try {
      if (userId) {
        return await fetchFromCacheOrDB(projectsCache, `projects-${userId}`, () =>
          this.db.project.findMany({
            where: { authorId: userId },
            include: { author: true, branches: true, permissions: true },
          })
        );
      }
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

  async create(user: BasicUser, data: CreateProjectData) {
    try {
      const avatar = await convertFormidableToFile(data.avatar);
      const uploadedImage = await uploadImage(avatar, 'projects');

      const project = await this.db.project.create({
        data: {
          name: data.name,
          description: data.description,
          authorId: user.id,
          avatar: uploadedImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const [_, mainBranch] = await this.db.$transaction([
        this.db.permissions.create({
          data: {
            projectId: project.id,
            private: data.permissions.includes('private'),
            allowCollaborate: data.permissions.includes('allowCollaborate'),
            allowBranch: data.permissions.includes('allowBranch'),
            allowShare: data.permissions.includes('allowShare'),
            allowedUsers: data.allowedUsers.length > 0 ? data.allowedUsers : undefined,
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
          private: data.permissions.includes('private'),
          allowCollaborate: data.permissions.includes('allowCollaborate'),
          allowBranch: data.permissions.includes('allowBranch'),
          allowShare: data.permissions.includes('allowShare'),
          allowedUsers: data.allowedUsers.length > 0 ? data.allowedUsers : undefined,
        },
      });

      projectsCache.set(project.id, project);

      return project;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw new Error('Failed to create project');
    }
  }

  async update(id: string, data: UpdateProjectData) {
    try {
      const currentProject = await this.db.project.findUnique({ where: { id } });
      if (!currentProject) throw new Error('Project not found');

      let newAvatar = currentProject.avatar;
      if (data.avatar) {
        const avatar = await convertFormidableToFile(data.avatar);
        const uploadedImage = await uploadImage(avatar);

        if (uploadedImage) {
          newAvatar = uploadedImage;
        }
      }

      const updatedProject = await this.db.project.update({
        where: { id },
        data: {
          name: data.name || currentProject.name,
          description: data.description || currentProject.description,
          avatar: newAvatar,
          updatedAt: new Date(),
        },
        include: { author: true, branches: true, permissions: true },
      });

      if (data.permissions) {
        await this.db.permissions.update({
          where: { projectId: id },
          data: {
            private: data.permissions.includes('private'),
            allowCollaborate: data.permissions.includes('allowCollaborate'),
            allowBranch: data.permissions.includes('allowBranch'),
            allowShare: data.permissions.includes('allowShare'),
            allowedUsers: data.allowedUsers && data.allowedUsers.length > 0 ? data.allowedUsers : undefined,
          },
        });
      }

      projectsCache.set(updatedProject.id, updatedProject);

      return updatedProject;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw new Error('Failed to update project');
    }
  }

  async delete(id: string) {
    try {
      const project = await this.db.project.findUnique({ where: { id } });
      if (!project) throw new Error('Project not found');

      await this.db.project.delete({ where: { id } });
      projectsCache.del(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error('Failed to delete project');
    }
  }
}
