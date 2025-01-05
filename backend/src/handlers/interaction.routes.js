import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { InteractionController } from '../controllers/interaction.controller.js';

const router = Router();
const interactionController = new InteractionController();

/*
GET - Health Check for Interaction Endpoints
REQ - None
RES - 200
*/
router.get('/health', interactionController.healthCheck);

/*
GET - Follow or Unfollow User
REQ - 
RES - 200 - User
*/
router.get('/user/:id/follow', auth, interactionController.followUser);

export default router;
