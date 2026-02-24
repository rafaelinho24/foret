// ═══════════════════════════════════════════════════════════════
// Presentation page — Le Dernier Forestier
//
// WHAT: Page wrapper that renders the full-screen presentation deck.
//       No Header or Footer — this is a full-screen experience.
// WHEN: Served at "/" — the main entry point of the foret project.
// ═══════════════════════════════════════════════════════════════

import { SeoHead } from '@components/features/SeoHead';

import { Presentation } from '../features/presentation';

/** Full-screen presentation deck for "Le Dernier Forestier". */
export default function PresentationPage() {
  return (
    <>
      <SeoHead
        title="Le Dernier Forestier — Classe 2 × LAXARGANG"
        description="8 personnalités. 6 forêts. 6 savoirs. 1 gagnant. Série digitale YouTube produite par Classe 2 en co-production avec LAXARGANG."
      />
      <Presentation />
    </>
  );
}
