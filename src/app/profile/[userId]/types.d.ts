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
  postId: string | null;
  userId: string | null;
  interactionType: string;
  updatedAt: Date;
  title: string | null;
  content: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  media: Array<{ id: string; name: string; url: string }> | null;
  type: string;
}

interface BranchInteraction {
  id: string;
  branchId: string | null;
  userId: string | null;
  interactionType: string;
  updatedAt: Date;
  name: string | null;
  description: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  type: string;
}

interface ProjectInteraction {
  id: string;
  projectId: string | null;
  userId: string | null;
  interactionType: string;
  updatedAt: Date;
  name: string | null;
  description: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  type: string;
}

export type { Project, Branch, Post, PostInteraction, BranchInteraction, ProjectInteraction };
