import { type Prisma } from 'generated/prisma';

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
