// ═══════════════════════════════════════════════════════════════
// SlideHero — Opening title slide
//
// WHAT: Full-bleed hero with the project title, tagline, and CTA.
// WHEN: Always the first slide (index 0).
// CHANGE BACKGROUND: edit the gradient values in the style prop below
// CHANGE CTA TEXT: edit the button label in the JSX below
// ═══════════════════════════════════════════════════════════════

import { cn } from '@utils/cn';

export interface SlideHeroProps {
  onStart: () => void;
  className?: string;
}

/** Full-bleed hero slide — title, tagline, CTA. */
export const SlideHero = ({ onStart, className }: SlideHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center overflow-hidden',
        className,
      )}
      // WHY: radial gradient simulates a forest canopy opening; no image available
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, #2d4a2d 0%, #1a2e1a 35%, #0d140d 70%, #080c08 100%)',
      }}
    >
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Vertical accent line */}
      <div
        className="bg-forest-lime/10 absolute top-0 bottom-0 left-[320px] w-px"
        aria-hidden="true"
      />

      {/* Top meta */}
      <div className="absolute top-8 left-10 flex items-center gap-4">
        <span className="font-title text-forest-lime/60 text-sm tracking-[0.3em]">
          CLASSE 2 × LAXARGANG
        </span>
        <span className="bg-forest-lime/30 h-px w-8" aria-hidden="true" />
        <span className="font-dm text-forest-cream/40 text-xs tracking-wider">
          Associations forestières romandes
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-16 text-center">
        {/* Year badge */}
        <div className="mb-8 inline-flex items-center gap-2">
          <span className="bg-forest-lime/50 h-px w-6" aria-hidden="true" />
          <span className="font-dm text-forest-lime/70 text-xs tracking-[0.3em] uppercase">
            Série digitale YouTube · 2026
          </span>
          <span className="bg-forest-lime/50 h-px w-6" aria-hidden="true" />
        </div>

        {/* Title */}
        <h1
          className="font-title text-forest-cream leading-none tracking-wider"
          style={{ fontSize: '96px' }}
        >
          LE DERNIER
          <br />
          <span className="text-forest-lime">FORESTIER</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-serif-display text-forest-cream/70 mt-6 italic"
          style={{ fontSize: '20px' }}
        >
          8 personnalités. 6 forêts. 6 savoirs. 1 gagnant.
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={onStart}
          className="border-forest-lime/40 font-dm text-forest-cream/80 hover:border-forest-lime hover:bg-forest-lime/10 hover:text-forest-cream mt-12 inline-flex items-center gap-3 border px-8 py-3 text-sm tracking-wider transition-all duration-300"
        >
          Découvrir le concept
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 7H12M8 3L12 7L8 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom tag */}
      <div className="absolute right-10 bottom-8">
        <span className="font-dm text-forest-cream/25 text-xs tracking-wider">
          Confidentiel · 2026
        </span>
      </div>
    </div>
  );
};
