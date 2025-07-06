import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Footer from '@/app/_components/footer';

const meta = {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
