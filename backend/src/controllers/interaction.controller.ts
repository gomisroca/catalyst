import { Request, Response } from 'express';
import { InteractionService } from '@/services/interaction.service';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { BasicUser } from '@/schemas/UserSchema';

const INTERACTIONS = ['LIKE', 'SHARE', 'BOOKMARK', 'REPORT', 'HIDE'];

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
      console.error('Failed to follow user:', error);
      sendError(res, `Failed to follow user: ${error.message}`);
    }
  };

  unfollowUser = async (req: Request, res: Response) => {
    try {
      const user = await this.interactionService.unfollowUser((req.user as BasicUser).id, req.params.id);
      if (!user) return sendError(res, 'User not found', 404);
      sendSuccess(res, user);
    } catch (error: any) {
      console.error('Failed to unfollow user:', error);
      sendError(res, `Failed to unfollow user: ${error.message}`);
    }
  };

  addBranchInteraction = async (req: Request, res: Response) => {
    const { interaction } = req.query;
    try {
      if (!INTERACTIONS.includes(interaction as string)) return sendError(res, 'Invalid interaction', 400);
      const newInteraction = await this.interactionService.addBranchInteraction(
        (req.user as BasicUser).id,
        req.params.id,
        interaction as InteractionType
      );
      sendSuccess(res, newInteraction);
    } catch (error: any) {
      console.error('Failed to add branch interaction:', error);
      sendError(res, `Failed to add branch interaction: ${error.message}`);
    }
  };

  removeBranchInteraction = async (req: Request, res: Response) => {
    const { interaction } = req.query;
    try {
      if (!INTERACTIONS.includes(interaction as string)) return sendError(res, 'Invalid interaction', 400);
      const removedInteraction = await this.interactionService.removeBranchInteraction(
        (req.user as BasicUser).id,
        req.params.id,
        interaction as InteractionType
      );
      sendSuccess(res, removedInteraction);
    } catch (error: any) {
      console.error('Failed to remove branch interaction:', error);
      sendError(res, `Failed to remove branch interaction: ${error.message}`);
    }
  };

  addPostInteraction = async (req: Request, res: Response) => {
    const { interaction } = req.query;
    try {
      if (!INTERACTIONS.includes(interaction as string)) return sendError(res, 'Invalid interaction', 400);
      const newInteraction = await this.interactionService.addPostInteraction(
        (req.user as BasicUser).id,
        req.params.id,
        interaction as InteractionType
      );
      sendSuccess(res, newInteraction);
    } catch (error: any) {
      console.error('Failed to add post interaction:', error);
      sendError(res, `Failed to add post interaction: ${error.message}`);
    }
  };

  removePostInteraction = async (req: Request, res: Response) => {
    const { interaction } = req.query;
    try {
      if (!INTERACTIONS.includes(interaction as string)) return sendError(res, 'Invalid interaction', 400);
      const removedInteraction = await this.interactionService.removePostInteraction(
        (req.user as BasicUser).id,
        req.params.id,
        interaction as InteractionType
      );
      sendSuccess(res, removedInteraction);
    } catch (error: any) {
      console.error('Failed to remove post interaction:', error);
      sendError(res, `Failed to remove post interaction: ${error.message}`);
    }
  };
}
