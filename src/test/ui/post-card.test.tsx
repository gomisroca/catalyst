import { render, screen } from '@testing-library/react';
import React from 'react';
import { type ExtendedBranch, type ExtendedPost, type ExtendedProject } from 'types';
import { expect, vi } from 'vitest';

import { PostCard } from '@/app/_components/cards';

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { src: string; alt: string }) => <img data-testid="image" src={props.src} alt={props.alt} />,
}));

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

const mockBranch: ExtendedBranch = {
  id: 'branch123',
  name: 'Test Branch',
  description: 'This is a test branch description.',
  author: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  default: true,
  authorId: 'user123',
  projectId: 'proj123',
  project: mockProject,
};

const mockPost: ExtendedPost = {
  id: 'post123',
  title: 'Test Post',
  content: 'This is a test post content.',
  author: {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: '/user.jpg',
  },
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
  branch: mockBranch,
};

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders the post content', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.content!)).toBeInTheDocument();
  });

  it('renders the date of last update', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.updatedAt!.toLocaleDateString())).toBeInTheDocument();
  });

  it('has a link to the project page', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link', { name: /test project/i });
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('has a link to the branch page', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link', { name: /test branch/i });
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}/${mockBranch.id}`);
  });

  it('does not crash if no media is provided', () => {
    const postWithoutMedia = { ...mockPost, media: [] };
    render(<PostCard post={postWithoutMedia} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });
});
