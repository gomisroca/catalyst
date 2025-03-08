interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  picture: string | null;
}
interface Branch {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  projectId: string;
  projectName: string;
  projectPicture: string | null;
}
interface Post {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  projectName: string;
  projectId: string;
  branchName: string;
  branchId: string;
  media: Array<{ id: string; name: string; url: string }>;
}

interface PostInteraction {
  id: string;
  postId: string;
  userId: string;
  interactionType: 'LIKE' | 'SHARE' | 'BOOKMARK';
  updatedAt: Date;
  title: string;
  content: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  media: Array<{ id: string; name: string; url: string }> | null;
  type: 'post-interaction';
}

interface BranchInteraction {
  id: string;
  branchId: string;
  userId: string;
  interactionType: 'LIKE' | 'SHARE' | 'BOOKMARK';
  updatedAt: Date;
  name: string;
  description: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  type: 'branch-interaction';
}

interface ProjectInteraction {
  id: string;
  projectId: string;
  userId: string;
  interactionType: 'LIKE' | 'SHARE' | 'BOOKMARK';
  updatedAt: Date;
  name: string;
  description: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  type: 'project-interaction';
}

export type { Project, Branch, Post, PostInteraction, BranchInteraction, ProjectInteraction };
