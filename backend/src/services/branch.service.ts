import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';
import { branchesCache, fetchFromCacheOrDB } from '@/utils/cache';
import convertFormidableToFile from '@/utils/convert-formidable';
import { uploadImage } from '@/utils/upload-image';
import { BasicUser } from '@/schemas/UserSchema';
import { CreateBranchData, UpdateBranchData } from '@/schemas/BranchSchema';

export class BranchService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  async findById(id: string) {
    try {
      const branch = await fetchFromCacheOrDB(branchesCache, id, () =>
        this.db.branch.findUnique({
          where: { id },
          include: {
            author: true,
            posts: {
              include: {
                author: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            permissions: true,
            interactions: { include: { user: true } },
          },
        })
      );
      if (!branch) throw new Error('Branch not found');
      return branch;
    } catch (error) {
      console.error('Failed to fetch branch:', error);
      throw new Error('Failed to fetch branch');
    }
  }

  async findAll() {
    try {
      return await fetchFromCacheOrDB(branchesCache, 'branches', () =>
        this.db.branch.findMany({
          include: {
            author: true,
            posts: {
              include: {
                author: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            permissions: true,
            interactions: { include: { user: true } },
          },
        })
      );
    } catch (error) {
      console.error('Failed to fetch branches:', error);
      throw new Error('Failed to fetch branches');
    }
  }

  async findAllByProject(projectId: string) {
    try {
      if (!projectId) throw new Error('Project ID is required');
      const project = await this.db.project.findUnique({ where: { id: projectId } });
      if (!project) throw new Error('Project not found');

      return await fetchFromCacheOrDB(branchesCache, `branches-${projectId}`, () =>
        this.db.branch.findMany({
          where: { projectId },
          include: {
            author: true,
            posts: {
              include: {
                author: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            permissions: true,
            interactions: { include: { user: true } },
          },
        })
      );
    } catch (error) {
      console.error(`Failed to fetch branches for project ${projectId}:`, error);
      throw new Error(`Failed to fetch branches for project ${projectId}`);
    }
  }

  async create(user: BasicUser, data: CreateBranchData) {
    try {
      const branch = await this.db.branch.create({
        data: {
          projectId: data.projectId,
          name: data.name,
          description: data.description,
          authorId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      await this.db.permissions.create({
        data: {
          branchId: branch.id,
          private: data.permissions.includes('private'),
          allowCollaborate: data.permissions.includes('allowCollaborate'),
          allowBranch: data.permissions.includes('allowBranch'),
          allowShare: data.permissions.includes('allowShare'),
          allowedUsers: data.allowedUsers.length > 0 ? data.allowedUsers : undefined,
        },
      });

      const finalizedBranch = await this.db.branch.findUnique({
        where: { id: branch.id },
        include: {
          author: true,
          posts: {
            include: {
              author: true,
              interactions: {
                include: {
                  user: true,
                },
              },
            },
          },
          permissions: true,
          interactions: { include: { user: true } },
        },
      });
      branchesCache.set(branch.id, finalizedBranch);

      return finalizedBranch;
    } catch (error) {
      console.error('Failed to create branch:', error);
      throw new Error('Failed to create branch');
    }
  }

  async update(id: string, data: UpdateBranchData) {
    try {
      const currentBranch = await this.db.branch.findUnique({ where: { id } });
      if (!currentBranch) throw new Error('Branch not found');

      const updatedBranch = await this.db.branch.update({
        where: { id },
        data: {
          name: data.name || currentBranch.name,
          description: data.description || currentBranch.description,
          updatedAt: new Date(),
        },
        include: {
          author: true,
          posts: {
            include: {
              author: true,
              interactions: {
                include: {
                  user: true,
                },
              },
            },
          },
          permissions: true,
          interactions: { include: { user: true } },
        },
      });

      if (data.permissions) {
        await this.db.permissions.update({
          where: { branchId: id },
          data: {
            private: data.permissions.includes('private'),
            allowCollaborate: data.permissions.includes('allowCollaborate'),
            allowBranch: data.permissions.includes('allowBranch'),
            allowShare: data.permissions.includes('allowShare'),
            allowedUsers: data.allowedUsers && data.allowedUsers.length > 0 ? data.allowedUsers : undefined,
          },
        });
      }

      branchesCache.set(updatedBranch.id, updatedBranch);

      return updatedBranch;
    } catch (error) {
      console.error('Failed to update branch:', error);
      throw new Error('Failed to update branch');
    }
  }

  async delete(id: string) {
    try {
      const branch = await this.db.branch.findUnique({ where: { id } });
      if (!branch) throw new Error('Branch not found');

      await this.db.branch.delete({ where: { id } });
      branchesCache.del(id);
    } catch (error) {
      console.error('Failed to delete branch:', error);
      throw new Error('Failed to delete branch');
    }
  }
}
