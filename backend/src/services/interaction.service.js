import { db } from '../utils/db.js';

export class InteractionService {
  constructor() {
    this.db = db;
  }

  async followUser(userId, profileId) {
    // Check that both users exist in the database
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
  }
}
