import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ExtendedPostInteraction } from 'types';

import { PostInteractionCard } from '@/app/_components/cards';

const meta = {
  title: 'Cards/Post Interaction',
  component: PostInteractionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PostInteractionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockInteraction: ExtendedPostInteraction = {
  id: `interaction-like`,
  type: 'LIKE',
  createdAt: new Date('2024-10-01T12:00:00Z'),
  postId: 'proj123',
  userId: 'Post123',
  post: {
    id: 'post123',
    title: 'Test Post',
    content: 'This is a test post content.',
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
  },
  user: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
};

const mockPostWithoutMedia: ExtendedPostInteraction = {
  ...mockInteraction,
  post: {
    ...mockInteraction.post,
    media: [],
  },
};

export const Basic: Story = {
  args: {
    interaction: mockInteraction,
  },
};

export const WithoutMedia: Story = {
  args: {
    interaction: mockPostWithoutMedia,
  },
};
