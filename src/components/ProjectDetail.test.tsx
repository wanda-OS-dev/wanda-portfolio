import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectDetail } from './ProjectDetail';
import { Project } from '@/lib/projects';

// Mock intersection observer for framer-motion
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
global.IntersectionObserver = IntersectionObserverMock as any;

describe('ProjectDetail', () => {
  it('renders gracefully with an unknown project ID', () => {
    // 1. Arrange: Create a project object with an unknown ID
    const unknownProject: Project = {
      id: 'unknown-project-id',
      title: 'Unknown Project Title',
      category: 'Unknown Category',
      year: '2099',
      description: 'This is a test description.',
      longDescription: 'This is a long test description.\n\nIt has multiple paragraphs.',
      tags: ['Test Tag 1', 'Test Tag 2'],
      accentColor: '#123456',
    };

    // 2. Act: Render the component
    render(<ProjectDetail project={unknownProject} />);

    // 3. Assert: Verify the component rendered without errors
    // and displays the unknown project's data correctly.
    expect(screen.getByText('Unknown Project Title')).toBeDefined();
    expect(screen.getByText('This is a test description.')).toBeDefined();

    // Check if tags are rendered
    expect(screen.getByText('Test Tag 1')).toBeDefined();

    // When the project ID is unknown, `findIndex` returns -1.
    // The next project index is calculated as `(currentIndex + 1) % projects.length`.
    // With `currentIndex = -1`, `(-1 + 1) % length` equals `0`.
    // Therefore, the "Next Project" should safely fall back to the first project in the list
    // (Lead Qualification Automation) instead of crashing.
    expect(screen.getByText('Lead Qualification Automation')).toBeDefined();
  });
});
