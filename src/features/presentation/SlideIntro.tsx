// ═══════════════════════════════════════════════════════════════
// SlideIntro — Problem statement slide
//
// WHAT: Full-bleed slide establishing the problem the project solves.
// WHEN: Second slide, after SlideHero.
// CHANGE TEXT: edit text content in the JSX below (no data file needed)
// ═══════════════════════════════════════════════════════════════

import { cn } from '@utils/cn';

export interface SlideIntroProps {
  className?: string;
}

/** Problem statement slide — forest coverage vs. invisibility. */
export const SlideIntro = ({ className }: SlideIntroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-center overflow-hidden px-24',
        className,
      )}
      style={{
        background: 'linear-gradient(135deg, #080c08 0%, #0d140d 50%, #1a2e1a 100%)',
      }}
    >
      {/* Left accent bar */}
      <div className="bg-forest-lime/20 absolute top-0 bottom-0 left-0 w-1" aria-hidden="true" />

      {/* Number decoration */}
      <div
        className="font-title text-forest-cream/[0.03] pointer-events-none absolute right-0 bottom-0 select-none"
        style={{ fontSize: '320px', lineHeight: 1 }}
        aria-hidden="true"
      >
        02
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-4">
          <span className="bg-forest-lime/60 h-px w-12" aria-hidden="true" />
          <span className="font-dm text-forest-lime/70 text-xs tracking-[0.3em] uppercase">
            Le constat
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-title text-forest-cream leading-tight tracking-wide"
          style={{ fontSize: '52px' }}
        >
          La forêt couvre un tiers
          <br />
          de la Suisse. <span className="text-forest-cream/40">Personne n&apos;en parle.</span>
        </h2>

        {/* Body */}
        <p
          className="font-dm text-forest-cream/60 mt-8 leading-relaxed"
          style={{ fontSize: '16px' }}
        >
          Pas parce que c&apos;est ennuyeux — mais parce que personne n&apos;a encore trouvé la
          bonne façon de le raconter. Les documentaires institutionnels ne touchent pas les jeunes.
          Les campagnes de sensibilisation prêchent des convertis. Et les métiers forestiers
          continuent de souffrir d&apos;un déficit d&apos;image criant auprès des nouvelles
          générations.
        </p>

        {/* Punchline */}
        <p
          className="font-title text-forest-lime mt-10 tracking-widest"
          style={{ fontSize: '28px' }}
        >
          LE DERNIER FORESTIER CHANGE ÇA.
        </p>
      </div>
    </div>
  );
};
