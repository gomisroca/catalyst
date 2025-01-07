import jwt from 'jsonwebtoken';
import { db } from '../utils/db.js';
import { usersCache } from '../utils/cache.js';
import { uploadImage } from '../utils/upload-image.js';
import parseForm from '../utils/parse-form.js';

export class UserService {
  constructor() {
    this.db = db;
  }

  async findById(id) {
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

  async findFollowed(userId) {
    try {
      return await fetchFromCacheOrDB(usersCache, `${userId}-follow`, () =>
        this.db.user.findMany({
          where: { followedBy: { contains: userId } },
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

  async update(id, data) {
    try {
      const { fields, files } = await parseForm(data);

      const currentUser = await this.db.user.findUnique({ where: { id } });
      if (!currentUser) throw new Error('User not found');

      const avatar = files.avatar ? await uploadImage(files.avatar[0]) : currentUser.avatar;

      const updatedUser = await this.db.user.update({
        where: { id },
        data: {
          username: fields.username?.[0] || currentUser.username,
          nickname: fields.nickname?.[0] || currentUser.nickname,
          email: fields.email?.[0] || currentUser.email,
          avatar,
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
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user');
    }
  }

  async delete(id) {
    try {
      const user = await this.db.user.findUnique({ where: { id } });
      if (!user) throw new Error('User not found');

      await this.db.user.delete({ where: { id } });
      usersCache.delete(id);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user: ' + error.message);
    }
  }
}
