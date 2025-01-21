import { z } from 'zod';
import apiService from '@/api/config';
import { ENDPOINTS } from '@/api/endpoints';
import { BranchSchema } from '@/api/schemas/BaseSchema';
import {
  createBranchSchema,
  updateBranchSchema,
  type Branch,
  type CreateBranchData,
  type UpdateBranchData,
} from '@/api/schemas/BranchSchema';

export const branchService = {
  getBranch: async (id: string) => {
    try {
      const res = await apiService.get<Res<Branch>>(ENDPOINTS.BRANCHES.DETAIL(id));
      return BranchSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to get branch:', error);
      throw error;
    }
  },

  getBranches: async ({ projectId, userId }: { projectId?: string; userId?: string }) => {
    try {
      const res = await apiService.get<Res<Branch[]>>(ENDPOINTS.BRANCHES.LIST({ projectId, userId }));
      return z.array(BranchSchema).parse(res.data);
    } catch (error) {
      console.error('Failed to get branches:', error);
      throw error;
    }
  },

  createBranch: async (branchData: CreateBranchData) => {
    try {
      const validationResult = createBranchSchema.safeParse(branchData);
      if (!validationResult.success) throw new Error(validationResult.error.message);

      const res = await apiService.post<Res<Branch>>(ENDPOINTS.BRANCHES.CREATE, branchData);
      return BranchSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to create branch:', error);
      throw error;
    }
  },

  updateBranch: async (id: string, branchData: UpdateBranchData) => {
    try {
      const validationResult = updateBranchSchema.safeParse(branchData);
      if (!validationResult.success) throw new Error(validationResult.error.message);

      const res = await apiService.put<Res<Branch>>(ENDPOINTS.BRANCHES.UPDATE(id), branchData);
      return BranchSchema.parse(res.data);
    } catch (error) {
      console.error('Failed to update branch:', error);
      throw error;
    }
  },

  deleteBranch: async (id: string) => {
    try {
      await apiService.delete<void>(ENDPOINTS.BRANCHES.DELETE(id));
      return id;
    } catch (error) {
      console.error('Failed to delete branch:', error);
      throw error;
    }
  },
};

export type { Branch, CreateBranchData, UpdateBranchData };
