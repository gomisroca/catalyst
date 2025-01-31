import { Request, Response } from 'express';
import { UserService } from '@/services/user.service';
import { baseUserSchema } from '@/schemas/BaseSchema';
import { BasicUser } from '@/schemas/UserSchema';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';

export class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  healthCheck = (_: Request, res: Response) => {
    try {
      sendSuccess(res, 'Users Endpoint Healthy');
    } catch (error: any) {
      console.log('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  getSelf = async (req: Request, res: Response) => {
    try {
      sendSuccess(res, { data: req.user });
    } catch (error: any) {
      console.log('Failed to get self data:', error);
      sendError(res, `Failed to get self data: ${error.message}`);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) return sendError(res, 'User not found', 404);
      sendSuccess(res, user);
    } catch (error: any) {
      console.log('Failed to get user:', error);
      sendError(res, `Failed to get user: ${error.message}`);
    }
  };

  getFollowed = async (req: Request, res: Response) => {
    try {
      const followedUsers = await this.userService.findFollowed((req.user as BasicUser).id);
      sendSuccess(res, { data: followedUsers });
    } catch (error: any) {
      console.log('Failed to fetch followed users:', error);
      sendError(res, `Failed to fetch followed users: ${error.message}`);
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      sendSuccess(res, { data: users });
    } catch (error: any) {
      console.log('Failed to fetch users:', error);
      sendError(res, `Failed to fetch users: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const validationResult = baseUserSchema.safeParse(req.body);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      const newAccess = await this.userService.update((req.user as BasicUser).id, req.body);

      setCookie(res, '__catalyst__accessToken', newAccess, 1000 * 60 * 60);
      sendSuccess(res, 'User updated successfully');
    } catch (error: any) {
      console.error('Update error:', error);
      sendError(res, `Failed to update user: ${error.message}`);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.userService.delete((req.user as BasicUser).id);

      const accessToken = getCookie(req, '__catalyst__accessToken');
      if (accessToken) removeCookie(res, '__catalyst__accessToken');
      const refreshToken = getCookie(req, '__catalyst__refreshToken');
      if (refreshToken) removeCookie(res, '__catalyst__refreshToken');

      sendSuccess(res, 'User deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      sendError(res, `Failed to delete user: ${error.message}`);
    }
  };
}
