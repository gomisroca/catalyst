import { AuthService } from '../services/auth.service.js';
import { getCookie, removeCookie, setCookie } from '../utils/cookies.js';
import { sendError, sendSuccess } from '../utils/standard-responses.js';

export class AuthController {
  authService;

  constructor() {
    this.authService = new AuthService();
  }

  healthCheck = (_, res) => {
    try {
      sendSuccess(res, 'Auth Endpoint Healthy');
    } catch (error) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  callback = async (req, res) => {
    try {
      const cookie = getCookie(req, '__catalyst__jwt');
      if (cookie) removeCookie(res, '__catalyst__jwt');
      const token = await this.authService.handleCallback(req.user);
      setCookie(res, '__catalyst__jwt', token);
      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error) {
      console.error('Failed to handle callback:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };

  signOut = async (_, res) => {
    try {
      const cookie = getCookie(req, '__catalyst__jwt');
      if (cookie) removeCookie(res, '__catalyst__jwt');
      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error) {
      console.error('Failed to sign out:', error);
      sendError(res, `Failed to sign out: ${error.message}`);
    }
  };
}
