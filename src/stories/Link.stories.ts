import type { Meta, StoryObj } from '@storybook/react';

import Link from '@/app/_components/ui/link';

const meta = {
  title: 'Base UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Link',
    href: '/',
  },
};

export const CustomClassName: Story = {
  args: {
    children: 'Link',
    href: '/',
    className: 'bg-rose-500 text-white',
  },
};
