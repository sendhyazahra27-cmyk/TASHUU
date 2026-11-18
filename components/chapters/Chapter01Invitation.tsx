'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Heart, Lock, Sparkles } from 'lucide-react';
import { CORE_MESSAGE, INVITATION_COPY } from '@/lib/royal-content';

interface Chapter01InvitationProps {
  crownUnlocked: boolean;
  onUnlockCrown: () => void;
  onOpenSecretLetter: () => void;
}

export default function Chapter01Invitation({
  crownUnlocked,
  onUnlockCrown,
  onOpenSecretLetter,
}: Chapter01InvitationProps) {
  const [opening, setOpening] = useState(false);

  const handleAcceptCrown = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      onUnlockCrown();
    }, 1150);
  };

  return (
    <section
      aria-labelledby="chapter-1-heading"
      className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center py-1 sm:py-2"
    >
      {/* Floating Animated Crown */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: opening ? -12 : 0,
          scale: opening ? 1.18 : 1,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3.5 flex flex-col items-center text-center sm:mb-4"
      >
        <div className="animate-crown-pulse relative flex h-14 w-14 items-center justify-center rounded-full border border-[#D8B56D]/45 bg-[#241337]/80 shadow-[0_0_32px_rgba(216,181,109,0.28)] sm:h-15 sm:w-15">
          <Crown className="h-7 w-7 text-[#D8B56D]" aria-hidden="true" />
          <AnimatePresence>
            {opening && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#F3D999]/80"
              />
            )}
          </AnimatePresence>
        </div>

        <p className="mt-3 text-xs font-medium tracking-[0.22em] text-[#D8B56D]">
          {INVITATION_COPY.prelude}
        </p>
      </motion.div>

      {/* Luxury Royal Envelope Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="royal-glass relative w-full overflow-hidden rounded-3xl p-5 sm:p-8"
      >
        {/* Top Envelope Flap Visual */}
        <motion.div
          animate={{
            rotateX: opening ? 165 : 0,
            opacity: opening ? 0.35 : 0.95,
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none relative mx-auto mb-4 flex h-12 max-w-md items-end justify-center pb-1.5 sm:mb-5"
          style={{ transformOrigin: 'top center' }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-t-xl border-t border-x border-[#D8B56D]/25 bg-gradient-to-b from-[#42172D]/55 via-[#241337]/35 to-transparent"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 88%)' }}
          />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#F3D999]/75 bg-gradient-to-br from-[#D8B56D] to-[#9B7228] text-[#10091F] shadow-[0_0_22px_rgba(216,181,109,0.5)]">
            <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Royal Salutation */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="space-y-1">
            {INVITATION_COPY.salutationLines.slice(0, 3).map((line) => (
              <p
                key={line}
                className="font-royal-display text-sm tracking-[0.18em] text-[#F2B8C6] sm:text-base"
              >
                {line}
              </p>
            ))}
          </div>

          <h1
            id="chapter-1-heading"
            className="gold-shimmer-text font-royal-display mt-2.5 text-4xl font-bold tracking-[0.16em] sm:text-5xl"
          >
            {INVITATION_COPY.salutationLines[3]}
          </h1>

          <div className="mx-auto my-4 h-px w-32 bg-gradient-to-r from-transparent via-[#D8B56D]/75 to-transparent sm:my-5" />

          <p className="font-royal-serif mx-auto max-w-xl text-base leading-relaxed text-[#FFF5E9]/95 sm:text-lg">
            {INVITATION_COPY.body}
          </p>

          <p className="mx-auto mt-3.5 max-w-xl text-xs leading-relaxed text-[#D8B56D]/90 sm:text-sm">
            &ldquo;{CORE_MESSAGE}&rdquo;
          </p>

          {/* Sparkle Burst Feedback when Opening */}
          <AnimatePresence>
            {opening && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#F3D999]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Crowning My Princess Tashu...</span>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary CTA */}
          <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-6">
            <button
              type="button"
              onClick={handleAcceptCrown}
              disabled={opening}
              className="gold-btn flex min-h-[50px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-semibold tracking-wider text-[#1A0D29] transition-transform active:scale-[0.98] whitespace-nowrap sm:px-8 sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF5E9]"
            >
              <span>{INVITATION_COPY.cta}</span>
            </button>

            <button
              type="button"
              onClick={onOpenSecretLetter}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/40 bg-[#190D2B]/75 px-5 py-2 text-xs font-medium tracking-wider text-[#F3D999] transition-colors hover:border-[#D8B56D] hover:bg-[#241337] whitespace-nowrap sm:text-sm"
            >
              <Lock className="h-3.5 w-3.5 text-[#D8B56D]" aria-hidden="true" />
              <span>Secret Love Letter 🔐</span>
            </button>

            <p className="text-xs text-[#FFF5E9]/60">
              {crownUnlocked
                ? 'Crown Unlocked · Dedicated with Love by Bilal'
                : '18 November · National Princess Day Surprise'}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
