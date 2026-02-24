/* ═══════════════════════════════════════════════════════════════
   PRESENTATION TYPES — Le Dernier Forestier
   Shared types for the presentation feature.
   ═══════════════════════════════════════════════════════════════ */

/** Props shared by every slide component */
export interface SlideProps {
  /** Zero-based index of the current slide — used for animations */
  slideIndex: number;
  /** Callback to navigate to a specific slide by index */
  onNavigate: (index: number) => void;
}
