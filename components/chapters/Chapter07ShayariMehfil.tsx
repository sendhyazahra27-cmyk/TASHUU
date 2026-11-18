'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Feather, Sparkles } from 'lucide-react';
import { SHAYARI_COLLECTION } from '@/lib/royal-content';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';

interface Chapter07ShayariMehfilProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function Chapter07ShayariMehfil({
  onPrev,
  onNext,
}: Chapter07ShayariMehfilProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentPiece = SHAYARI_COLLECTION[selectedIndex];

  const handlePrevPiece = () => {
    setSelectedIndex((prev) =>
      (prev - 1 + SHAYARI_COLLECTION.length) % SHAYARI_COLLECTION.length
    );
  };

  const handleNextPiece = () => {
    setSelectedIndex((prev) => (prev + 1) % SHAYARI_COLLECTION.length);
  };

  return (
    <section
      aria-labelledby="chapter-7-heading"
      className="mx-auto w-full max-w-4xl py-2 sm:py-6"
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
          CHAPTER 07 · SHAYARI MEHFIL
        </p>
        <h1
          id="chapter-7-heading"
          className="font-royal-display text-balance mt-2 text-2xl font-bold text-[#FFF5E9] sm:text-4xl"
        >
          CHAND LAFZ MERI PRINCESS KE NAAM
        </h1>
        <p className="mt-2 text-xs text-[#F2B8C6]/90 sm:text-sm">
          Four original verses written from Bilal&apos;s heart for Tashu
        </p>
      </div>

      {/* Theme Selector Buttons */}
      <div
        role="tablist"
        aria-label="Poetry themes"
        className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center"
      >
        {SHAYARI_COLLECTION.map((piece, idx) => {
          const active = idx === selectedIndex;
          return (
            <button
              key={piece.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedIndex(idx)}
              className={`min-h-[44px] rounded-xl px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                active
                  ? 'gold-btn font-semibold text-[#1A0D29]'
                  : 'border border-[#D8B56D]/30 bg-[#241337]/70 text-[#FFF5E9]/85 hover:border-[#D8B56D]/65'
              }`}
            >
              {piece.theme}
            </button>
          );
        })}
      </div>

      {/* Central Parchment Poetry Card */}
      <div className="royal-parchment relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.article
            key={currentPiece.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-medium tracking-[0.18em] text-[#7A4E1D]">
              <Feather className="h-3.5 w-3.5 text-[#B98E3E]" aria-hidden="true" />
              <span>
                0{selectedIndex + 1} · {currentPiece.theme}
              </span>
            </div>

            <h2 className="font-royal-display text-xl font-bold text-[#42172D] sm:text-2xl">
              {currentPiece.title}
            </h2>

            <div className="mx-auto my-5 h-px w-28 bg-[#B98E3E]/45" />

            {/* Roman Urdu Stanzas */}
            <div className="space-y-5">
              {currentPiece.romanCouplets.map((stanza, idx) => (
                <p
                  key={idx}
                  className="font-royal-serif whitespace-pre-line text-base italic leading-relaxed text-[#2B1325] sm:text-lg"
                >
                  &ldquo;{stanza}&rdquo;
                </p>
              ))}
            </div>

            {/* Urdu Nastaliq Showcase */}
            <div className="mt-7 rounded-2xl border border-[#B98E3E]/40 bg-[#241337] px-5 py-6 text-[#F3D999] shadow-md">
              <div
                dir="rtl"
                lang="ur"
                className="font-urdu whitespace-pre-line text-lg sm:text-2xl"
              >
                {currentPiece.urduCouplet}
              </div>
            </div>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs font-medium text-[#7A4E1D]">
              <Sparkles className="h-3.5 w-3.5 text-[#B98E3E]" aria-hidden="true" />
              <span>{currentPiece.footnote}</span>
            </p>
          </motion.article>
        </AnimatePresence>

        {/* Couplet Navigation Inside Mehfil */}
        <div className="mt-7 flex items-center justify-between border-t border-[#B98E3E]/25 pt-4">
          <button
            type="button"
            onClick={handlePrevPiece}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#B98E3E]/45 bg-[#FFF5E9] px-4 text-xs font-semibold text-[#42172D] transition-colors hover:bg-[#F3E2C5]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous Verse</span>
          </button>

          <span className="tabular-nums text-xs font-medium text-[#7A4E1D]">
            {selectedIndex + 1} / {SHAYARI_COLLECTION.length}
          </span>

          <button
            type="button"
            onClick={handleNextPiece}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#B98E3E]/45 bg-[#FFF5E9] px-4 text-xs font-semibold text-[#42172D] transition-colors hover:bg-[#F3E2C5]"
          >
            <span>Next Verse</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <RoyalNavigationFooter
        currentChapter={7}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Dil Ki Dua"
      />
    </section>
  );
}
