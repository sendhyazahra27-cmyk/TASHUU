'use client';

import { motion } from 'motion/react';
import { Crown, Feather } from 'lucide-react';
import { PROCLAMATION_COPY } from '@/lib/royal-content';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';
import RoyalScrollReveal from '@/components/RoyalScrollReveal';

interface Chapter02ProclamationProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function Chapter02Proclamation({
  onPrev,
  onNext,
}: Chapter02ProclamationProps) {
  return (
    <section
      aria-labelledby="chapter-2-heading"
      className="mx-auto w-full max-w-4xl py-2 sm:py-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="royal-parchment relative overflow-hidden rounded-3xl p-6 sm:p-10"
      >
        {/* Ornamental Gold Corner Accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 left-4 h-7 w-7 border-t-2 border-l-2 border-[#B98E3E]/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-4 h-7 w-7 border-t-2 border-r-2 border-[#B98E3E]/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 border-b-2 border-l-2 border-[#B98E3E]/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2 border-[#B98E3E]/70"
        />

        {/* Proclamation Header */}
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-medium tracking-[0.2em] text-[#7A4E1D]">
            <Crown className="h-4 w-4 text-[#B98E3E]" aria-hidden="true" />
            <span>{PROCLAMATION_COPY.dateBadge}</span>
          </div>

          <h1
            id="chapter-2-heading"
            className="font-royal-display text-balance text-2xl font-bold tracking-wide text-[#2B1325] sm:text-4xl"
          >
            {PROCLAMATION_COPY.title}
          </h1>

          <div className="mx-auto my-5 h-px w-36 bg-gradient-to-r from-transparent via-[#B98E3E]/75 to-transparent" />
        </div>

        {/* Main Declaration */}
        <RoyalScrollReveal yOffset={14} delay={0.08} amount={0.1}>
          <div className="mx-auto max-w-2xl space-y-5 text-center sm:text-left">
            <p className="font-royal-serif text-lg font-semibold leading-relaxed text-[#42172D] sm:text-xl">
              &ldquo;{PROCLAMATION_COPY.mainDeclaration}&rdquo;
            </p>

            {PROCLAMATION_COPY.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-sm leading-relaxed text-[#3B2133]/90 sm:text-base"
              >
                {para}
              </p>
            ))}
          </div>
        </RoyalScrollReveal>

        {/* Decorative Urdu & Roman Urdu Poetry Showcase */}
        <RoyalScrollReveal yOffset={18} delay={0.1} amount={0.1}>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#B98E3E]/45 bg-[#241337] p-6 text-center text-[#FFF5E9] shadow-lg sm:p-8">
            <div className="mb-3 flex items-center justify-center gap-2 text-xs tracking-[0.18em] text-[#D8B56D]">
              <Feather className="h-3.5 w-3.5" aria-hidden="true" />
              <span>ROYAL VERSE FOR TASHU</span>
            </div>

            <div
              dir="rtl"
              lang="ur"
              className="font-urdu space-y-2 text-xl text-[#F3D999] sm:text-2xl"
            >
              <p>{PROCLAMATION_COPY.urduScriptLine1}</p>
              <p>{PROCLAMATION_COPY.urduScriptLine2}</p>
            </div>

            <div className="mx-auto my-4 h-px w-24 bg-[#D8B56D]/40" />

            <p className="font-royal-serif whitespace-pre-line text-sm italic leading-relaxed text-[#FFF5E9]/90 sm:text-base">
              {PROCLAMATION_COPY.romanCouplet}
            </p>
          </div>
        </RoyalScrollReveal>
      </motion.div>

      <RoyalNavigationFooter
        currentChapter={2}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Mood Lifter"
      />
    </section>
  );
}
