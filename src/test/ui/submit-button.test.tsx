import { render, screen } from '@testing-library/react';
import { useFormStatus } from 'react-dom';
import { describe, expect, it, vi } from 'vitest';

import SubmitButton from '@/app/_components/ui/submit-button';

vi.mock('react-dom', () => ({
  useFormStatus: vi.fn(),
}));

const mockUseFormStatus = vi.mocked(useFormStatus);

describe('SubmitButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when form is not pending', () => {
    beforeEach(() => {
      mockUseFormStatus.mockReturnValue({
        pending: false,
        data: null,
        method: null,
        action: null,
      });
    });

    it('renders the SubmitButton component correctly', () => {
      render(<SubmitButton baseText="Submit" pendingText="Submitting..." />);

      const button = screen.getByRole('button', { name: 'Submit' });

      expect(button).toBeInTheDocument();
    });

    it('renders the SubmitButton component with a custom class', () => {
      render(<SubmitButton baseText="Submit" pendingText="Submitting..." className="bg-red-500 text-white" />);

      const button = screen.getByRole('button', { name: 'Submit' });

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-red-500 text-white');
    });

    it('is not disabled by default', () => {
      render(<SubmitButton baseText="Submit" pendingText="Submitting..." />);

      const button = screen.getByRole('button', { name: 'Submit' });

      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });

  describe('when form is pending', () => {
    beforeEach(() => {
      mockUseFormStatus.mockReturnValue({
        pending: true,
        data: new FormData(),
        method: 'POST',
        action: '/submit',
      });
    });

    it('renders the pending text', async () => {
      mockUseFormStatus.mockReturnValue({
        pending: true,
        data: new FormData(),
        method: 'POST',
        action: '/submit',
      });
      render(<SubmitButton baseText="Submit" pendingText="Submitting..." />);

      expect(screen.getByText('Submitting...')).toBeInTheDocument();
      expect(screen.queryByText('Submit Form')).not.toBeInTheDocument();
    });

    it('is disabled', () => {
      render(<SubmitButton baseText="Submit" pendingText="Submitting..." />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});
