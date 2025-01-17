import { PrismaClient } from '@prisma/client';
import { db } from '@/utils/db';

export class InteractionService {
  private db: PrismaClient;
  constructor() {
    this.db = db;
  }

  private async validateParams(userId: string, options: { branchId?: string; postId?: string }) {
    const { branchId, postId } = options;

    const dbUser = await this.db.user.findUnique({ where: { id: userId } });
    if (!dbUser) throw new Error('User not found');

    if (branchId) {
      const dbBranch = await this.db.branch.findUnique({ where: { id: branchId } });
      if (!dbBranch) throw new Error('Branch not found');
    }

    if (postId) {
      const dbPost = await this.db.post.findUnique({ where: { id: postId } });
      if (!dbPost) throw new Error('Post not found');
    }
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
      if (!dbUser || !dbSelf) throw new Error('User not found');

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
      if (!dbUser || !dbSelf) throw new Error('User not found');

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

  async addBranchInteraction(userId: string, branchId: string, interaction: InteractionType) {
    try {
      // Check that both users and branch exist
      await this.validateParams(userId, { branchId });

      // Check if user has the interaction
      const existingInteraction = await this.db.branchInteraction.findUnique({
        where: {
          interactionId: {
            userId: userId,
            branchId: branchId,
            type: interaction,
          },
        },
      });
      if (existingInteraction) throw new Error('User already has the interaction');

      // Create new interaction
      return await this.db.branchInteraction.create({
        data: {
          type: interaction,
          user: { connect: { id: userId } },
          branch: { connect: { id: branchId } },
        },
      });
    } catch (error: any) {
      console.error('Failed to add branch interaction:', error);
      throw new Error('Failed to add branch interaction: ' + error.message);
    }
  }

  async removeBranchInteraction(userId: string, branchId: string, interaction: InteractionType) {
    try {
      // Check that both users and branch exist
      await this.validateParams(userId, { branchId });

      // Check if user has the interaction
      const existingInteraction = await this.db.branchInteraction.findUnique({
        where: {
          interactionId: {
            userId: userId,
            branchId: branchId,
            type: interaction,
          },
        },
      });
      if (!existingInteraction) throw new Error('User does not have interaction');

      // Delete interaction
      await this.db.branchInteraction.delete({
        where: {
          interactionId: {
            userId: userId,
            branchId: branchId,
            type: interaction,
          },
        },
      });

      return existingInteraction;
    } catch (error: any) {
      console.error('Failed to remove branch interaction:', error);
      throw new Error('Failed to remove branch interaction: ' + error.message);
    }
  }

  async addPostInteraction(userId: string, postId: string, interaction: InteractionType) {
    try {
      // Check that both users and post exist
      await this.validateParams(userId, { postId });

      // Check if user has the interaction
      const existingInteraction = await this.db.postInteraction.findUnique({
        where: {
          interactionId: {
            userId: userId,
            postId: postId,
            type: interaction,
          },
        },
      });
      if (existingInteraction) throw new Error('User already has the interaction');

      // Create new interaction
      return await this.db.postInteraction.create({
        data: {
          type: interaction,
          user: { connect: { id: userId } },
          post: { connect: { id: postId } },
        },
      });
    } catch (error: any) {
      console.error('Failed to add post interaction:', error);
      throw new Error('Failed to add post interaction: ' + error.message);
    }
  }

  async removePostInteraction(userId: string, postId: string, interaction: InteractionType) {
    try {
      // Check that both users and post exist
      await this.validateParams(userId, { postId });

      // Check if user has the interaction
      const existingInteraction = await this.db.postInteraction.findUnique({
        where: {
          interactionId: {
            userId: userId,
            postId: postId,
            type: interaction,
          },
        },
      });
      if (!existingInteraction) throw new Error('User does not have interaction');

      // Delete interaction
      await this.db.postInteraction.delete({
        where: {
          interactionId: {
            userId: userId,
            postId: postId,
            type: interaction,
          },
        },
      });

      return existingInteraction;
    } catch (error: any) {
      console.error('Failed to remove post interaction:', error);
      throw new Error('Failed to remove post interaction: ' + error.message);
    }
  }
}
