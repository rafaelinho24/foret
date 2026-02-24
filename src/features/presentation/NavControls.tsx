// ═══════════════════════════════════════════════════════════════
// NavControls — Bottom navigation arrows + progress indicator
//
// WHAT: Previous/Next arrows and a "slide X / total" counter.
// WHEN: Fixed at the bottom of every slide in the presentation.
// CHANGE STYLE: edit button className below
// ═══════════════════════════════════════════════════════════════

import { slides } from '@data/slides';
import { cn } from '@utils/cn';
import type React from 'react';

export interface NavControlsProps {
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/** Arrow navigation buttons and slide progress counter. */
export const NavControls = ({
  currentIndex,
  onPrev,
  onNext,
  className,
  style,
}: NavControlsProps) => {
  const total = slides.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className={cn('flex items-center justify-between px-8 py-4', className)} style={style}>
      {/* Previous */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Slide précédente"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
          isFirst
            ? 'border-forest-cream/10 text-forest-cream/20 cursor-not-allowed'
            : 'border-forest-cream/20 text-forest-cream/60 hover:border-forest-lime/60 hover:text-forest-lime',
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="font-title text-forest-lime text-sm tracking-widest">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <div className="bg-forest-cream/20 h-px w-24">
          <div
            className="bg-forest-lime h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="font-dm text-forest-cream/30 text-sm">
          {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Slide suivante"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
          isLast
            ? 'border-forest-cream/10 text-forest-cream/20 cursor-not-allowed'
            : 'border-forest-cream/20 text-forest-cream/60 hover:border-forest-lime/60 hover:text-forest-lime',
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
