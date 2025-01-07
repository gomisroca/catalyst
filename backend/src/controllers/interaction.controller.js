import { InteractionService } from '../services/interaction.service.js';
import { sendError, sendSuccess } from '../utils/standard-responses.js';

export class InteractionController {
  interactionService;

  constructor() {
    this.interactionService = new InteractionService();
  }

  healthCheck = (_, res) => {
    try {
      sendSuccess(res, 'Interactions Endpoint Healthy');
    } catch (error) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };

  followUser = async (req, res) => {
    try {
      const user = await this.interactionService.followUser(req.user.id, req.params.id);
      if (!user) return sendError(res, 'User not found', 404);
      sendSuccess(res, user);
    } catch (error) {
      console.error('Failed to follow or unfollow user:', error);
      sendError(res, `Failed to follow or unfollow user: ${error.message}`);
    }
  };
}
