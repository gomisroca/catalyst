import { db } from '../utils/db.js';

export class InteractionService {
  constructor() {
    this.db = db;
  }

  async followUser(userId, profileId) {
    try {
      const dbSelf = await this.db.user.findUnique({
        where: { id: userId },
      });
      const dbUser = await this.db.user.findUnique({
        where: { id: profileId },
      });
      if (!dbUser || !dbSelf) {
        throw new Error('User not found');
      }

      // If user is already following the profile, unfollow
      if (dbUser.followedBy.includes(userId)) {
        dbUser.followedBy = dbUser.followedBy.filter((id) => id !== userId);
        await this.db.user.update({
          where: { id: profileId },
          data: { followedBy: dbUser.followedBy },
        });

        return dbUser;
      }

      // If user is not following the profile, follow
      dbUser.followedBy.push(userId);
      await this.db.user.update({
        where: { id: profileId },
        data: { followedBy: dbUser.followedBy },
      });

      return dbUser;
    } catch (error) {
      console.error('Failed to follow or unfollow user:', error);
      throw new Error('Failed to follow or unfollow user: ' + error.message);
    }
  }
}
