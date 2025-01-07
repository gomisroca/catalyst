import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { ProjectController } from '../controllers/project.controller.js';

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
router.get('/:id', projectController.getById);

/*
PUT - Update Project
REQ - Project Data
RES - 200 - Project
*/
router.get('/:id', projectController.update);

/*
GET - Delete Project
REQ - None
RES - 200
*/
router.get('/:id', projectController.delete);

/*
GET - All Projects
REQ - None
RES - 200 - Project[]
*/
router.get('/', projectController.getAll);

/*
POST - Create Project
REQ - Project Data
RES - 200 - Project
*/
router.get('/', projectController.create);

export default router;
