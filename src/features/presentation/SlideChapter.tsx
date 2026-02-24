// ═══════════════════════════════════════════════════════════════
// SlideChapter — Full-bleed chapter separator
//
// WHAT: Displays a chapter number + title full-screen as a visual break.
// WHEN: Reused for each of the 11 chapters (template component).
// CHANGE BACKGROUND: edit gradient values in the style prop below
// CHANGE FONT SIZE: edit the fontSize style on the number and title spans
// ═══════════════════════════════════════════════════════════════

import { cn } from '@utils/cn';

export interface SlideChapterProps {
  number: string;
  title: string;
  className?: string;
}

/** Full-bleed chapter separator slide — large number + title. */
export const SlideChapter = ({ number, title, className }: SlideChapterProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center overflow-hidden',
        className,
      )}
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 50% 50%, #2d4a2d 0%, #1a2e1a 40%, #080c08 100%)',
      }}
    >
      {/* Giant ghost number — decorative background text */}
      <div
        className="font-title text-forest-cream/[0.04] pointer-events-none absolute select-none"
        style={{ fontSize: '380px', lineHeight: 1, top: '-40px' }}
        aria-hidden="true"
      >
        {number}
      </div>

      {/* Horizontal accent lines */}
      <div className="absolute top-1/2 right-0 left-0 -translate-y-1/2" aria-hidden="true">
        <div className="bg-forest-lime/20 mx-20 h-px" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-20 text-center">
        <span className="font-title text-forest-lime tracking-[0.4em]" style={{ fontSize: '20px' }}>
          CHAPITRE {number}
        </span>

        <h2
          className="font-title text-forest-cream leading-tight tracking-wide"
          style={{ fontSize: '72px' }}
        >
          {title}
        </h2>

        {/* Animated lime dot */}
        <div
          className="bg-forest-lime h-2 w-2 rounded-full"
          style={{ boxShadow: '0 0 16px #c8f53c, 0 0 32px rgba(200,245,60,0.4)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
