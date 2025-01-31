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
DELETE - Unfollow User
REQ - 
RES - 200 - User
*/
router.delete('/user/:id/follow', auth, interactionController.unfollowUser);

/*
GET - Add Branch Interaction
REQ - 
RES - 200 - User
*/
router.get('/branch/:id', auth, interactionController.addBranchInteraction);

/*
DELETE - Remove Branch Interaction
REQ - 
RES - 200 - User
*/
router.delete('/branch/:id', auth, interactionController.removeBranchInteraction);

/*
GET - Add Post Interaction
REQ - 
RES - 200 - User
*/
router.get('/post/:id', auth, interactionController.addPostInteraction);

/*
DELETE - Remove Post Interaction
REQ - 
RES - 200 - User
*/
router.delete('/post/:id', auth, interactionController.removePostInteraction);

export default router;
