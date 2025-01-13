import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';
import { fetchFromCacheOrDB, postsCache } from '@/utils/cache';

export class PostService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }
  async findById(id: string) {
    try {
      const post = await fetchFromCacheOrDB(postsCache, id, () =>
        this.db.post.findUnique({
          where: { id },
          include: {
            author: true,
            interactions: {
              include: {
                user: true,
              },
            },
          },
        })
      );
      if (!post) throw new Error('Post not found');
      return post;
    } catch (error) {
      console.error('Failed to fetch post:', error);
      throw new Error('Failed to fetch post');
    }
  }

  async findAll(branchId?: string, userId?: string) {
    try {
      const cacheKey = branchId ? `posts-branch-${branchId}` : userId ? `posts-author-${userId}` : 'posts';

      const whereClause: Record<string, any> = {};
      if (branchId) {
        whereClause.branchId = branchId;
      }
      if (userId) {
        whereClause.authorId = userId;
      }

      const includeOptions = {
        author: true,
        interactions: {
          include: {
            user: true,
          },
        },
      };

      return await fetchFromCacheOrDB(postsCache, cacheKey, () =>
        this.db.post.findMany({
          where: Object.keys(whereClause).length ? whereClause : undefined,
          include: includeOptions,
        })
      );
    } catch (error) {
      console.error(`Failed to fetch posts:`, error);
      throw new Error(`Failed to fetch posts`);
    }
  }
}
