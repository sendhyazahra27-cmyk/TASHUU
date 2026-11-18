'use client';

import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Crown,
  Heart,
  Lock,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { CORE_MESSAGE } from '@/lib/royal-content';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';

interface Chapter09RoyalFinaleProps {
  wishMade: boolean;
  onMakeWish: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenSecretLetter: () => void;
  onReplay: () => void;
}

const CELEBRATION_HEARTS = [
  { id: 1, left: '10%', delay: 0, size: 22 },
  { id: 2, left: '22%', delay: 0.25, size: 18 },
  { id: 3, left: '35%', delay: 0.1, size: 26 },
  { id: 4, left: '50%', delay: 0.35, size: 24 },
  { id: 5, left: '64%', delay: 0.15, size: 20 },
  { id: 6, left: '78%', delay: 0.3, size: 25 },
  { id: 7, left: '89%', delay: 0.05, size: 19 },
];

export default function Chapter09RoyalFinale({
  wishMade,
  onMakeWish,
  onPrev,
  onNext,
  onOpenSecretLetter,
  onReplay,
}: Chapter09RoyalFinaleProps) {
  return (
    <section
      aria-labelledby="chapter-9-heading"
      className="relative mx-auto w-full max-w-4xl py-2 sm:py-6"
    >
      {/* Fullscreen Heart & Star Celebration Overlay on Wish */}
      <AnimatePresence>
        {wishMade && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
          >
            {CELEBRATION_HEARTS.map((item) => (
              <motion.div
                key={item.id}
                initial={{ y: '100vh', opacity: 0, scale: 0.6 }}
                animate={{
                  y: '-15vh',
                  opacity: [0, 0.95, 0.9, 0],
                  scale: [0.7, 1.15, 1],
                }}
                transition={{
                  duration: 4.5,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                style={{ left: item.left }}
                className="absolute"
              >
                <Heart
                  style={{ width: item.size, height: item.size }}
                  className="fill-[#F2B8C6] text-[#F2B8C6] drop-shadow-[0_0_12px_rgba(242,184,198,0.75)]"
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="royal-glass relative overflow-hidden rounded-3xl p-6 text-center sm:p-12">
        {/* Decorative Floating Stars */}
        <div
          aria-hidden="true"
          className="mb-4 flex items-center justify-center gap-4 text-[#D8B56D]/80"
        >
          <Star className="h-4 w-4 fill-current" />
          <Sparkles className="h-5 w-5" />
          <Star className="h-4 w-4 fill-current" />
        </div>

        {/* Large Glowing Golden Crown */}
        <motion.div
          animate={{
            scale: wishMade ? [1, 1.12, 1.05] : 1,
          }}
          transition={{ duration: 0.8 }}
          className="animate-crown-pulse mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D8B56D]/70 bg-gradient-to-br from-[#42172D] via-[#241337] to-[#10091F] shadow-[0_0_45px_rgba(216,181,109,0.45)] sm:h-28 sm:w-28"
        >
          <Crown className="h-12 w-12 text-[#F3D999] sm:h-14 sm:w-14" aria-hidden="true" />
        </motion.div>

        <p className="text-xs font-medium tracking-[0.22em] text-[#D8B56D]">
          CHAPTER 09 · THE GRAND ROYAL FINALE
        </p>

        <h1
          id="chapter-9-heading"
          className="gold-shimmer-text font-royal-display text-balance mt-2 text-3xl font-bold sm:text-5xl"
        >
          HAPPY NATIONAL PRINCESS DAY, MERI JAAN!
        </h1>

        <div className="mx-auto my-6 h-px w-36 bg-gradient-to-r from-transparent via-[#D8B56D]/75 to-transparent" />

        <p className="font-royal-display text-lg tracking-[0.14em] text-[#F2B8C6] sm:text-xl">
          MERI PRINCESS TASHU
        </p>

        <p className="font-royal-serif mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#FFF5E9]/95 sm:text-lg">
          Ap meri zindagi ka woh khoobsurat hissa hain jiske liye main Allah ka
          shukar ada karta hoon.
        </p>

        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#D8B56D]/90 sm:text-sm">
          &ldquo;{CORE_MESSAGE}&rdquo;
        </p>

        {/* Interactive Wish & Crown Action */}
        {!wishMade ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onMakeWish}
              className="gold-btn flex min-h-[54px] items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-xs font-semibold tracking-wide text-[#1A0D29] transition-transform active:scale-[0.98] whitespace-nowrap sm:px-8 sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF5E9]"
            >
              <span>MAKE A WISH &amp; HOLD THE CROWN 👑</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mt-8 max-w-lg rounded-2xl border border-[#D8B56D] bg-gradient-to-br from-[#42172D]/85 via-[#241337]/95 to-[#10091F] p-6 shadow-[0_0_40px_rgba(216,181,109,0.28)] sm:p-8"
          >
            <Heart
              className="mx-auto mb-3 h-8 w-8 fill-[#F2B8C6] text-[#F2B8C6]"
              aria-hidden="true"
            />
            <p className="font-royal-display text-lg font-bold leading-relaxed text-[#F3D999] sm:text-2xl">
              HAPPY NATIONAL PRINCESS DAY MERI JAAN!
            </p>
            <p className="font-royal-display mt-4 text-sm tracking-[0.2em] text-[#FFF5E9] sm:text-base">
              ALWAYS YOURS,
              <br />
              BILAL 👑❤️
            </p>
          </motion.div>
        )}

        {/* Next Dreams + Secret Letter + Replay Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onNext}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/55 bg-[#241337]/90 px-5 py-2.5 text-xs font-medium text-[#F3D999] transition-colors hover:border-[#D8B56D] hover:bg-[#311A49] active:scale-[0.98] whitespace-nowrap sm:text-sm"
          >
            <Compass className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
            <span>Our Future Together 💍</span>
          </button>

          <button
            type="button"
            onClick={onOpenSecretLetter}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/55 bg-[#42172D]/75 px-5 py-2.5 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#561D3A] active:scale-[0.98] whitespace-nowrap sm:text-sm"
          >
            <Lock className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
            <span>Secret Love Letter 🔐</span>
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/35 bg-[#190D2B]/85 px-5 py-2.5 text-xs font-medium text-[#FFF5E9]/85 transition-colors hover:border-[#D8B56D] hover:bg-[#241337] active:scale-[0.98] whitespace-nowrap sm:text-sm"
          >
            <RotateCcw className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
            <span>Replay Surprise</span>
          </button>
        </div>
      </div>

      <RoyalNavigationFooter
        currentChapter={9}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Our Future"
      />
    </section>
  );
}
