/// <reference types="vite/client" />

enum InteractionType {
    LIKE = 'LIKE',
    SHARE = 'SHARE',
    BOOKMARK = 'BOOKMARK',
    REPORT = 'REPORT',
    HIDE = 'HIDE'
  }
interface Interaction {
    type: InteractionType,
    id: string;
    userId: string;
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
}

interface Permissions {
    private: boolean;
    allowUsers: string[];
    allowCollaborate: boolean;
    allowBranch: boolean;
    allowShare: boolean;
}
interface Post {
    id: string
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    media: string[];
    interactions: Interaction[];
}
interface Branch {
    projectId: string;
    id: string
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    default: boolean;
    posts: Post[];
    parentBranch: Branch;
    childBranches: Branch[];
    permissions: Permissions;
    interactions: Interaction[];
}
interface Project {
    id: string
    name: string;
    description: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    branches: Branch[];
    permissions: Permissions;
}