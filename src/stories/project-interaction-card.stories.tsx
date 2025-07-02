import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ExtendedProjectInteraction } from 'types';

import { ProjectInteractionCard } from '@/app/_components/cards';

const meta = {
  title: 'Cards/Project Interaction',
  component: ProjectInteractionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ProjectInteractionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockInteraction: ExtendedProjectInteraction = {
  id: `interaction-like`,
  type: 'LIKE',
  createdAt: new Date('2024-10-01T12:00:00Z'),
  projectId: 'proj123',
  userId: 'user123',
  project: {
    id: 'proj123',
    name: 'Test Project',
    description: 'This is a test project description.',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 'user123',
    picture: '/screenshot.png',
  },
  user: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
};

export const Basic: Story = {
  args: {
    interaction: mockInteraction,
  },
};
