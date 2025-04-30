import 'server-only';
import { db } from '../db';
import { auth } from '../auth';

export async function getUserProfile(userId: string) {
  const user = await db.user
    .findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        posts: true,
        branches: true,
        projects: true,
      },
    })
    .catch(() => {
      throw new Error('User with the given ID does not exist');
    });

  return user;
}

export async function getUserFollowers(userId: string) {
  const followers = await db.follow.findMany({
    where: {
      followedId: userId,
    },
    include: {
      follower: true,
    },
  });
  return followers;
}

export async function getUserFollows(userId: string) {
  const follows = await db.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      followed: true,
    },
  });
  return follows;
}

export async function getUserContributions(userId: string) {
  const contributions = await db.$transaction(async (trx) => {
    const projects = await trx.project.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const branches = await trx.branch.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        project: true,
      },
    });
    const posts = await trx.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        media: true,
        branch: {
          include: {
            project: true,
          },
        },
      },
    });
    return {
      projects,
      branches,
      posts,
    };
  });

  return contributions;
}

export async function getUserInteractions(userId: string) {
  const interactions = await db.$transaction(async (trx) => {
    const projectInteractions = await trx.projectInteraction.findMany({
      where: {
        userId: userId,
      },
      include: {
        project: true,
        user: true,
      },
    });

    const branchInteractions = await trx.branchInteraction.findMany({
      where: {
        userId: userId,
      },
      include: {
        branch: true,
        user: true,
      },
    });

    const postInteractions = await trx.postInteraction.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: {
          include: {
            media: true,
          },
        },
        user: true,
      },
    });

    return {
      projectInteractions,
      branchInteractions,
      postInteractions,
    };
  });

  return interactions;
}

export async function getUserSidebar(userId: string) {
  const session = await auth();

  const contributions = await getUserContributions(userId);

  const dbBookmarks = await db.$transaction(async (trx) => {
    const postBookmarks = await trx.postInteraction.findMany({
      where: {
        userId: userId,
        type: 'BOOKMARK',
      },
      include: {
        post: {
          include: {
            media: true,
            branch: {
              include: {
                permissions: {
                  include: {
                    allowedUsers: true,
                  },
                },
                project: true,
              },
            },
          },
        },
        user: true,
      },
    });

    const branchBookmarks = await trx.branchInteraction.findMany({
      where: {
        userId: userId,
        type: 'BOOKMARK',
      },
      include: {
        branch: {
          include: {
            permissions: {
              include: {
                allowedUsers: true,
              },
            },
            project: true,
          },
        },
        user: true,
      },
    });

    const projectBookmarks = await trx.projectInteraction.findMany({
      where: {
        userId: userId,
        type: 'BOOKMARK',
      },
      include: {
        project: {
          include: {
            permissions: {
              include: {
                allowedUsers: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return {
      postBookmarks,
      branchBookmarks,
      projectBookmarks,
    };
  });

  const bookmarks = [
    ...dbBookmarks.postBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      postId: bookmark.postId,
      branchId: bookmark.post.branchId,
      projectId: bookmark.post.branch.projectId,
      postTitle: bookmark.post.title,
      branchName: bookmark.post.branch.name,
      projectName: bookmark.post.branch.project.name,
      permissions: bookmark.post.branch.permissions,
    })),
    ...dbBookmarks.branchBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      projectId: bookmark.branch.projectId,
      branchId: bookmark.branchId,
      branchName: bookmark.branch.name,
      projectName: bookmark.branch.project.name,
      permissions: bookmark.branch.permissions,
    })),
    ...dbBookmarks.projectBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      projectId: bookmark.projectId,
      projectName: bookmark.project.name,
      permissions: bookmark.project.permissions,
    })),
  ];

  bookmarks
    .filter((bookmark) => {
      if (!bookmark.permissions?.private) return true;
      return session?.user.id && bookmark.permissions?.allowedUsers.some((user) => user.id === session.user.id);
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    contributions: {
      projects: contributions.projects,
      branches: contributions.branches,
    },
    bookmarks,
  };
}
