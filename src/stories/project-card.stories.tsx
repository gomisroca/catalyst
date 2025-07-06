import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ExtendedProject } from 'types';

import { ProjectCard } from '@/app/_components/cards';

const meta = {
  title: 'Cards/Project',
  component: ProjectCard,

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ProjectCard>;

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

export const Basic: Story = {
  args: {
    project: mockProject,
  },
};
