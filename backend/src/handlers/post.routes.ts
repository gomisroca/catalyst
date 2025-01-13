import { PostController } from '@/controllers/post.controller';
import { auth } from '@/middlewares/auth';
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
GET - Specific Post
REQ - None
RES - 200 - Post
*/
router.get('/:id', postController.getById);

/*
PUT - Update Post
REQ - Post Data
RES - 200 - Post
*/
router.put('/:id', auth, postController.update);

/*
GET - Delete Post
REQ - None
RES - 200
*/
router.delete('/:id', auth, postController.delete);

/*
GET - All Posts
REQ - Branch ID?, User ID?
RES - 200 - Post[]
*/
router.get('/', postController.getAll);

/*
POST - Create Post
REQ - Post Data
RES - 200 - Post
*/
router.post('/', auth, postController.create);

export default router;
