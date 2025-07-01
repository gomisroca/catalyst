import { render, screen } from '@testing-library/react';
import { type ExtendedProjectInteraction } from 'types';
import { expect, vi } from 'vitest';

import { ProjectInteractionCard } from '@/app/_components/cards';

vi.mock('next/link', () => ({
  _esModule: true,
  default: (props: { href: string; children: React.ReactNode }) => <a href={props.href}>{props.children}</a>,
}));

function getMockInteraction(type: 'LIKE' | 'SHARE' | 'BOOKMARK'): ExtendedProjectInteraction {
  return {
    id: `interaction-${type.toLowerCase()}`,
    type,
    createdAt: new Date('2024-10-01T12:00:00Z'),
    project: {
      name: `Mock Project for ${type}`,
      description: `This is a description for ${type}`,
      id: 'project123',
    },
    user: {
      id: 'user456',
      name: type === 'SHARE' ? null : `User ${type}`,
      email: `user${type.toLowerCase()}@example.com`,
    },
  } as ExtendedProjectInteraction;
}

describe('ProjectInteractionCard', () => {
  it.each([
    ['LIKE', 'Liked a project'],
    ['SHARE', 'Shared a project'],
    ['BOOKMARK', 'Saved a project'],
  ])('renders interaction type: %s', (type, expectedText) => {
    const interaction = getMockInteraction(type as 'LIKE' | 'SHARE' | 'BOOKMARK');
    render(<ProjectInteractionCard interaction={interaction} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders the project name and description', () => {
    const interaction = getMockInteraction('LIKE');
    render(<ProjectInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.project.name)).toBeInTheDocument();
    expect(screen.getByText(interaction.project.description!)).toBeInTheDocument();
  });

  it('renders the user name if provided', () => {
    const interaction = getMockInteraction('LIKE');
    render(<ProjectInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.user.name!)).toBeInTheDocument();
  });

  it('falls back to email username if name is missing', () => {
    const interaction = getMockInteraction('SHARE');
    render(<ProjectInteractionCard interaction={interaction} />);
    expect(screen.getByText('usershare')).toBeInTheDocument();
  });

  it('renders a link to the user profile', () => {
    const interaction = getMockInteraction('BOOKMARK');
    render(<ProjectInteractionCard interaction={interaction} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/profile/${interaction.user.id}`);
  });

  it('renders the formatted date', () => {
    const interaction = getMockInteraction('LIKE');
    render(<ProjectInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.createdAt.toLocaleDateString())).toBeInTheDocument();
  });
});
