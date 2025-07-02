import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LoadingSpinner from '@/app/_components/ui/loading-spinner';

describe('LoadingSpinner', () => {
  it('renders the spinner element', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    const text = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
