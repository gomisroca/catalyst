import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NotAllowed from '@/app/_components/not-allowed';

const meta = {
  title: 'Not Allowed',
  component: NotAllowed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotAllowed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
