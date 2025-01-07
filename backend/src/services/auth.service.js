import jwt from 'jsonwebtoken';
import { db } from '../utils/db.js';

export class AuthService {
  constructor() {
    this.db = db;
  }

  async handleCallback(user) {
    try {
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
        { expiresIn: process.env.JWT_EXPIRY ?? '1h' }
      );
    } catch (error) {
      console.error('Failed to handle callback:', error);
      throw new Error('Failed to handle callback');
    }
  }
}
