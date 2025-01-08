import { PostController } from '@/controllers/post.controller';
import { Router } from 'express';

const router = Router();
const postController = new PostController();

/*
GET - Health Check for Post Endpoints
REQ - None
RES - 200
*/
router.get('/health', postController.healthCheck);

export default router;
