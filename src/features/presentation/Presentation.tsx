// ═══════════════════════════════════════════════════════════════
// Presentation — Root component for the Le Dernier Forestier deck
//
// WHAT: Manages slide navigation state, keyboard controls, and
//       renders the correct slide component for the current index.
// WHEN: Rendered by src/pages/Presentation.tsx at route "/".
// CHANGE SLIDE SIZE: edit SLIDE_W / SLIDE_H constants below
// ADD A SLIDE TYPE: add a case in renderSlide() and export it from slides.ts
// ═══════════════════════════════════════════════════════════════

import { type Slide, slides } from '@data/slides';
import { cn } from '@utils/cn';
import { useCallback, useEffect, useRef, useState } from 'react';

import { NavControls } from './NavControls';
import { SlideChapter } from './SlideChapter';
import { SlideContent } from './SlideContent';
import { SlideHero } from './SlideHero';
import { SlideIntro } from './SlideIntro';
import { SlideSommaire } from './SlideSommaire';

// WHY: fixed 16/9 design target; scaling is applied via CSS transform
const SLIDE_W = 1280;
const SLIDE_H = 720;

/** Returns the active chapter number for nav highlight, or null */
function getActiveChapter(slide: Slide): number | null {
  if (slide.type === 'chapter') return parseInt(slide.number, 10);
  if (slide.type === 'content') return slide.chapter;
  return null;
}

export interface PresentationProps {
  className?: string;
}

/** Root presentation component — manages navigation and renders slides. */
export const Presentation = ({ className }: PresentationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // WHY: tracks direction for the fade — always fade regardless of direction
  const [visible, setVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Scale to fit viewport ──────────────────────────────────── */

  useEffect(() => {
    const updateScale = () => {
      const sw = window.innerWidth / SLIDE_W;
      const sh = window.innerHeight / SLIDE_H;
      setScale(Math.min(sw, sh));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  /* ── Navigation logic ───────────────────────────────────────── */

  const navigate = useCallback(
    (targetIndex: number) => {
      if (isAnimating) return;
      const clamped = Math.max(0, Math.min(slides.length - 1, targetIndex));
      if (clamped === currentIndex) return;

      setIsAnimating(true);
      setVisible(false);

      // WHY: fade-out then swap content then fade-in; 300ms matches CSS transition
      setTimeout(() => {
        setCurrentIndex(clamped);
        setVisible(true);
        setTimeout(() => setIsAnimating(false), 320);
      }, 320);
    },
    [isAnimating, currentIndex],
  );

  const goNext = useCallback(() => navigate(currentIndex + 1), [navigate, currentIndex]);
  const goPrev = useCallback(() => navigate(currentIndex - 1), [navigate, currentIndex]);

  /* ── Keyboard navigation ────────────────────────────────────── */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  /* ── Slide renderer ─────────────────────────────────────────── */

  const current = slides[currentIndex];
  if (!current) return null;

  const activeChapter = getActiveChapter(current);

  function renderSlide(slide: Slide) {
    switch (slide.type) {
      case 'hero':
        return <SlideHero className="h-full w-full" onStart={goNext} />;
      case 'intro':
        return <SlideIntro className="h-full w-full" />;
      case 'sommaire':
        return <SlideSommaire className="h-full w-full" onNavigate={navigate} />;
      case 'chapter':
        return <SlideChapter className="h-full w-full" number={slide.number} title={slide.title} />;
      case 'content':
        return (
          <SlideContent
            className="h-full w-full"
            slide={slide}
            activeChapter={activeChapter}
            onNavigate={navigate}
          />
        );
    }
  }

  return (
    // WHY: relative + overflow-hidden on outer prevents layout overflow.
    // scale() only affects visual rendering, not layout — flex centering alone
    // causes horizontal scrollbars when viewport < 1280px wide.
    <div
      ref={wrapperRef}
      className={cn('relative h-screen w-screen overflow-hidden bg-black', className)}
    >
      {/* Fixed-size 16/9 slide — absolutely centered, scaled to fit */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${SLIDE_W}px`,
          height: `${SLIDE_H}px`,
          // WHY: translate(-50%,-50%) centers the layout box at the viewport center,
          // then scale() shrinks/grows it visually without affecting layout flow.
          transform: `translate(-50%, -50%) scale(${scale})`,
          overflow: 'hidden',
        }}
      >
        {/* Slide area */}
        <div
          className="absolute inset-0"
          style={{
            opacity: visible ? 1 : 0,
            // WHY: CSS transition synced with JS setTimeout (320ms) for smooth fade
            transition: 'opacity 300ms ease-in-out',
          }}
        >
          {renderSlide(current)}
        </div>

        {/* Nav controls — always visible at bottom */}
        <NavControls
          currentIndex={currentIndex}
          onPrev={goPrev}
          onNext={goNext}
          className="absolute right-0 bottom-0 left-0"
          style={{
            background: 'linear-gradient(to top, rgba(8,12,8,0.9) 0%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};
