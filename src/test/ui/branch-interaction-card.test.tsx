import { render, screen } from '@testing-library/react';
import { type ExtendedBranchInteraction } from 'types';
import { expect, vi } from 'vitest';

import { BranchInteractionCard } from '@/app/_components/cards';

vi.mock('next/link', () => ({
  _esModule: true,
  default: (props: { href: string; children: React.ReactNode }) => <a href={props.href}>{props.children}</a>,
}));

function getMockInteraction(type: 'LIKE' | 'SHARE' | 'BOOKMARK'): ExtendedBranchInteraction {
  return {
    id: `interaction-${type.toLowerCase()}`,
    type,
    createdAt: new Date('2024-10-01T12:00:00Z'),
    branch: {
      name: `Mock Branch for ${type}`,
      description: `This is a description for ${type}`,
      id: 'branch123',
    },
    user: {
      id: 'user456',
      name: type === 'SHARE' ? null : `User ${type}`,
      email: `user${type.toLowerCase()}@example.com`,
    },
  } as ExtendedBranchInteraction;
}

describe('BranchInteractionCard', () => {
  it.each([
    ['LIKE', 'Liked a branch'],
    ['SHARE', 'Shared a branch'],
    ['BOOKMARK', 'Saved a branch'],
  ])('renders interaction type: %s', (type, expectedText) => {
    const interaction = getMockInteraction(type as 'LIKE' | 'SHARE' | 'BOOKMARK');
    render(<BranchInteractionCard interaction={interaction} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders the branch name and description', () => {
    const interaction = getMockInteraction('LIKE');
    render(<BranchInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.branch.name)).toBeInTheDocument();
    expect(screen.getByText(interaction.branch.description!)).toBeInTheDocument();
  });

  it('renders the user name if provided', () => {
    const interaction = getMockInteraction('LIKE');
    render(<BranchInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.user.name!)).toBeInTheDocument();
  });

  it('falls back to email username if name is missing', () => {
    const interaction = getMockInteraction('SHARE');
    render(<BranchInteractionCard interaction={interaction} />);
    expect(screen.getByText('usershare')).toBeInTheDocument();
  });

  it('renders a link to the user profile', () => {
    const interaction = getMockInteraction('BOOKMARK');
    render(<BranchInteractionCard interaction={interaction} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/profile/${interaction.user.id}`);
  });

  it('renders the formatted date', () => {
    const interaction = getMockInteraction('LIKE');
    render(<BranchInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.createdAt.toLocaleDateString())).toBeInTheDocument();
  });
});
