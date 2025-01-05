import jwt from 'jsonwebtoken';
import { db } from '../utils/db.js';
import { usersCache } from '../utils/cache.js';

export class AuthService {
  constructor() {
    this.db = db;
  }

  async handleCallback(user) {
    let fetchedUser;

    if (usersCache.has(user.id)) {
      fetchedUser = usersCache.get(user.id);
    } else {
      fetchedUser = await this.db.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          postInteractions: true,
          branchInteractions: true,
        },
      });
    }

    if (!fetchedUser) {
      throw new Error('User not found');
    }

    return jwt.sign(
      {
        id: fetchedUser.id,
        email: fetchedUser.email,
        username: fetchedUser.username,
        nickname: fetchedUser.nickname,
        avatar: fetchedUser.avatar,
        role: fetchedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY ?? '1h' }
    );
  }
}
