import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';
import { fetchFromCacheOrDB, usersCache } from '@/utils/cache';
import { uploadImage } from '@/utils/upload-image';
import parseForm from '@/utils/parse-form';
import { UpdateUserData } from '@/schemas/UserSchema';
import { IncomingMessage } from 'http';
import convertFormidableToFile from '@/utils/convert-formidable';

export class UserService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  async findById(id: string) {
    try {
      const user = await fetchFromCacheOrDB(usersCache, id, () =>
        this.db.user.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            username: true,
            nickname: true,
            avatar: true,
            role: true,
            posts: true,
            branches: true,
            projects: true,
            postInteractions: true,
            branchInteractions: true,
            followedBy: true,
          },
        })
      );
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async findAll() {
    try {
      return await fetchFromCacheOrDB(usersCache, 'users', () =>
        this.db.user.findMany({
          select: {
            id: true,
            email: true,
            username: true,
            nickname: true,
            avatar: true,
            role: true,
            posts: true,
            branches: true,
            projects: true,
            postInteractions: true,
            branchInteractions: true,
            followedBy: true,
          },
        })
      );
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async findFollowed(userId: string) {
    try {
      return await fetchFromCacheOrDB(usersCache, `${userId}-follow`, () =>
        this.db.user.findMany({
          where: { followedBy: { has: userId } },
          select: {
            id: true,
            email: true,
            username: true,
            nickname: true,
            avatar: true,
            role: true,
            posts: true,
            branches: true,
            projects: true,
            postInteractions: true,
            branchInteractions: true,
            followedBy: true,
          },
        })
      );
    } catch (error) {
      console.error('Failed to fetch followed users:', error);
      throw new Error('Failed to fetch followed users');
    }
  }

  async update(id: string, data: UpdateUserData) {
    try {
      const { fields, files } = await parseForm(data as IncomingMessage);

      const currentUser = await this.db.user.findUnique({ where: { id } });
      if (!currentUser) throw new Error('User not found');

      const avatarFile = files.avatar?.[0];

      let newAvatar = currentUser.avatar;

      if (avatarFile) {
        const avatar = await convertFormidableToFile(avatarFile);
        const uploadedImage = await uploadImage(avatar);

        if (uploadedImage) {
          newAvatar = uploadedImage;
        }
      }

      const updatedUser = await this.db.user.update({
        where: { id },
        data: {
          username: fields.username?.[0] || currentUser.username,
          nickname: fields.nickname?.[0] || currentUser.nickname,
          email: fields.email?.[0] || currentUser.email,
          avatar: newAvatar,
        },
        select: {
          id: true,
          email: true,
          username: true,
          nickname: true,
          avatar: true,
          role: true,
          posts: true,
          branches: true,
          projects: true,
          postInteractions: true,
          branchInteractions: true,
          followedBy: true,
        },
      });

      usersCache.set(id, updatedUser);

      return jwt.sign(
        {
          id,
          email: updatedUser.email,
          username: updatedUser.username,
          nickname: updatedUser.nickname,
          avatar: updatedUser.avatar,
          role: updatedUser.role,
        },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY ?? '1h' }
      );
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user');
    }
  }

  async delete(id: string) {
    try {
      const user = await this.db.user.findUnique({ where: { id } });
      if (!user) throw new Error('User not found');

      await this.db.user.delete({ where: { id } });

      usersCache.del(id);
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user: ' + error.message);
    }
  }
}
