import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SlideHero } from '../SlideHero';

describe('SlideHero', () => {
  it('renders the project title', () => {
    render(<SlideHero onStart={vi.fn()} />);
    expect(screen.getByText(/LE DERNIER/i)).toBeInTheDocument();
    expect(screen.getByText(/FORESTIER/i)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<SlideHero onStart={vi.fn()} />);
    expect(
      screen.getByText(/8 personnalités\. 6 forêts\. 6 savoirs\. 1 gagnant\./i),
    ).toBeInTheDocument();
  });

  it('calls onStart when the CTA is clicked', async () => {
    const onStart = vi.fn();
    render(<SlideHero onStart={onStart} />);
    await userEvent.click(screen.getByRole('button', { name: /Découvrir le concept/i }));
    expect(onStart).toHaveBeenCalledOnce();
  });
});
