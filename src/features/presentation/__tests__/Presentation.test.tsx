import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Presentation } from '../Presentation';

describe('Presentation', () => {
  it('renders the hero slide first', () => {
    render(<Presentation />);
    expect(screen.getByText(/LE DERNIER/i)).toBeInTheDocument();
  });

  it('navigates to the next slide on ArrowRight', async () => {
    render(<Presentation />);
    // Hero slide is first — ArrowRight should go to intro
    await userEvent.keyboard('{ArrowRight}');
    // Wait for fade transition (320ms) — vitest uses fake timers by default, use findBy
    expect(await screen.findByText(/Le constat/i, {}, { timeout: 1000 })).toBeInTheDocument();
  });

  it('renders nav controls', () => {
    render(<Presentation />);
    expect(screen.getByLabelText('Slide précédente')).toBeInTheDocument();
    expect(screen.getByLabelText('Slide suivante')).toBeInTheDocument();
  });
});
