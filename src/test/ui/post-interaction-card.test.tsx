import { render, screen } from '@testing-library/react';
import { type ExtendedPostInteraction } from 'types';
import { expect, vi } from 'vitest';

import { PostInteractionCard } from '@/app/_components/cards';

vi.mock('next/link', () => ({
  _esModule: true,
  default: (props: { href: string; children: React.ReactNode }) => <a href={props.href}>{props.children}</a>,
}));

function getMockInteraction(type: 'LIKE' | 'SHARE' | 'BOOKMARK'): ExtendedPostInteraction {
  return {
    id: `interaction-${type.toLowerCase()}`,
    type,
    createdAt: new Date('2024-10-01T12:00:00Z'),
    post: {
      title: `Mock Post for ${type}`,
      content: `This is a mock post for ${type}`,
      id: 'branch123',
    },
    user: {
      id: 'user456',
      name: type === 'SHARE' ? null : `User ${type}`,
      email: `user${type.toLowerCase()}@example.com`,
    },
  } as ExtendedPostInteraction;
}

describe('PostInteractionCard', () => {
  it.each([
    ['LIKE', 'Liked a post'],
    ['SHARE', 'Shared a post'],
    ['BOOKMARK', 'Saved a post'],
  ])('renders interaction type: %s', (type, expectedText) => {
    const interaction = getMockInteraction(type as 'LIKE' | 'SHARE' | 'BOOKMARK');
    render(<PostInteractionCard interaction={interaction} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders the post title and content', () => {
    const interaction = getMockInteraction('LIKE');
    render(<PostInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.post.title)).toBeInTheDocument();
    expect(screen.getByText(interaction.post.content!)).toBeInTheDocument();
  });

  it('renders the user name if provided', () => {
    const interaction = getMockInteraction('LIKE');
    render(<PostInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.user.name!)).toBeInTheDocument();
  });

  it('falls back to email username if name is missing', () => {
    const interaction = getMockInteraction('SHARE');
    render(<PostInteractionCard interaction={interaction} />);
    expect(screen.getByText('usershare')).toBeInTheDocument();
  });

  it('renders a link to the user profile', () => {
    const interaction = getMockInteraction('BOOKMARK');
    render(<PostInteractionCard interaction={interaction} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/profile/${interaction.user.id}`);
  });

  it('renders the formatted date', () => {
    const interaction = getMockInteraction('LIKE');
    render(<PostInteractionCard interaction={interaction} />);
    expect(screen.getByText(interaction.createdAt.toLocaleDateString())).toBeInTheDocument();
  });
});
