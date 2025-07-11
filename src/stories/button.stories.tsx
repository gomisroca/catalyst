import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NextImage from 'next/image';
import { createElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import { fn } from 'storybook/test';

import Button from '@/app/_components/ui/button';

const meta = {
  title: 'Base/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Basic Button',
    arialabel: 'Basic Button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    arialabel: 'Disabled Button',
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    children: 'Custom Class Button',
    arialabel: 'Custom Class Button',
    className: 'bg-red-500 text-white',
  },
};

export const Icon: Story = {
  args: {
    children: createElement(FaPlus),
    arialabel: 'Icon Button',
  },
};

export const Image: Story = {
  args: {
    children: <NextImage src="/xivlogo.png" alt="Next.js Logo" width={32} height={32} />,
    className: 'p-2',
    arialabel: 'Image Button',
  },
};
