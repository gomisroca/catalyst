import jwt from 'jsonwebtoken';
import { db } from '@/utils/db';
import { PrismaClient } from '@prisma/client';
import { BasicUser } from '@/schemas/UserSchema';

export class AuthService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }

  async handleCallback(user: BasicUser) {
    try {
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          role: user.role,
        },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY ?? '1h' }
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: process.env.JWT_REFRESH_EXPIRY ?? '7d' }
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error('Failed to handle callback:', error);
      throw new Error('Failed to handle callback');
    }
  }
}
