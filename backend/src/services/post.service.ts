import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';
import { fetchFromCacheOrDB, postsCache } from '@/utils/cache';
import convertFormidableToFile from '@/utils/convert-formidable';
import { uploadImage } from '@/utils/upload-image';
import { CreatePostData, UpdatePostData } from '@/schemas/PostSchema';
import { BasicUser } from '@/schemas/UserSchema';
import filterByPermissions from '@/utils/filter-permissions';

const includeOptions = {
  author: true,
  interactions: {
    include: {
      user: true,
    },
  },
};

export class PostService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  async findById(id: string, user: BasicUser) {
    try {
      const post = await fetchFromCacheOrDB(postsCache, id, () =>
        this.db.post.findUnique({
          where: {
            id,
            branch: filterByPermissions(user),
          },
          include: includeOptions,
        })
      );
      if (!post) throw new Error('Post not found');
      return post;
    } catch (error) {
      console.error('Failed to fetch post:', error);
      throw new Error('Failed to fetch post');
    }
  }

  async findAll(branchId?: string, userId?: string, user?: BasicUser) {
    try {
      const cacheKey = branchId ? `posts-branch-${branchId}` : userId ? `posts-author-${userId}` : 'posts';

      const whereClause: Record<string, any> = {};
      if (branchId) {
        whereClause.branchId = branchId;
      }
      if (userId) {
        whereClause.authorId = userId;
      }

      return await fetchFromCacheOrDB(postsCache, cacheKey, () =>
        this.db.post.findMany({
          where: {
            ...whereClause,
            branch: filterByPermissions(user),
          },
          include: includeOptions,
        })
      );
    } catch (error) {
      console.error(`Failed to fetch posts:`, error);
      throw new Error(`Failed to fetch posts`);
    }
  }

  async create(data: CreatePostData, user: BasicUser) {
    try {
      const mediaArr: string[] = [];
      if (data.media && data.media.length > 0) {
        for (const media of data.media) {
          const image = await convertFormidableToFile(media);
          const uploadedImage = await uploadImage(image, 'posts');
          if (uploadedImage) {
            mediaArr.push(uploadedImage);
          }
        }
      }

      const post = await this.db.post.create({
        data: {
          branchId: data.branchId,
          authorId: user.id,
          content: data.content,
          media: mediaArr,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        include: includeOptions,
      });

      postsCache.set(post.id, post);

      return post;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw new Error('Failed to create post');
    }
  }

  async update(id: string, data: UpdatePostData, user: BasicUser) {
    try {
      const currentPost = await this.db.post.findUnique({ where: { id } });
      if (!currentPost) throw new Error('Post not found');
      if (currentPost.authorId !== user.id) throw new Error('You are not the author of this post');

      const mediaArr: string[] = [];
      if (data.media && data.media.length > 0) {
        for (const media of data.media) {
          const image = await convertFormidableToFile(media);
          const uploadedImage = await uploadImage(image, 'posts');
          if (uploadedImage) {
            mediaArr.push(uploadedImage);
          }
        }
      }

      const updatedPost = await this.db.post.update({
        where: { id },
        data: {
          content: data.content || currentPost.content,
          media: mediaArr.length > 0 ? mediaArr : currentPost.media,
          updatedAt: new Date(),
        },
        include: includeOptions,
      });

      postsCache.set(updatedPost.id, updatedPost);

      return updatedPost;
    } catch (error) {
      console.error('Failed to update post:', error);
      throw new Error('Failed to update post');
    }
  }

  async delete(id: string, user: BasicUser) {
    try {
      const post = await this.db.post.findUnique({ where: { id } });
      if (!post) throw new Error('Post not found');
      if (post.authorId !== user.id) throw new Error('You are not the author of this post');

      await this.db.post.delete({ where: { id } });
      postsCache.del(id);
    } catch (error) {
      console.error('Failed to delete post:', error);
      throw new Error('Failed to delete post');
    }
  }
}
