import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SlideChapter } from '../SlideChapter';

describe('SlideChapter', () => {
  it('renders chapter number and title', () => {
    render(<SlideChapter number="03" title="Le Format" />);
    expect(screen.getByText(/CHAPITRE 03/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Le Format/i })).toBeInTheDocument();
  });
});
