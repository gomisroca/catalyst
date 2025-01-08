import { BranchController } from '@/controllers/branch.controller';
import { Router } from 'express';

const router = Router();
const branchController = new BranchController();

/*
GET - Health Check for Branch Endpoints
REQ - None
RES - 200
*/
router.get('/health', branchController.healthCheck);

export default router;
