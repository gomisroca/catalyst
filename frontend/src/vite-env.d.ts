/// <reference types="vite/client" />

interface User {
    id: string;
    email: string;
    username: string;
    nickname: string;
    avatar: string;
    role: string;
}

interface Interactions {
    branchedBy: string[];
    likedBy: string[];
    sharedBy: string[];
    bookmarkedBy: string[];
    reportedBy: string[];
    hiddenBy: string[];
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
    interactions: Interactions;
}
interface Branch {
    id: string
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    default: boolean;
    posts: Post[];
    permissions: Permissions;
    interactions: Interactions;
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