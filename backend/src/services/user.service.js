import jwt from 'jsonwebtoken';
import formidable from 'formidable';
import { db } from '../utils/db.js';
import { usersCache } from '../utils/cache.js';
import { uploadImage } from '../utils/upload-image.js';

export class UserService {
  constructor() {
    this.db = db;
  }

  async findById(id) {
    try {
      if (usersCache.has(id)) {
        return usersCache.get(id);
      }
      const dbUser = await this.db.user.findUnique({
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
      });
      if (!dbUser) {
        throw new Error('User not found');
      }
      usersCache.set(dbUser.id, dbUser);
      return dbUser;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user: ' + error.message);
    }
  }

  async findAll() {
    try {
      if (usersCache.has('users')) {
        return usersCache.get('users');
      }

      const users = this.db.user.findMany({
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

      usersCache.set('users', users);

      return users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Failed to fetch users: ' + error.message);
    }
  }

  async findFollowed(userId) {
    try {
      if (usersCache.has(`${userId}-followed`)) {
        return usersCache.get(`${userId}-followed`);
      }

      const followedUsers = this.db.user.findMany({
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
      });

      usersCache.set(`${userId}-followed`, followedUsers);

      return followedUsers;
    } catch (error) {
      console.error('Failed to fetch followed users:', error);
      throw new Error('Failed to fetch followed users: ' + error.message);
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

      let user = await this.db.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const avatar = files.avatar ? await uploadImage(files.avatar[0]) : user.avatar;
      user = await this.db.user.update({
        where: { id },
        data: {
          username: fields.username?.[0] || user.username,
          nickname: fields.nickname?.[0] || user.nickname,
          email: fields.email?.[0] || user.email,
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

      usersCache.set(user.id, user);

      return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error('User not found');
      }
      await this.db.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user: ' + error.message);
    }
  }
}
