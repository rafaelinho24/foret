import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SlideSommaire } from '../SlideSommaire';

describe('SlideSommaire', () => {
  it('renders sommaire heading', () => {
    render(<SlideSommaire onNavigate={vi.fn()} />);
    expect(screen.getByText(/Sommaire/i)).toBeInTheDocument();
  });

  it('renders all 11 chapter titles', () => {
    render(<SlideSommaire onNavigate={vi.fn()} />);
    expect(screen.getByText("L'Accroche")).toBeInTheDocument();
    expect(screen.getByText("L'Équipe & la Production")).toBeInTheDocument();
  });

  it('calls onNavigate when a chapter is clicked', async () => {
    const onNavigate = vi.fn();
    render(<SlideSommaire onNavigate={onNavigate} />);
    await userEvent.click(screen.getAllByRole('button')[0]!);
    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
