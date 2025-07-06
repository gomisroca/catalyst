import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import React from 'react';
import { type ExtendedProject } from 'types';
import { expect, vi } from 'vitest';

import { ProjectCard } from '@/app/_components/cards';

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

describe('ProjectCard', () => {
  it('renders the project name', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the formatted date', () => {
    render(<ProjectCard project={mockProject} />);
    const formattedDate = format(mockProject.updatedAt!, 'dd/MM/yyyy');
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('renders the project image if provided', () => {
    render(<ProjectCard project={mockProject} />);
    const image = screen.getByAltText('Test Project Picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProject.picture);
  });

  it('renders the project description', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.description!)).toBeInTheDocument();
  });

  it('has a link to the project page', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link', { name: /test project/i });
    expect(link).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('does not crash if no picture is provided', () => {
    const projectWithoutImage = { ...mockProject, picture: null };
    render(<ProjectCard project={projectWithoutImage} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
