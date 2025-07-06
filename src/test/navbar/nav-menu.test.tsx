import { fireEvent } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, vi } from 'vitest';

import NavMenu from '@/app/_components/navbar/nav-menu';

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { src: string; alt: string }) => <img data-testid="image" src={props.src} alt={props.alt} />,
}));

vi.mock('next-auth/react', async () => {
  const actual = await vi.importActual('next-auth/react');
  return {
    ...actual,
    signOut: vi.fn(),
  };
});

vi.mock('@/app/_components/search/search-bar', () => ({
  __esModule: true,
  default: ({ navbar }: { navbar: boolean }) => (
    <div data-testid="search-bar">Search Bar {navbar ? '(navbar)' : ''}</div>
  ),
}));

vi.mock('@/app/_components/ui/button', () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    arialabel,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    arialabel: string;
  }) => (
    <button
      onClick={onClick}
      data-testid={arialabel === 'Search' ? 'search-toggle' : arialabel === 'User Menu' ? 'menu-toggle' : 'button'}
      aria-label={arialabel}>
      {children}
    </button>
  ),
}));

vi.mock('@/app/_components/ui/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}));

describe('NavMenu', () => {
  const mockSession = {
    user: {
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com',
      emailVerified: new Date(),
      avatar: '/user.jpg',
    },
    expires: '2099-01-01T00:00:00.000Z',
  };

  it('renders menu buttons', () => {
    render(<NavMenu session={null} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('toggles search bar on click', () => {
    render(<NavMenu session={null} />);
    const searchToggle = screen.getByTestId('search-toggle');

    // Initially, no search bar
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();

    // Click to open\
    fireEvent.click(searchToggle);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();

    // Click to close
    fireEvent.click(searchToggle);
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
  });

  it('toggles user menu on click when signed out', () => {
    render(<NavMenu session={null} />);
    const menuToggle = screen.getByTestId('menu-toggle');

    // Click to open
    fireEvent.click(menuToggle);
    expect(screen.getByText('Sign In')).toBeInTheDocument();

    // Click to close
    fireEvent.click(menuToggle);
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  it('toggles user menu on click when signed in', () => {
    render(<NavMenu session={mockSession} />);
    const menuToggle = screen.getByTestId('menu-toggle');

    fireEvent.click(menuToggle);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    fireEvent.click(menuToggle);
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('closes menus when clicking outside', () => {
    render(<NavMenu session={mockSession} />);
    const searchToggle = screen.getByTestId('search-toggle');
    const menuToggle = screen.getByTestId('menu-toggle');

    // Open both
    fireEvent.click(searchToggle);
    fireEvent.click(menuToggle);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // Simulate outside click
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });
});
