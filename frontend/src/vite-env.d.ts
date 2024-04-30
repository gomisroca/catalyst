/// <reference types="vite/client" />

interface User {
    id: string;
    email: string;
    username: string;
    nickname: string;
    avatar: string;
    role: string;
}

interface Post {
    id: string
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
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
}