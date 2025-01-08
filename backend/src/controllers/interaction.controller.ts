import { Request, Response } from 'express';
import { InteractionService } from '@/services/interaction.service';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { BasicUser } from '@/schemas/UserSchema';

export class InteractionController {
  interactionService;

  constructor() {
    this.interactionService = new InteractionService();
  }

  healthCheck = (_: Request, res: Response) => {
    try {
      sendSuccess(res, 'Interactions Endpoint Healthy');
    } catch (error: any) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  followUser = async (req: Request, res: Response) => {
    try {
      const user = await this.interactionService.followUser((req.user as BasicUser).id, req.params.id);
      if (!user) return sendError(res, 'User not found', 404);
      sendSuccess(res, user);
    } catch (error: any) {
      console.error('Failed to follow or unfollow user:', error);
      sendError(res, `Failed to follow or unfollow user: ${error.message}`);
    }
  };
}
