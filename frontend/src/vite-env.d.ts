/// <reference types="vite/client" />

enum InteractionType {
    LIKE = 'LIKE',
    SHARE = 'SHARE',
    BOOKMARK = 'BOOKMARK',
    REPORT = 'REPORT',
    HIDE = 'HIDE'
  }
interface Interaction {
    createdAt: string;
    updatedAt: string;
    type: InteractionType,
    id: string;
    userId: string;
    user: User;
    postId?: string;
    branchId?: string;
}
interface User {
    id: string;
    email: string;
    username: string;
    nickname: string;
    avatar: string;
    role: string;
    postInteractions: Interaction[];
    branchInteractions: Interaction[];
    projects: Project[];
    branches: Branch[];
    posts: Post[];
    followedBy: string[];
}

interface Permissions {
    private: boolean;
    allowedUsers: string[];
    allowCollaborate: boolean;
    allowBranch: boolean;
    allowShare: boolean;
}
interface Post {
    id: string
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
    id: string
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    author: User;
    default: boolean;
    posts: Post[];
    parentBranch: Branch;
    childBranches: Branch[];
    permissions: Permissions;
    interactions: Interaction[];
    popularity: number;
    activity: number;
    trendingActivity: boolean;
    trendingPopularity: boolean;
}
interface Project {
    id: string
    name: string;
    description: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    author: User;
    branches: Branch[];
    permissions: Permissions;
    popularity: number;
    activity: number;
    trendingActivity: boolean;
    trendingPopularity: boolean;
}