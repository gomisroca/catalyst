import { UserService } from '../services/user.service.js';

export class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  healthCheck = (_, res) => {
    try {
      return res.status(200).send('Users Endpoint Healthy');
    } catch (error) {
      return res.status(500).json({ error: 'Failed health check' });
    }
  };

  getSelf = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.json(req.user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to get user data' });
    }
  };

  getById = async (req, res) => {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getFollowed = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const followedUsers = await this.userService.findFollowed(req.user.id);
      return res.json(followedUsers);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch followed users' });
    }
  };

  getAll = async (_, res) => {
    try {
      const users = await this.userService.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  update = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const token = await this.userService.update(req.user.id, req.body);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/jwt?code=${token}`);
    } catch (error) {
      console.error('Update error:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };

  delete = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const cookie = getCookie('__catalyst__jwt');
      if (!cookie) {
        throw new Error('No cookie found');
      }

      await this.userService.delete(req.user.id);
      removeCookie('__catalyst__jwt');

      res.redirect(`${process.env.FRONTEND_ORIGIN}`);
    } catch (error) {
      console.error('Delete error:', error);
      res.redirect(`${process.env.FRONTEND_ORIGIN}/login?error=auth_failed`);
    }
  };
}
