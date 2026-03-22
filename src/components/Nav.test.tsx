import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Nav } from './Nav';

describe('Nav Component', () => {
  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Nav />);

    const openButton = screen.getByRole('button', { name: 'Open menu' });
    expect(openButton).toBeInTheDocument();

    // Click to open
    fireEvent.click(openButton);

    const closeButton = screen.getByRole('button', { name: 'Close menu' });
    expect(closeButton).toBeInTheDocument();

    const mobileLinks = screen.getAllByRole('link', { name: /Work|About|Contact/i })
      .filter(link => link.className.includes('text-4xl'));

    expect(mobileLinks.length).toBe(3);

    // Click to close
    fireEvent.click(closeButton);

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
