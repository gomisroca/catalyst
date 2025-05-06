import { type User, type Prisma } from 'generated/prisma';

interface Provider {
  name: string;
  icon: React.ReactNode;
}
type ExtendedProject = Prisma.ProjectGetPayload<{
  include: { author: true };
}>;
type ExtendedBranch = Prisma.BranchGetPayload<{
  include: { author: true; project: true };
}>;
type ExtendedPost = Prisma.PostGetPayload<{
  include: { author: true; branch: { include: { project: true } }; media: true };
}>;
type ExtendedProjectInteraction = Prisma.ProjectInteractionGetPayload<{
  include: { user: true; project: true };
}>;
type ExtendedBranchInteraction = Prisma.BranchInteractionGetPayload<{
  include: { user: true; branch: true };
}>;
type ExtendedPostInteraction = Prisma.PostInteractionGetPayload<{
  include: { user: true; post: { include: { media: true } } };
}>;
type ExtendedFollow = Prisma.FollowGetPayload<{
  include: { follower: true };
}>;

type InteractionType = 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE';

type ActionReturn = {
  message: string;
  error?: boolean;
  redirect?: string;
};

type ForYouTimelineItem =
  | { type: 'post'; content: ExtendedPost }
  | { type: 'branch'; content: ExtendedBranch }
  | { type: 'project'; content: ExtendedProject }
  | { type: 'post-interaction'; content: ExtendedPostInteraction & { updatedAt: Date } }
  | { type: 'branch-interaction'; content: ExtendedBranchInteraction & { updatedAt: Date } }
  | { type: 'project-interaction'; content: ExtendedProjectInteraction & { updatedAt: Date } };

type TrendingTimelineItem = { type: 'branch'; content: ExtendedBranch } | { type: 'project'; content: ExtendedProject };

type SearchItem =
  | { type: 'post'; content: ExtendedPost }
  | { type: 'branch'; content: ExtendedBranch }
  | { type: 'project'; content: ExtendedProject }
  | { type: 'user'; content: User };
