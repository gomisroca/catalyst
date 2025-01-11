import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { setCookie, getCookie } from '@/utils/cookies';
import { sendError } from '@/utils/standard-responses';
import { db } from '@/utils/db';
import { BasicUser } from '@/schemas/UserSchema';

async function refreshToken(refreshToken: string) {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
    if (!payload || typeof payload !== 'object' || !payload.id) {
      throw new Error('Invalid token');
    }
    const { id } = payload;

    const user = await db.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('User not found');

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

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw new Error('Failed to refresh token');
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access = getCookie(req, '__catalyst__accessToken');
    if (!access) {
      return sendError(res, 'Access token is missing', 401);
    }
    try {
      const user = jwt.verify(access, process.env.JWT_ACCESS_SECRET as string);
      req.user = user as BasicUser;
      return next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        console.log('Access token expired, attempting refresh...');
        const refresh = getCookie(req, '__catalyst__refreshToken');
        if (!refresh) {
          return sendError(res, 'Refresh token is missing', 401);
        }

        try {
          // Attempt to refresh the access token
          const newAccess = await refreshToken(refresh);

          // Set the new access token in cookies
          setCookie(res, '__catalyst__accessToken', newAccess, 1000 * 60 * 60);

          // Verify and attach the new user payload
          const user = jwt.verify(newAccess, process.env.JWT_ACCESS_SECRET as string);
          req.user = user;

          return next();
        } catch (refreshError: any) {
          console.log('Failed to refresh access token:', refreshError);
          return sendError(res, 'Failed to refresh access token', 403);
        }
      }
      // Handle other JWT verification errors
      console.log('Token verification error:', error);
      return sendError(res, 'Invalid access token', 403);
    }
  } catch (error: any) {
    console.log('Authentication middleware error:', error);
    return sendError(res, 'Authentication failed', 500);
  }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access = getCookie(req, '__catalyst__accessToken');
    if (!access) {
      req.user = undefined;
      return next();
    }

    try {
      const user = jwt.verify(access, process.env.JWT_ACCESS_SECRET as string);
      req.user = user as BasicUser;
      return next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        console.log('Access token expired, attempting refresh...');
        const refresh = getCookie(req, '__catalyst__refreshToken');
        if (!refresh) {
          // Refresh token is missing, continue without a user
          req.user = undefined;
          return next();
        }

        try {
          // Attempt to refresh the access token
          const newAccess = await refreshToken(refresh);

          // Set the new access token in cookies
          setCookie(res, '__catalyst__accessToken', newAccess, 1000 * 60 * 60);

          // Verify and attach the new user payload
          const user = jwt.verify(newAccess, process.env.JWT_ACCESS_SECRET as string);
          req.user = user as BasicUser;

          return next();
        } catch (refreshError: any) {
          console.log('Failed to refresh access token:', refreshError);
          req.user = undefined; // Continue without a user
          return next();
        }
      }
      // Handle other JWT verification errors
      console.log('Token verification error:', error);
      req.user = undefined; // Continue without a user
      return next();
    }
  } catch (error: any) {
    console.log('Optional authentication middleware error:', error);
    req.user = undefined; // Continue without a user
    return next();
  }
};
