import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProjectCard } from '@/components/project/project-card';

const mockProject = {
  id: '1',
  name: 'Project 1',
  description: 'Description of project 1',
  avatar: 'avatar.png',
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  popularity: 0,
  activity: 0,
  trendingActivity: false,
  trendingPopularity: false,
  permissions: {
    private: false,
    allowedUsers: [],
    allowCollaborate: true,
    allowBranch: true,
    allowShare: true,
    projectId: '1',
  },
  branches: [],
  author: {
    id: '1',
    username: 'user1',
    nickname: 'User 1',
    email: 'user@example.com',
    avatar: 'avatar.png',
    role: 'USER',
    posts: [],
    branches: [],
    projects: [],
    postInteractions: [],
    branchInteractions: [],
    followedBy: [],
  },
};

describe('ProjectCard', () => {
  it('should render the project link', () => {
    render(<ProjectCard project={mockProject} />, { wrapper: BrowserRouter });

    const link = screen.getByRole('link', { name: /project 1/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/1');
  });

  it('should render the project avatar fallback', () => {
    render(<ProjectCard project={mockProject} />, { wrapper: BrowserRouter });

    const avatarFallback = screen.getByText(/p/i, { selector: 'span' });
    expect(avatarFallback).toHaveClass('flex h-full w-full items-center justify-center rounded-full bg-muted');
    expect(avatarFallback).toBeInTheDocument();
  });

  it('should render the project name', () => {
    render(<ProjectCard project={mockProject} />, { wrapper: BrowserRouter });

    const name = screen.getByText(/project 1/i, { selector: 'h3' });
    expect(name).toBeInTheDocument();
  });

  it('should render the project author', () => {
    render(<ProjectCard project={mockProject} />, { wrapper: BrowserRouter });

    const author = screen.getByText(/@user1/i);
    expect(author).toBeInTheDocument();
  });

  it('should render the project creation date', () => {
    render(<ProjectCard project={mockProject} />, { wrapper: BrowserRouter });

    const date = screen.getByText(new Date().toLocaleDateString());
    expect(date).toBeInTheDocument();
  });

  it('should render the project description', () => {
    render(<ProjectCard project={mockProject} />, { wrapper: BrowserRouter });

    const description = screen.getByText(/description of project 1/i);
    expect(description).toBeInTheDocument();
  });
});
