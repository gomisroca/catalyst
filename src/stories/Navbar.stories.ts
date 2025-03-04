import Navbar from '@/app/_components/navbar';
import type { Meta, StoryObj } from '@storybook/react';

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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    session: mockSesion,
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session: mockSesion,
  },
};

export const LoggedOut: Story = {};
