import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, className }: any) => React.createElement('header', { className }, children),
    div: ({ children, className }: any) => React.createElement('div', { className }, children),
  },
  AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
}));
