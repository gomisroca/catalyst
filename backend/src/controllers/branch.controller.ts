import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { BranchService } from '@/services/branch.service';

export class BranchController {
  branchService;

  constructor() {
    this.branchService = new BranchService();
  }

  healthCheck = (_: Request, res: Response) => {
    try {
      sendSuccess(res, 'Branches Endpoint Healthy');
    } catch (error: any) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };
}
