import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';

export class InteractionService {
  private db: PrismaClient;
  constructor() {
    this.db = db;
  }

  async followUser(userId: string, profileId: string) {
    try {
      // Check that both users exist
      const dbSelf = await this.db.user.findUnique({
        where: { id: userId },
      });
      const dbUser = await this.db.user.findUnique({
        where: { id: profileId },
      });
      if (!dbUser || !dbSelf) {
        throw new Error('User not found');
      }

      // If user is already following the profile, simply return the user
      if (dbUser.followedBy.includes(userId)) return dbUser;

      // If user is not following the profile, follow
      dbUser.followedBy.push(userId);
      await this.db.user.update({
        where: { id: profileId },
        data: { followedBy: dbUser.followedBy },
      });

      return dbUser;
    } catch (error: any) {
      console.error('Failed to follow user:', error);
      throw new Error('Failed to follow user: ' + error.message);
    }
  }

  async unfollowUser(userId: string, profileId: string) {
    try {
      // Check that both users exist
      const dbSelf = await this.db.user.findUnique({
        where: { id: userId },
      });
      const dbUser = await this.db.user.findUnique({
        where: { id: profileId },
      });
      if (!dbUser || !dbSelf) {
        throw new Error('User not found');
      }

      // If user is following the profile, unfollow
      if (dbUser.followedBy.includes(userId)) {
        dbUser.followedBy = dbUser.followedBy.filter((id) => id !== userId);
        await this.db.user.update({
          where: { id: profileId },
          data: { followedBy: dbUser.followedBy },
        });
      }

      // If user is not following the profile, simply return the user
      return dbUser;
    } catch (error: any) {
      console.error('Failed to unfollow user:', error);
      throw new Error('Failed to unfollow user: ' + error.message);
    }
  }
}
