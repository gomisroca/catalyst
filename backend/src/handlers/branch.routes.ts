import { BranchController } from '@/controllers/branch.controller';
import { auth, optionalAuth } from '@/middlewares/auth';
import { Router } from 'express';

const router = Router();
const branchController = new BranchController();

/*
GET - Health Check for Branch Endpoints
REQ - None
RES - 200
*/
router.get('/health', branchController.healthCheck);

/*
GET - Specific Branch
REQ - None
RES - 200 - Branch
*/
router.get('/:id', optionalAuth, branchController.getById);

/*
PUT - Update Branch
REQ - Branch Data
RES - 200 - Branch
*/
router.put('/:id', auth, branchController.update);

/*
GET - Delete Branch
REQ - None
RES - 200
*/
router.delete('/:id', auth, branchController.delete);

/*
GET - All Branches
REQ - Project ID?, User ID?
RES - 200 - Branch[]
*/
router.get('/', optionalAuth, branchController.getAll);

/*
POST - Create Branch
REQ - Branch Data
RES - 200 - Branch
*/
router.post('/', auth, branchController.create);

export default router;
