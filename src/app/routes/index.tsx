import RootLayout from '@app/layouts/RootLayout';
import { Spinner } from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/* ─── Lazy loading — each page is a separate chunk ─────────────
   Pattern: const PageName = lazy(() => import('@pages/PageName'))
   ──────────────────────────────────────────────────────────── */
// WHY: Presentation is outside RootLayout — full-screen experience, no Header/Footer
const PresentationPage = lazy(() => import('@pages/Presentation'));
const Playground = lazy(() => import('@pages/Playground'));
const NotFound = lazy(() => import('@pages/NotFound'));

/* ─── Loading fallback — dark, no white flash ─────────────────── */
function PageLoader() {
  return (
    <div className="bg-forest-black flex min-h-screen items-center justify-center">
      <Spinner size="sm" aria-label="Loading page" />
    </div>
  );
}

/* ─── Main router ─────────────────────────────────────────────── */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Presentation — no layout wrapper (full-screen, no Header/Footer) */}
        <Route path={ROUTES.HOME} element={<PresentationPage />} />

        {/* Playground — inside layout for dev convenience */}
        <Route element={<RootLayout />}>
          <Route path={ROUTES.PLAYGROUND} element={<Playground />} />
        </Route>

        {/* 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
