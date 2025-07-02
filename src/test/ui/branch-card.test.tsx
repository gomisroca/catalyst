import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import React from 'react';
import { type ExtendedBranch, type ExtendedProject } from 'types';
import { expect, vi } from 'vitest';

import { BranchCard } from '@/app/_components/cards';

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

describe('BranchCard', () => {
  it('renders the branch name', () => {
    render(<BranchCard branch={mockBranch} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the formatted date', () => {
    render(<BranchCard branch={mockBranch} />);
    const formattedDate = format(mockBranch.updatedAt!, 'dd/MM/yyyy');
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('renders the project image if provided', () => {
    render(<BranchCard branch={mockBranch} />);
    const image = screen.getByAltText('Test Project Picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProject.picture);
  });

  it('renders the branch description', () => {
    render(<BranchCard branch={mockBranch} />);
    expect(screen.getByText(mockBranch.description!)).toBeInTheDocument();
  });

  it('has a link to the project page', () => {
    render(<BranchCard branch={mockBranch} />);
    const link = screen.getByRole('link', { name: /test project/i });
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('has a link to the branch page', () => {
    render(<BranchCard branch={mockBranch} />);
    const link = screen.getByRole('link', { name: /test branch/i });
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}/${mockBranch.id}`);
  });

  it('does not crash if no picture is provided', () => {
    const branchWithoutImage = { ...mockBranch, project: { ...mockProject, picture: null } };
    render(<BranchCard branch={branchWithoutImage} />);
    expect(screen.getByText('Test Branch')).toBeInTheDocument();
  });
});
