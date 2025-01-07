import { baseUserSchema } from '../schemas/BaseSchema.js';
import { UserService } from '../services/user.service.js';
import { sendError, sendSuccess } from '../utils/standard-responses.js';
import { getCookie, removeCookie, setCookie } from '../utils/cookies.js';

export class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  healthCheck = (_, res) => {
    try {
      sendSuccess(res, 'Users Endpoint Healthy');
    } catch (error) {
      console.log('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  getSelf = async (req, res) => {
    try {
      sendSuccess(res, req.user);
    } catch (error) {
      console.log('Failed to get self data:', error);
      sendError(res, `Failed to get self data: ${error.message}`);
    }
  };

  getById = async (req, res) => {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) return sendError(res, 'User not found', 404);
      sendSuccess(res, user);
    } catch (error) {
      console.log('Failed to get user:', error);
      sendError(res, `Failed to get user: ${error.message}`);
    }
  };

  getFollowed = async (req, res) => {
    try {
      const followedUsers = await this.userService.findFollowed(req.user.id);
      sendSuccess(res, followedUsers);
    } catch (error) {
      console.log('Failed to fetch followed users:', error);
      sendError(res, `Failed to fetch followed users: ${error.message}`);
    }
  };

  getAll = async (_, res) => {
    try {
      const users = await this.userService.findAll();
      sendSuccess(res, users);
    } catch (error) {
      console.log('Failed to fetch users:', error);
      sendError(res, `Failed to fetch users: ${error.message}`);
    }
  };

  update = async (req, res) => {
    try {
      const { error } = baseUserSchema.validate(req.body);
      if (error) return sendError(res, error.details[0].message);

      const token = await this.userService.update(req.user.id, req.body);

      setCookie(res, '__catalyst__jwt', token);
      sendSuccess(res, 'User updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      sendError(res, `Failed to update user: ${error.message}`);
    }
  };

  delete = async (req, res) => {
    try {
      await this.userService.delete(req.user.id);

      const cookie = getCookie(req, '__catalyst__jwt');
      if (cookie) removeCookie(res, '__catalyst__jwt');
      sendSuccess(res, 'User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      sendError(res, `Failed to delete user: ${error.message}`);
    }
  };
}
