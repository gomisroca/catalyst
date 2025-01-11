import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { BranchService } from '@/services/branch.service';
import { BasicUser } from '@/schemas/UserSchema';
import { createBranchSchema, updateBranchSchema } from '@/schemas/BranchSchema';

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

  getById = async (req: Request, res: Response) => {
    try {
      const branch = await this.branchService.findById(req.params.id);
      if (!branch) return sendError(res, 'Branch not found', 404);
      sendSuccess(res, branch);
    } catch (error: any) {
      console.error('Failed to get branch:', error);
      sendError(res, `Failed to get branch: ${error.message}`);
    }
  };

  getAll = async (req: Request, res: Response) => {
    const { projectId, userId } = req.query;
    try {
      const branches = await this.branchService.findAll(projectId as string, userId as string);
      sendSuccess(res, branches);
    } catch (error: any) {
      console.error('Failed to fetch branches:', error);
      sendError(res, `Failed to fetch branches: ${error.message}`);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const validationResult = createBranchSchema.safeParse(req.body);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.branchService.create(req.user as BasicUser, req.body);
      sendSuccess(res, 'Branch created successfully');
    } catch (error: any) {
      console.error('Failed to create branch:', error);
      sendError(res, `Failed to create branch: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const validationResult = updateBranchSchema.safeParse(req.body);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.branchService.update(req.params.id, req.body);
      sendSuccess(res, 'Branch updated successfully');
    } catch (error: any) {
      console.error('Failed to update branch:', error);
      sendError(res, `Failed to update branch: ${error.message}`);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.branchService.delete(req.params.id);
      sendSuccess(res, 'Branch deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete branch:', error);
      sendError(res, `Failed to delete branch: ${error.message}`);
    }
  };
}
