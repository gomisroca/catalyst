import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';

export class PostService {
  private db: PrismaClient;

  constructor() {
    this.db = db;
  }
}
