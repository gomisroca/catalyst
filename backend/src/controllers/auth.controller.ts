import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { BasicUser, User } from '@/schemas/UserSchema';

export class AuthController {
  authService;

  constructor() {
    this.authService = new AuthService();
  }

  healthCheck = (_: Request, res: Response) => {
    try {
      sendSuccess(res, 'Auth Endpoint Healthy');
    } catch (error: any) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  callback = async (req: Request, res: Response) => {
    try {
      const accessToken = getCookie(req, '__catalyst__accessToken');
      if (accessToken) removeCookie(res, '__catalyst__accessToken');
      const { accessToken: newAccessToken, refreshToken } = await this.authService.handleCallback(
        req.user as BasicUser
      );
      setCookie(res, '__catalyst__accessToken', newAccessToken, 1000 * 60 * 60);
      setCookie(res, '__catalyst__refreshToken', refreshToken);
      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error) {
      console.error('Failed to handle callback:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };

  signOut = async (req: Request, res: Response) => {
    try {
      const accessToken = getCookie(req, '__catalyst__accessToken');
      if (accessToken) removeCookie(res, '__catalyst__accessToken');
      const refreshToken = getCookie(req, '__catalyst__refreshToken');
      if (refreshToken) removeCookie(res, '__catalyst__refreshToken');
      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error: any) {
      console.error('Failed to sign out:', error);
      sendError(res, `Failed to sign out: ${error.message}`);
    }
  };
}
