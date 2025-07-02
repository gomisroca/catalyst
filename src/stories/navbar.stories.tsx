import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Navbar from '@/app/_components/navbar';

const mockSesion = {
  user: {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: null,
  },
  expires: '7d',
};

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session: mockSesion,
  },
};

export const LoggedOut: Story = {
  args: {
    session: null,
  },
};
