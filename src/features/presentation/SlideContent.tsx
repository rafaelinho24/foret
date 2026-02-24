// ═══════════════════════════════════════════════════════════════
// SlideContent — Left/right layout content slide
//
// WHAT: 25% left nav panel + 75% right content area. Renders any
//       ContentBlock type from slides.ts.
// WHEN: Reused for all 11 content slides (template component).
// CHANGE SPLIT: adjust the flex basis values on left/right divs below
// ADD BLOCK TYPE: add a new case to the renderBlock() function
// ═══════════════════════════════════════════════════════════════

import { type ContentBlock, type SlideContentData } from '@data/slides';
import { cn } from '@utils/cn';
import type React from 'react';

import { NavLeft } from './NavLeft';

export interface SlideContentProps {
  slide: SlideContentData;
  activeChapter: number | null;
  onNavigate: (index: number) => void;
  className?: string;
}

/* ─── Block renderers ───────────────────────────────────────── */

function BlockParagraph({ text }: { text: string }) {
  return (
    <p className="font-dm text-forest-cream/70 leading-relaxed" style={{ fontSize: '14px' }}>
      {text}
    </p>
  );
}

function BlockHighlight({ text }: { text: string }) {
  return (
    <p className="font-title text-forest-lime tracking-widest" style={{ fontSize: '22px' }}>
      {text.toUpperCase()}
    </p>
  );
}

function BlockQuote({ text }: { text: string }) {
  return (
    <blockquote className="border-forest-lime/60 border-l-2 pl-4">
      <p className="font-serif-display text-forest-cream/80 italic" style={{ fontSize: '16px' }}>
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
}

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="bg-forest-lime mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
            aria-hidden="true"
          />
          <span className="font-dm text-forest-cream/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="border-forest-lime/30 font-dm text-forest-cream/70 border px-3 py-1 text-xs tracking-wide"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BlockBlocks({ items }: { items: ReadonlyArray<{ title: string; text: string }> }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((block, i) => (
        <div key={i} className="border-forest-lime/30 border-l pl-4">
          <p className="font-dm text-forest-lime/80 mb-1 text-xs tracking-widest uppercase">
            {block.title}
          </p>
          <p className="font-dm text-forest-cream/65 text-sm leading-relaxed">{block.text}</p>
        </div>
      ))}
    </div>
  );
}

function BlockPartners({ items }: { items: ReadonlyArray<{ title: string; text: string }> }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((partner, i) => (
        <div key={i}>
          <p className="font-title text-forest-lime mb-1 text-sm tracking-widest">
            {partner.title.toUpperCase()}
          </p>
          <p className="font-dm text-forest-cream/65 text-sm leading-relaxed">{partner.text}</p>
        </div>
      ))}
    </div>
  );
}

function BlockActs({ items }: { items: ReadonlyArray<{ title: string; text: string }> }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((act, i) => (
        <div key={i} className="flex gap-4">
          <span
            className="font-title text-forest-lime/40 shrink-0 text-sm tracking-wider"
            style={{ minWidth: '20px' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-dm text-forest-lime/80 mb-0.5 text-xs tracking-widest uppercase">
              {act.title}
            </p>
            <p className="font-dm text-forest-cream/65 text-sm leading-relaxed">{act.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockCantons({ items }: { items: ReadonlyArray<{ name: string; text: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((canton, i) => (
        <div key={i} className="border-forest-cream/10 border p-3">
          <p className="font-title text-forest-lime mb-1 text-sm tracking-widest uppercase">
            {canton.name}
          </p>
          <p className="font-dm text-forest-cream/60 leading-relaxed" style={{ fontSize: '12px' }}>
            {canton.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function BlockPlaceholder({ text }: { text: string }) {
  return (
    <div className="border-forest-lime/20 border border-dashed px-4 py-3">
      <p className="font-dm text-forest-cream/30 text-xs tracking-wide italic">{text}</p>
    </div>
  );
}

function renderBlock(block: ContentBlock, index: number): React.ReactNode {
  switch (block.kind) {
    case 'paragraph':
      return <BlockParagraph key={index} text={block.text} />;
    case 'highlight':
      return <BlockHighlight key={index} text={block.text} />;
    case 'quote':
      return <BlockQuote key={index} text={block.text} />;
    case 'list':
      return <BlockList key={index} items={block.items} />;
    case 'tags':
      return <BlockTags key={index} items={block.items} />;
    case 'blocks':
      return <BlockBlocks key={index} items={block.items} />;
    case 'partners':
      return <BlockPartners key={index} items={block.items} />;
    case 'acts':
      return <BlockActs key={index} items={block.items} />;
    case 'cantons':
      return <BlockCantons key={index} items={block.items} />;
    case 'placeholder':
      return <BlockPlaceholder key={index} text={block.text} />;
  }
}

/* ─── Main component ─────────────────────────────────────────── */

/** Two-column content slide: left nav + right content area. */
export const SlideContent = ({
  slide,
  activeChapter,
  onNavigate,
  className,
}: SlideContentProps) => {
  return (
    <div
      className={cn('relative flex h-full w-full overflow-hidden', className)}
      style={{ background: '#0d140d' }}
    >
      {/* ── Left panel — chapter nav (25%) ────────────────── */}
      <div
        className="border-forest-cream/10 shrink-0 border-r"
        style={{ width: '25%', background: 'rgba(8,12,8,0.6)' }}
      >
        <NavLeft activeChapter={activeChapter} onNavigate={onNavigate} />
      </div>

      {/* Vertical separator accent */}
      <div
        className="bg-forest-lime/5 absolute top-8 bottom-8 w-px"
        style={{ left: '25%' }}
        aria-hidden="true"
      />

      {/* ── Right panel — content (75%) ─────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col justify-center overflow-y-auto px-12 py-10">
        {/* Chapter eyebrow */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-title text-forest-lime/50 text-xs tracking-[0.3em]">
            {String(slide.chapter).padStart(2, '0')}
          </span>
          <span className="bg-forest-cream/10 h-px flex-1" aria-hidden="true" />
        </div>

        {/* Slide title */}
        <h2
          className="font-title text-forest-cream mb-8 leading-tight tracking-wide"
          style={{ fontSize: '32px' }}
        >
          {slide.title}
        </h2>

        {/* Content blocks */}
        <div className="flex flex-col gap-5">
          {slide.content.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </div>
  );
};
