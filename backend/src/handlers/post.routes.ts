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

/*
GET - All Posts
REQ - Branch ID?, User ID?
RES - 200 - Post[]
*/
router.get('/', postController.getAll);

export default router;
