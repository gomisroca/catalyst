import { act, fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { describe, expect, it, vi } from 'vitest';

import ThemeButton from '@/app/_components/ui/theme-button';

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));
const mockUseTheme = vi.mocked(useTheme);

describe('ThemeButton', () => {
  const mockSetTheme = vi.fn();

  it('renders the ThemeButton component correctly', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
      forcedTheme: undefined,
    });
    render(<ThemeButton />);

    expect(screen.getByRole('button', { name: 'Theme Button' })).toBeInTheDocument();
  });

  it('changes the theme to dark when current theme is light', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
      forcedTheme: undefined,
    });

    render(<ThemeButton />);
    const button = screen.getByRole('button', { name: 'Theme Button' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('changes the theme to light when current theme is dark', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      resolvedTheme: 'dark',
      forcedTheme: undefined,
    });

    render(<ThemeButton />);
    const button = screen.getByRole('button', { name: 'Theme Button' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
