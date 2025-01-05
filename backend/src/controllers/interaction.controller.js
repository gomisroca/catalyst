import { InteractionService } from '../services/interaction.service.js';

export class InteractionController {
  interactionService;

  constructor() {
    this.interactionService = new InteractionService();
  }

  healthCheck = (_, res) => {
    try {
      return res.status(200).send('Interactions Endpoint Healthy');
    } catch (error) {
      return res.status(500).json({ error: 'Failed health check' });
    }
  };

  followUser = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await this.interactionService.followUser(req.user.id, req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Failed to follow or unfollow user' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}
