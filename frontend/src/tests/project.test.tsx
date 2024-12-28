import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Project from '@/routes/project';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/user-provider';
import { getProject } from '@/lib/projects';

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet" />,
  useParams: vi.fn(),
  useNavigate: vi.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>, // Mock `Link` component
}));

vi.mock('@/contexts/user-provider', () => ({
  useUser: vi.fn(),
}));

vi.mock('@/lib/projects', () => ({
  getProject: vi.fn(),
}));

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
  branches: [
    {
      id: 'branch1',
      name: 'Main Branch',
      default: true,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      description: 'Description of main branch',
      trendingActivity: false,
      trendingPopularity: false,
      projectId: '1',
      posts: [],
      popularity: 10,
      activity: 5,
      permissions: {
        private: false,
        allowedUsers: [],
        allowCollaborate: true,
        allowBranch: true,
        allowShare: true,
        branchId: 'branch1',
      },
      author: { id: '1' },
      interactions: [],
      childBranches: [],
    },
  ],
  author: {
    id: '1',
    username: 'user',
    nickname: 'User',
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

const mockJWTUser = {
  id: '1',
  email: 'user@example.com',
  username: 'user',
  nickname: 'User',
  avatar: 'avatar.png',
  role: 'USER',
  posts: [],
  branches: [],
  projects: [],
  postInteractions: [],
  branchInteractions: [],
  followedBy: [],
};

describe('Project Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project details when data is available', async () => {
    vi.mocked(useParams).mockReturnValue({ projectId: '1' });
    vi.mocked(useUser).mockReturnValue({ user: mockJWTUser, signOut: vi.fn() });
    // @ts-ignore
    vi.mocked(getProject).mockResolvedValue(mockProject);
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(<Project />);

    // Wait for project to load
    await waitFor(() => expect(getProject).toHaveBeenCalledWith('1'));

    // Check that project details are rendered
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('User@user')).toBeInTheDocument();
    expect(screen.getByText('Description of project 1')).toBeInTheDocument();
  });

  // it('shows "no branches" message if there are no branches', async () => {
  //   vi.mocked(useParams).mockReturnValue({ projectId: '123' });
  //   vi.mocked(useUser).mockReturnValue({ user: mockJWTUser, signOut: vi.fn() });
  //   vi.mocked(getProject).mockResolvedValue(mockProject);

  //   render(<Project />);

  //   // Wait for project to load
  //   await waitFor(() => expect(getProject).toHaveBeenCalledWith('123'));

  //   // Check "no branches" message
  //   expect(screen.getByText('This project has no branches yet.')).toBeInTheDocument();
  // });

  // it('navigates to selected branch on change', async () => {
  //   vi.mocked(useParams).mockReturnValue({ projectId: '123' });
  //   vi.mocked(useUser).mockReturnValue({ user: mockJWTUser, signOut: vi.fn() });
  //   vi.mocked(getProject).mockResolvedValue(mockProject);
  //   const mockNavigate = vi.fn();
  //   vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  //   render(<Project />);

  //   // Wait for project to load
  //   await waitFor(() => expect(getProject).toHaveBeenCalledWith('123'));

  //   // Select a branch
  //   const branchSelect = screen.getByRole('combobox');
  //   fireEvent.change(branchSelect, { target: { value: 'branch1' } });

  //   // Wait for navigation
  //   await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('branch1'));
  // });
});
