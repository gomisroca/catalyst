import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ExtendedBranchInteraction } from 'types';

import { BranchInteractionCard } from '@/app/_components/cards';

const meta = {
  title: 'Cards/Branch Interaction',
  component: BranchInteractionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof BranchInteractionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockInteraction: ExtendedBranchInteraction = {
  id: `interaction-like`,
  type: 'LIKE',
  createdAt: new Date('2024-10-01T12:00:00Z'),
  branchId: 'proj123',
  userId: 'branch123',
  branch: {
    id: 'branch123',
    name: 'Test Branch',
    description: 'This is a test branch description.',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 'user123',
    default: true,
    projectId: 'proj123',
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
