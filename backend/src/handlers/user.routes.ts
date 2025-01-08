import { Router } from 'express';
import { auth } from '@/middlewares/auth';
import { UserController } from '@/controllers/user.controller';

const router = Router();
const userController = new UserController();

/*
GET - Health Check for User Endpoints
REQ - None
RES - 200
*/
router.get('/health', userController.healthCheck);

/*
GET - Get Self
REQ - None
RES - 200 - User
*/
router.get('/self', auth, userController.getSelf);

/*
PUT - Update Self
REQ - User Data
RES - 200 - User
*/
router.put('/self', auth, userController.update);

/*
DELETE - Delete Self
REQ - None
RES - 200
*/
router.delete('/self', auth, userController.delete);

/*
GET - Specific User
REQ - None
RES - 200 - User
*/
router.get('/:id', userController.getById);

/*
GET - Followed Users
REQ - None
RES - 200 - User[]
*/
router.get('/followed', auth, userController.getFollowed);

/*
GET - All Users
REQ - None
RES - 200 - User[]
*/
router.get('/', userController.getAll);

export default router;
