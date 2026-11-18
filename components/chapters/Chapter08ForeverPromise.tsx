'use client';

import { motion } from 'motion/react';
import { Flower2, Heart } from 'lucide-react';
import { FOREVER_LETTER } from '@/lib/royal-content';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';
import RoyalScrollReveal from '@/components/RoyalScrollReveal';

interface Chapter08ForeverPromiseProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function Chapter08ForeverPromise({
  onPrev,
  onNext,
}: Chapter08ForeverPromiseProps) {
  return (
    <section
      aria-labelledby="chapter-8-heading"
      className="mx-auto w-full max-w-4xl py-2 sm:py-6"
    >
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="royal-parchment relative overflow-hidden rounded-3xl p-6 sm:p-12"
      >
        {/* Subtle Gold Floral Corners */}
        <Flower2
          aria-hidden="true"
          className="pointer-events-none absolute top-4 left-4 h-6 w-6 text-[#B98E3E]/55"
        />
        <Flower2
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-4 h-6 w-6 text-[#B98E3E]/55"
        />
        <Flower2
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 text-[#B98E3E]/55"
        />
        <Flower2
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 text-[#B98E3E]/55"
        />

        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-[#7A4E1D]">
              CHAPTER 08 · A HANDWRITTEN ROYAL LETTER
            </p>
            <h1
              id="chapter-8-heading"
              className="font-royal-display text-balance mt-2 text-2xl font-bold text-[#42172D] sm:text-3xl"
            >
              {FOREVER_LETTER.title}
            </h1>
            <div className="mx-auto my-5 h-px w-32 bg-gradient-to-r from-transparent via-[#B98E3E]/70 to-transparent" />
          </div>

          <p className="font-cursive text-3xl text-[#7A2044] sm:text-4xl">
            {FOREVER_LETTER.salutation}
          </p>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#2B1325]/95 sm:text-base">
            {FOREVER_LETTER.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Sacred Nikah Intention Highlight Box */}
          <RoyalScrollReveal yOffset={16} delay={0.08} amount={0.1}>
            <div className="mt-7 rounded-2xl border border-[#B98E3E]/55 bg-[#241337] p-6 text-[#FFF5E9] shadow-lg sm:p-7">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#D8B56D]">
                <Heart className="h-3.5 w-3.5 fill-current text-[#F2B8C6]" aria-hidden="true" />
                <span>DIL KI SACHAI AUR DUA</span>
              </div>
              <p className="font-royal-serif text-base leading-relaxed text-[#FFF5E9] sm:text-lg">
                {FOREVER_LETTER.nikahPromise}
              </p>
            </div>
          </RoyalScrollReveal>

          {/* Signature */}
          <RoyalScrollReveal yOffset={12} delay={0.1} amount={0.1}>
            <div className="mt-8 border-t border-[#B98E3E]/30 pt-5 text-right">
              <p className="font-royal-serif text-sm italic text-[#7A4E1D]">
                {FOREVER_LETTER.signatureLead}
              </p>
              <p className="font-cursive mt-1 text-3xl text-[#42172D] sm:text-4xl">
                {FOREVER_LETTER.signatureName}
              </p>
            </div>
          </RoyalScrollReveal>
        </div>
      </motion.article>

      <RoyalNavigationFooter
        currentChapter={8}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Royal Finale"
      />
    </section>
  );
}
