import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main component', () => {
    render(<App />);
    expect(screen.getByText(/bitcode/i)).toBeInTheDocument();
  });
});
