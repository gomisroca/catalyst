import { Router } from 'express';
import { auth } from '@/middlewares/auth';
import { InteractionController } from '@/controllers/interaction.controller';

const router = Router();
const interactionController = new InteractionController();

/*
GET - Health Check for Interaction Endpoints
REQ - None
RES - 200
*/
router.get('/health', interactionController.healthCheck);

/*
GET - Follow User
REQ - 
RES - 200 - User
*/
router.get('/user/:id/follow', auth, interactionController.followUser);

/*
GET - Unfollow User
REQ - 
RES - 200 - User
*/
router.delete('/user/:id/follow', auth, interactionController.unfollowUser);

export default router;
