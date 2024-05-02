/// <reference types="vite/client" />

interface Like {
    id: string;
    userId: string;
    postId?: string;
    branchId?: string;
}
interface Share {
    id: string;
    userId: string;
    postId?: string;
    branchId?: string;
}

interface Bookmark {
    id: string;
    userId: string;
    postId?: string;
    branchId?: string;
}

interface Report {
    id: string;
    userId: string;
    postId?: string;
    branchId?: string;
}

interface Hidden {
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
    likes: Like[];
    shares: Share[];
    bookmarks: Bookmark[];
    reports: Report[];
    hidden: Hidden[];
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
    likes: Like[];
    shares: Share[];
    bookmarks: Bookmark[];
    reports: Report[];
    hidden: Hidden[];
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
    likes: Like[];
    shares: Share[];
    bookmarks: Bookmark[];
    reports: Report[];
    hidden: Hidden[];
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