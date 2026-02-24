import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NavControls } from '../NavControls';

describe('NavControls', () => {
  it('renders prev and next buttons', () => {
    render(<NavControls currentIndex={5} onPrev={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByLabelText('Slide précédente')).toBeInTheDocument();
    expect(screen.getByLabelText('Slide suivante')).toBeInTheDocument();
  });

  it('disables prev button on first slide', () => {
    render(<NavControls currentIndex={0} onPrev={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByLabelText('Slide précédente')).toBeDisabled();
  });

  it('calls onNext when next button is clicked', async () => {
    const onNext = vi.fn();
    render(<NavControls currentIndex={0} onPrev={vi.fn()} onNext={onNext} />);
    await userEvent.click(screen.getByLabelText('Slide suivante'));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('calls onPrev when prev button is clicked', async () => {
    const onPrev = vi.fn();
    render(<NavControls currentIndex={5} onPrev={onPrev} onNext={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('Slide précédente'));
    expect(onPrev).toHaveBeenCalledOnce();
  });
});
