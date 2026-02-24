import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NavLeft } from '../NavLeft';

describe('NavLeft', () => {
  it('renders all 11 chapters', () => {
    render(<NavLeft activeChapter={null} onNavigate={vi.fn()} />);
    // All chapter numbers should appear
    for (let i = 1; i <= 11; i++) {
      expect(screen.getByText(String(i).padStart(2, '0'))).toBeInTheDocument();
    }
  });

  it('marks the active chapter with aria-current', () => {
    render(<NavLeft activeChapter={3} onNavigate={vi.fn()} />);
    // The button for chapter 3 should have aria-current="true"
    const buttons = screen.getAllByRole('button');
    const activeBtn = buttons.find(b => b.getAttribute('aria-current') === 'true');
    expect(activeBtn).toBeDefined();
  });

  it('calls onNavigate when a chapter is clicked', async () => {
    const onNavigate = vi.fn();
    render(<NavLeft activeChapter={null} onNavigate={onNavigate} />);
    await userEvent.click(screen.getAllByRole('button')[0]!);
    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
