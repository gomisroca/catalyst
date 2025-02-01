import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect } from 'vitest';

describe('Hello World', () => {
  it('should log hello world', () => {
    const { getByText } = render(<h1>Hello World</h1>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
