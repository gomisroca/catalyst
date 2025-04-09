import { type projectsInteractions, type branchesInteractions, type postsInteractions } from '@/server/db/schema';

interface Provider {
  name: string;
  icon: React.ReactNode;
}

type BranchInteractionWithUser = {
  interaction: typeof branchesInteractions.$inferSelect;
  user: {
    name: string | null;
    email: string;
  };
};

type ProjectInteractionWithUser = {
  interaction: typeof projectsInteractions.$inferSelect;
  user: {
    name: string | null;
    email: string;
  };
};

type PostInteractionWithUser = {
  interaction: typeof postsInteractions.$inferSelect;
  user: {
    name: string | null;
    email: string;
  };
};

// Timeline-related types

interface TimelineInteraction {
  interactionType: string;
  updatedAt: Date;
  userId: string | null;
  id: string;
  author: { id: string; name: string | null; email: string };
  permissions: {
    id: string;
    projectId?: string;
    branchId?: string;
    private: boolean | null;
    allowedUsers: string[];
    allowCollaborate: boolean | null;
    allowShare: boolean | null;
  } | null;
  type: string;
  createdAt: Date;
}

interface TimelinePostInteraction extends TimelineInteraction {
  postId: string | null;
  title: string | null;
  content: string | null;
  media: Array<{ id: string; name: string; url: string }>;
}

interface TimelineBranchInteraction extends TimelineInteraction {
  branchId: string | null;
  name: string | null;
  description: string | null;
}

interface TimelineProjectInteraction extends TimelineInteraction {
  projectId: string | null;
  name: string | null;
  description: string | null;
}

interface TimelinePost {
  id: string;
  title: string | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  authorId: string | null;
  branchId: string | null;
  branchName: string | null;
  projectId: string | null;
  projectName: string | null;
  projectPicture: string | null;
  media: Array<{ id: string; name: string; url: string }>;
}

interface TimelineBranch {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  authorId: string | null;
  projectId: string | null;
  projectName: string | null;
  projectPicture: string | null;
}

interface TimelineProject {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  authorId: string | null;
  picture: string | null;
}

// Define a union type for the timeline items
type TimelineItemPostInteraction = {
  content: TimelinePostInteraction;
  type: string;
  timestamp: Date;
};
type TimelineItemBranchInteraction = {
  content: TimelineBranchInteraction;
  type: string;
  timestamp: Date;
};
type TimelineItemProjectInteraction = {
  content: TimelineProjectInteraction;
  type: string;
  timestamp: Date;
};
type TimelineItemPost = {
  content: TimelinePost;
  type: string;
  timestamp: Date;
};
type TimelineItemBranch = {
  content: TimelineBranch;
  type: string;
  timestamp: Date;
};
type TimelineItemProject = {
  content: TimelineProject;
  type: string;
  timestamp: Date;
};

type ForYouTimelineData = {
  postInteractions: TimelineItemPostInteraction[];
  branchInteractions: TimelineItemBranchInteraction[];
  projectInteractions: TimelineItemProjectInteraction[];
  posts: TimelineItemPost[];
  branches: TimelineItemBranch[];
  projects: TimelineItemProject[];
};

type TrendingTimelineData = {
  branches: TimelineItemBranch[];
  projects: TimelineItemProject[];
};
