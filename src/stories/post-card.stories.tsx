import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ExtendedBranch, type ExtendedPost, type ExtendedProject } from 'types';

import { PostCard } from '@/app/_components/cards';

const meta = {
  title: 'Cards/Post',
  component: PostCard,

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProject: ExtendedProject = {
  id: 'proj123',
  name: 'Test Project',
  description: 'This is a test project description.',
  author: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: 'user123',
  picture: '/screenshot.png',
};

const mockBranch: ExtendedBranch = {
  id: 'branch123',
  name: 'Test Branch',
  description: 'This is a test branch description.',
  author: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  default: true,
  authorId: 'user123',
  projectId: 'proj123',
  project: mockProject,
};

const mockPost: ExtendedPost = {
  id: 'post123',
  title: 'Test Post',
  content: 'This is a test post content.',
  author: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
  media: [
    {
      postId: 'post123',
      id: 'media123',
      name: 'Test Media',
      url: '/screenshot.png',
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: 'user123',
  projectId: 'proj123',
  branchId: 'branch123',
  branch: mockBranch,
};

export const Basic: Story = {
  args: {
    post: mockPost,
  },
};
