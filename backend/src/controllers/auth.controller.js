import { AuthService } from '../services/auth.service.js';
import { getCookie, removeCookie, setCookie } from '../utils/cookies.js';

export class AuthController {
  authService;

  constructor() {
    this.authService = new AuthService();
  }

  callback = async (req, res) => {
    try {
      const cookie = getCookie('__catalyst__jwt');
      if (cookie) {
        removeCookie('__catalyst__jwt');
      }
      const token = await this.authService.handleCallback(req.user);
      setCookie('__catalyst__jwt', token);
      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error) {
      console.error('Callback error:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };

  signOut = async (_, res) => {
    try {
      const cookie = getCookie('__catalyst__jwt');
      if (!cookie) {
        throw new Error('No cookie found');
      }

      removeCookie('__catalyst__jwt');
      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error) {
      console.error('Sign out error:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };
}
