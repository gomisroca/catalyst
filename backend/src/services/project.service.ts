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

  async create(user: BasicUser, data: CreateProjectData) {
    try {
      const { fields, files } = await parseForm(data as IncomingMessage);

      const permissions = fields.permissions[0]?.split(',') || [];
      const allowedUsers = fields.allowedUsers?.[0]?.split(',') || [];
      const avatarFile = files.avatar?.[0]!;
      const avatar = await convertFormidableToFile(avatarFile);
      const uploadedImage = await uploadImage(avatar, 'projects');

      const project = await this.db.project.create({
        data: {
          name: fields.name[0],
          description: fields.description[0],
          authorId: user.id,
          avatar: uploadedImage,
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

  async update(id: string, data: UpdateProjectData) {
    try {
      const { fields, files } = await parseForm(data as IncomingMessage);

      const currentProject = await this.db.project.findUnique({ where: { id } });
      if (!currentProject) throw new Error('Project not found');

      const permissions = fields.permissions?.[0]?.split(',') || [];
      const allowedUsers = fields.allowedUsers?.[0]?.split(',') || [];
      const avatarFile = files.avatar?.[0];

      let newAvatar = currentProject.avatar;

      if (avatarFile) {
        const avatar = await convertFormidableToFile(avatarFile);
        const uploadedImage = await uploadImage(avatar);

        if (uploadedImage) {
          newAvatar = uploadedImage;
        }
      }

      const updatedProject = await this.db.project.update({
        where: { id },
        data: {
          name: fields.name?.[0] || currentProject.name,
          description: fields.description?.[0] || currentProject.description,
          avatar: newAvatar,
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
