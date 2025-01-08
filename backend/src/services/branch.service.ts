import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';

export class BranchService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }
}
