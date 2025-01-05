import bcrypt from 'bcrypt';
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
    if (usersCache.has(id)) {
      console.log('Cache Hit');
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
  }

  async findAll() {
    return this.db.user.findMany({
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
  }

  async findFollowed(userId) {
    return this.db.user.findMany({
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
  }

  async update(id, data) {
    const form = formidable({});

    const parseForm = (req) =>
      new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

    const { fields, files } = await parseForm(data);
    const avatar = files.avatar ? await uploadImage('avatars', files.avatar[0], user.id) : user.avatar;

    const dbUser = await this.db.user.update({
      where: { id },
      data: {
        username: fields.username?.[0] || user.username,
        nickname: fields.nickname?.[0] || user.nickname,
        email: fields.email?.[0] || user.email,
        avatar,
        password: encryptedPassword,
      },
      include: {
        postInteractions: true,
        branchInteractions: true,
      },
    });

    usersCache.set(dbUser.id, dbUser);

    return jwt.sign(
      {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
        nickname: dbUser.nickname,
        avatar: dbUser.avatar,
        role: dbUser.role,
        postInteractions: dbUser.postInteractions,
        branchInteractions: dbUser.branchInteractions,
        followedBy: dbUser.followedBy,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  async delete(id) {
    await this.db.user.delete({
      where: { id },
    });
  }

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}
