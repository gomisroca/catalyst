import 'server-only';

import { type Session } from 'next-auth';
import { type ForYouTimelineItem, type TrendingTimelineItem } from 'types';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { getUserFollows } from '@/server/queries/users';

async function getTrendingProjects({
  session,
  page = 1,
  pageSize = 10,
}: {
  session: Session | null;
  page?: number;
  pageSize?: number;
}) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get projects the user has access to
  // Include a count of interactions in the last week and order the projects by that count
  const projects = await db.project.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      OR: [
        { permissions: { private: false } },
        {
          permissions: {
            private: true,
            allowedUsers: {
              some: {
                id: session?.user.id,
              },
            },
          },
        },
      ],
    },
    include: {
      author: true,
      permissions: true,
      _count: {
        select: {
          interactions: {
            where: {
              createdAt: {
                gte: sevenDaysAgo,
              },
            },
          },
        },
      },
    },
    orderBy: [
      {
        interactions: {
          _count: 'desc',
        },
      },
      {
        createdAt: 'desc',
      },
    ],
  });

  // Map the projects to a pre-formatted object
  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    picture: project.picture,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    authorId: project.authorId,
    author: project.author,
  }));
}

async function getTrendingBranches({
  session,
  page = 1,
  pageSize = 10,
}: {
  session: Session | null;
  page?: number;
  pageSize?: number;
}) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get branches the user has access to
  // Include a count of interactions in the last week and order the branches by that count
  const branches = await db.branch.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      OR: [
        { permissions: { private: false } },
        {
          permissions: {
            private: true,
            allowedUsers: {
              some: {
                id: session?.user.id,
              },
            },
          },
        },
      ],
    },
    include: {
      author: true,
      project: true,
      permissions: true,
      _count: {
        select: {
          interactions: {
            where: {
              createdAt: {
                gte: sevenDaysAgo,
              },
            },
          },
        },
      },
    },
    orderBy: [
      {
        interactions: {
          _count: 'desc',
        },
      },
      {
        createdAt: 'desc',
      },
    ],
  });

  // Map the branches to a pre-formatted object
  return branches.map((branch) => ({
    id: branch.id,
    name: branch.name,
    description: branch.description,
    default: branch.default,
    createdAt: branch.createdAt,
    updatedAt: branch.updatedAt,
    authorId: branch.authorId,
    projectId: branch.projectId,
    project: branch.project,
    author: branch.author,
  }));
}

