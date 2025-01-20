import { Router } from 'express';
import { auth, optionalAuth } from '@/middlewares/auth';
import { ProjectController } from '@/controllers/project.controller';

const router = Router();
const projectController = new ProjectController();

/*
GET - Health Check for Project Endpoints
REQ - None
RES - 200
*/
router.get('/health', projectController.healthCheck);

/*
GET - Specific Project
REQ - None
RES - 200 - Project
*/
router.get('/:id', optionalAuth, projectController.getById);

/*
PUT - Update Project
REQ - Project Data
RES - 200 - Project
*/
router.put('/:id', auth, projectController.update);

/*
GET - Delete Project
REQ - None
RES - 200
*/
router.delete('/:id', auth, projectController.delete);

/*
GET - All Projects
REQ - User ID?, Cursor?, Limit?
RES - 200 - Project[]
*/
router.get('/', optionalAuth, projectController.getAll);

/*
POST - Create Project
REQ - Project Data
RES - 200 - Project
*/
router.post('/', auth, projectController.create);

export default router;
