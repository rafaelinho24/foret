// ═══════════════════════════════════════════════════════════════
// SlideSommaire — Interactive table of contents
//
// WHAT: Lists all 11 chapters as clickable items with numbers.
// WHEN: Third slide — between intro and chapter 01.
// CHANGE LAYOUT: chapters are in a 2-column grid; edit grid-cols-* below
// ═══════════════════════════════════════════════════════════════

import { chapters, getChapterSlideIndex } from '@data/slides';
import { cn } from '@utils/cn';

export interface SlideSommaireProps {
  onNavigate: (index: number) => void;
  className?: string;
}

/** Interactive table of contents — each chapter is clickable. */
export const SlideSommaire = ({ onNavigate, className }: SlideSommaireProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-center overflow-hidden px-20',
        className,
      )}
      style={{
        background: 'linear-gradient(160deg, #0d140d 0%, #080c08 100%)',
      }}
    >
      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#c8f53c 1px, transparent 1px), linear-gradient(90deg, #c8f53c 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <span className="bg-forest-lime/60 h-px w-12" aria-hidden="true" />
          <h2 className="font-title text-forest-cream/80 text-lg tracking-[0.3em] uppercase">
            Sommaire
          </h2>
        </div>

        {/* Chapter list — 2 columns */}
        <nav aria-label="Table des matières">
          <ul className="grid grid-cols-2 gap-x-16 gap-y-2">
            {chapters.map(chapter => {
              const num = parseInt(chapter.number, 10);
              return (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(getChapterSlideIndex(num))}
                    className="group border-forest-cream/10 hover:border-forest-lime/40 flex w-full items-center gap-4 border-b py-3 text-left transition-all duration-200"
                  >
                    <span className="font-title text-forest-lime/50 group-hover:text-forest-lime text-sm tracking-widest transition-colors duration-200">
                      {chapter.number}
                    </span>
                    <span className="font-dm text-forest-cream/50 group-hover:text-forest-cream text-sm transition-colors duration-200">
                      {chapter.title}
                    </span>
                    <span className="text-forest-lime/0 group-hover:text-forest-lime/60 ml-auto transition-all duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