export async function getTrendingTimeline({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const session = await auth();
  // Get projects and branches the user has access to
  const [projects, branches] = await Promise.all([
    getTrendingProjects({ session, page, pageSize }),
    getTrendingBranches({ session, page, pageSize }),
  ]);

  // Map the projects and branches to a pre-formatted object
  const timeline: TrendingTimelineItem[] = [
    ...branches.map(
      (branch) =>
        ({
          type: 'branch',
          content: branch,
        }) as const satisfies TrendingTimelineItem
    ),
    ...projects.map(
      (project) =>
        ({
          type: 'project',
          content: project,
        }) as const satisfies TrendingTimelineItem
    ),
  ];

  timeline.sort(
    (a, b) =>
      new Date(b.content.updatedAt ?? b.content.createdAt).getTime() -
      new Date(a.content.updatedAt ?? a.content.createdAt).getTime()
  );

  return timeline;
}

async function getPostInteractions({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  const interactions = await db.postInteraction.findMany({
    where: {
      userId: {
        in: followsIds,
      },
      post: {
        branch: {
          permissions: {
            OR: [
              { private: false },
              {
                private: true,
                allowedUsers: {
                  some: {
                    id: session?.user.id,
                  },
                },
              },
            ],
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      post: {
        include: {
          media: true,
          branch: {
            include: {
              permissions: true,
            },
          },
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return interactions;
}

async function getBranchInteractions({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  const interactions = await db.branchInteraction.findMany({
    where: {
      userId: {
        in: followsIds,
      },
      branch: {
        permissions: {
          OR: [
            { private: false },
            {
              private: true,
              allowedUsers: {
                some: {
                  id: session?.user.id,
                },
              },
            },
          ],
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      branch: {
        include: {
          permissions: true,
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return interactions;
}

async function getProjectInteractions({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  const interactions = await db.projectInteraction.findMany({
    where: {
      userId: {
        in: followsIds,
      },
      project: {
        permissions: {
          OR: [
            { private: false },
            {
              private: true,
              allowedUsers: {
                some: {
                  id: session?.user.id,
                },
              },
            },
          ],
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      project: {
        include: {
          permissions: true,
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return interactions;
}

async function getUserPosts({
  followsIds,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  page?: number;
  pageSize?: number;
}) {
  const session = await auth();
  const posts = await db.post.findMany({
    where: {
      authorId: {
        in: followsIds,
      },
      branch: {
        permissions: {
          OR: [
            { private: false },
            {
              private: true,
              allowedUsers: {
                some: {
                  id: session?.user.id,
                },
              },
            },
          ],
        },
      },
    },
    include: {
      author: true,
      media: true,
      branch: {
        include: {
          permissions: true,
          project: true,
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return posts;
}

async function getUserBranches({
  followsIds,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  page?: number;
  pageSize?: number;
}) {
  const session = await auth();
  const branches = await db.branch.findMany({
    where: {
      authorId: {
        in: followsIds,
      },
      permissions: {
        OR: [
          { private: false },
          {
            private: true,
            allowedUsers: {
              some: {
                id: session?.user.id,
              },
            },
          },
        ],
      },
    },
    include: {
      author: true,
      project: true,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return branches;
}

async function getUserProjects({
  followsIds,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  page?: number;
  pageSize?: number;
}) {
  const session = await auth();
  const projects = await db.project.findMany({
    where: {
      authorId: {
        in: followsIds,
      },
      permissions: {
        OR: [
          { private: false },
          {
            private: true,
            allowedUsers: {
              some: {
                id: session?.user.id,
              },
            },
          },
        ],
      },
    },
    include: {
      author: true,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  return projects;
}

export async function getForYouTimeline({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  const follows = await getUserFollows(session.user.id);
  const followsIds = follows.map((follow) => follow.followedId);

  // Get the interactions, posts, branches, and projects the user's followed users have created
  const [postInteractions, branchInteractions, projectInteractions, posts, branches, projects] = await Promise.all([
    getPostInteractions({ followsIds, session, page, pageSize }),
    getBranchInteractions({ followsIds, session, page, pageSize }),
    getProjectInteractions({ followsIds, session, page, pageSize }),
    getUserPosts({ followsIds, page, pageSize }),
    getUserBranches({ followsIds, page, pageSize }),
    getUserProjects({ followsIds, page, pageSize }),
  ]);

  // Map the interactions, posts, branches, and projects to a pre-formatted object
  const timeline: ForYouTimelineItem[] = [
    ...postInteractions.map(
      (interaction) =>
        ({
          type: 'post-interaction',
          content: { ...interaction, updatedAt: interaction.createdAt },
        }) as const satisfies ForYouTimelineItem
    ),
    ...branchInteractions.map(
      (interaction) =>
        ({
          type: 'branch-interaction',
          content: { ...interaction, updatedAt: interaction.createdAt },
        }) as const satisfies ForYouTimelineItem
    ),
    ...projectInteractions.map(
      (interaction) =>
        ({
          type: 'project-interaction',
          content: { ...interaction, updatedAt: interaction.createdAt },
        }) as const satisfies ForYouTimelineItem
    ),
    ...posts.map(
      (post) =>
        ({
          type: 'post',
          content: post,
        }) as const satisfies ForYouTimelineItem
    ),
    ...branches.map(
      (branch) =>
        ({
          type: 'branch',
          content: branch,
        }) as const satisfies ForYouTimelineItem
    ),
    ...projects.map(
      (project) =>
        ({
          type: 'project',
          content: project,
        }) as const satisfies ForYouTimelineItem
    ),
  ];

  timeline.sort(
    (a, b) =>
      new Date(b.content.updatedAt ?? b.content.createdAt).getTime() -
      new Date(a.content.updatedAt ?? a.content.createdAt).getTime()
  );

  return timeline;
}
