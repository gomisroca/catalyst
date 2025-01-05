import { AuthService } from '../services/auth.service.js';

export class AuthController {
  authService;

  constructor() {
    this.authService = new AuthService();
  }

  callback = async (req, res) => {
    try {
      const token = await this.authService.handleCallback(req.user);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/jwt?code=${token}`);
    } catch (error) {
      console.error('Callback error:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };
}
