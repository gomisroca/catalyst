import { act, render } from '@testing-library/react';
import { expect } from 'vitest';

import ScrollBg from '@/app/_components/navbar/scroll-bg';

describe('ScrollBg', () => {
  beforeEach(() => {
    // Reset scrollY before each test
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<ScrollBg />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('does not have background class initially', () => {
    const { container } = render(<ScrollBg />);
    const span = container.querySelector('span');
    expect(span?.className).not.toContain('bg-zinc-100');
  });

  it('adds background class after scrolling', () => {
    const { container } = render(<ScrollBg />);
    const span = container.querySelector('span');

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(span?.className).toContain('bg-zinc-100');
  });

  it('removes background class when scrolled back up', () => {
    const { container } = render(<ScrollBg />);
    const span = container.querySelector('span');

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(span?.className).toContain('bg-zinc-100');

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(span?.className).not.toContain('bg-zinc-100');
  });
});
