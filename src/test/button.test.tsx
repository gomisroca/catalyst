import { render, fireEvent } from '@testing-library/react';
import Button from '../app/_components/ui/button';
import { describe, it, expect, vi } from 'vitest';

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button name="Click me">Child</Button>);
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} name="Click me">
        Click me
      </Button>
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} disabled name="Click me">
        Click me
      </Button>
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has type="button" by default', () => {
    const { getByRole } = render(<Button name="Click me">Click me</Button>);
    expect(getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects the type prop', () => {
    const { getByRole } = render(
      <Button name="Click me" type="submit">
        Submit
      </Button>
    );
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <Button name="Click me" className="custom-class">
        Click
      </Button>
    );
    expect(getByRole('button')).toHaveClass('custom-class');
  });

  it('adds disabled styles when disabled', () => {
    const { getByRole } = render(
      <Button name="Click me" disabled>
        Click
      </Button>
    );
    expect(getByRole('button')).toHaveClass('cursor-not-allowed');
  });
});
