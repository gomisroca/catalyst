import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';
import { branchesCache, fetchFromCacheOrDB } from '@/utils/cache';
import { BasicUser } from '@/schemas/UserSchema';
import { CreateBranchData, UpdateBranchData } from '@/schemas/BranchSchema';
import filterByPermissions from '@/utils/filter-permissions';

const includeOptions = {
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
};

export class BranchService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  async findById(id: string, user?: BasicUser) {
    try {
      const whereClause = {
        ...filterByPermissions(user),
        id, // Ensure we filter by ID as well
      };

      const branch = await fetchFromCacheOrDB(branchesCache, id, () =>
        this.db.branch.findUnique({
          where: whereClause,
          include: includeOptions,
        })
      );

      if (!branch) throw new Error('Branch not found');
      return branch;
    } catch (error) {
      console.error('Failed to fetch branch:', error);
      throw new Error('Failed to fetch branch');
    }
  }

  async findAll(projectId?: string, userId?: string, user?: BasicUser) {
    try {
      const cacheKey = projectId ? `branches-project-${projectId}` : userId ? `branches-author-${userId}` : 'branches';

      const whereClause = {
        ...filterByPermissions(user),
      };
      if (projectId) {
        whereClause.projectId = projectId;
      }
      if (userId) {
        whereClause.authorId = userId;
      }

      return await fetchFromCacheOrDB(branchesCache, cacheKey, () =>
        this.db.branch.findMany({
          where: Object.keys(whereClause).length ? whereClause : undefined,
          include: includeOptions,
        })
      );
    } catch (error) {
      console.error('Failed to fetch branches:', error);
      throw new Error('Failed to fetch branches');
    }
  }

  async create(data: CreateBranchData, user: BasicUser) {
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

  async update(id: string, data: UpdateBranchData, user: BasicUser) {
    try {
      const currentBranch = await this.db.branch.findUnique({ where: { id } });
      if (!currentBranch) throw new Error('Branch not found');
      if (currentBranch.authorId !== user.id) throw new Error('You are not the author of this branch');

      const updatedBranch = await this.db.branch.update({
        where: { id },
        data: {
          name: data.name || currentBranch.name,
          description: data.description || currentBranch.description,
          updatedAt: new Date(),
        },
        include: includeOptions,
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

  async delete(id: string, user: BasicUser) {
    try {
      const branch = await this.db.branch.findUnique({ where: { id } });
      if (!branch) throw new Error('Branch not found');
      if (branch.authorId !== user.id) throw new Error('You are not the author of this branch');

      await this.db.branch.delete({ where: { id } });
      branchesCache.del(id);
    } catch (error) {
      console.error('Failed to delete branch:', error);
      throw new Error('Failed to delete branch');
    }
  }
}
