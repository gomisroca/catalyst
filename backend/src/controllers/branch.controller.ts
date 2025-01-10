import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { BranchService } from '@/services/branch.service';
import parseForm from '@/utils/parse-form';
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

  getAll = async (_: Request, res: Response) => {
    try {
      const branches = await this.branchService.findAll();
      sendSuccess(res, branches);
    } catch (error: any) {
      console.error('Failed to fetch branches:', error);
      sendError(res, `Failed to fetch branches: ${error.message}`);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { fields } = await parseForm(req);

      const branchData = {
        projectId: fields.projectId[0],
        name: fields.name[0],
        description: fields.description[0],
        permissions: fields.permissions ? fields.permissions[0].split(',') : [],
        allowedUsers: fields.allowedUsers?.[0]?.split(',') ?? [],
      };

      const validationResult = createBranchSchema.safeParse(branchData);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.branchService.create(req.user as BasicUser, branchData);
      sendSuccess(res, 'Branch created successfully');
    } catch (error: any) {
      console.error('Failed to create branch:', error);
      sendError(res, `Failed to create branch: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { fields } = await parseForm(req);

      const branchData = {
        name: fields.name[0],
        description: fields.description[0],
        permissions: fields.permissions ? fields.permissions[0].split(',') : [],
        allowedUsers: fields.allowedUsers?.[0]?.split(',') ?? [],
      };

      const validationResult = updateBranchSchema.safeParse(branchData);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.branchService.update(req.params.id, branchData);
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
