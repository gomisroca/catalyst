/// <reference types="vite/client" />

interface PaginatedRes<T> {
  data: T;
  nextCursor: string | null;
  hasNextPage: boolean;
}

interface Res<T> {
  data: T;
}

enum InteractionType {
  LIKE = 'LIKE',
  SHARE = 'SHARE',
  BOOKMARK = 'BOOKMARK',
  REPORT = 'REPORT',
  HIDE = 'HIDE',
}
interface Interaction {
  createdAt: string;
  updatedAt: string;
  type: InteractionType;
  id: string;
  userId: string;
  user: User;
  postId?: string;
  branchId?: string;
}

interface BasicUser {
  id: string;
  email: string;
  username: string;
  nickname: string | null;
  avatar: string;
  role: string;
}

interface User extends BasicUser {
  postInteractions: Interaction[];
  branchInteractions: Interaction[];
  projects: Project[];
  branches: Branch[];
  posts: Post[];
  followedBy: string[];
}

interface Permission {
  private: boolean;
  allowedUsers: string[];
  allowCollaborate: boolean;
  allowBranch: boolean;
  allowShare: boolean;
}
interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  media: string[];
  branch: Branch;
  interactions: Interaction[];
}
interface Branch {
  project: Project;
  projectId: string;
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  default: boolean;
  posts: Post[];
  parentBranch: Branch;
  childBranches: Branch[];
  permissions: Permission;
  interactions: Interaction[];
  popularity: number;
  activity: number;
  trendingActivity: boolean;
  trendingPopularity: boolean;
}
interface Project {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  branches: Branch[];
  permissions: Permission;
  popularity: number;
  activity: number;
  trendingActivity: boolean;
  trendingPopularity: boolean;
}
