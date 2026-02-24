// ═══════════════════════════════════════════════════════════════
// NavLeft — Left sidebar chapter navigation
//
// WHAT: Lists all 11 chapters; highlights the currently active one.
// WHEN: Shown inside every content slide on the left 25% panel.
// CHANGE ACTIVE COLOUR: edit text-forest-lime class in the active branch below
// CHANGE WIDTH: adjust width in SlideContent.tsx layout
// ═══════════════════════════════════════════════════════════════

import { chapters, getChapterSlideIndex } from '@data/slides';
import { cn } from '@utils/cn';

export interface NavLeftProps {
  /** Currently active chapter number (1–11), or null if not in a chapter */
  activeChapter: number | null;
  /** Callback with the slide index to jump to */
  onNavigate: (index: number) => void;
  className?: string;
}

/** Sidebar listing all chapters; active chapter is highlighted in lime. */
export const NavLeft = ({ activeChapter, onNavigate, className }: NavLeftProps) => {
  return (
    <nav
      aria-label="Chapitres"
      className={cn('flex flex-col justify-center gap-0.5 px-6 py-8', className)}
    >
      <p className="font-dm text-forest-cream/40 mb-4 text-[10px] tracking-[0.2em] uppercase">
        Chapitres
      </p>

      {chapters.map(chapter => {
        const num = parseInt(chapter.number, 10);
        const isActive = activeChapter === num;

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onNavigate(getChapterSlideIndex(num))}
            className={cn(
              'group flex items-center gap-3 rounded px-2 py-1.5 text-left',
              'transition-all duration-200 hover:translate-x-1',
              isActive ? 'text-forest-lime' : 'text-forest-cream/40 hover:text-forest-cream/70',
            )}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={cn(
                'font-title text-[11px] tracking-wider transition-colors duration-200',
                isActive
                  ? 'text-forest-lime'
                  : 'text-forest-lime/30 group-hover:text-forest-lime/60',
              )}
            >
              {chapter.number}
            </span>
            <span className="font-dm text-[11px] leading-tight">{chapter.title}</span>
          </button>
        );
      })}
    </nav>
  );
};
