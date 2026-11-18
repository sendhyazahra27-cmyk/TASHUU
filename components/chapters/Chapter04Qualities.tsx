'use client';

import { Crown, Feather, Heart } from 'lucide-react';
import { EIGHT_URDU_SHAYARIS } from '@/lib/royal-content';
import { getScrollRevealDelay } from '@/lib/experience-logic';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';
import RoyalScrollReveal from '@/components/RoyalScrollReveal';

interface Chapter04QualitiesProps {
  flippedIds: string[];
  onToggleFlip: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Chapter04Qualities({
  flippedIds,
  onToggleFlip,
  onPrev,
  onNext,
}: Chapter04QualitiesProps) {
  const discoveredCount = flippedIds.length;
  const totalCount = EIGHT_URDU_SHAYARIS.length;

  return (
    <section
      aria-labelledby="chapter-4-heading"
      className="mx-auto w-full max-w-7xl py-2 sm:py-6"
    >
      <div className="mb-6 text-center sm:mb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
          CHAPTER 04 · TAP EACH CARD TO REVEAL URDU SHAYARI
        </p>
        <h1
          id="chapter-4-heading"
          className="font-royal-display text-balance mt-2 text-2xl font-bold text-[#FFF5E9] sm:text-4xl"
        >
          MERI PRINCESS KE LIYE DIL KI SHAYARI
        </h1>

        <p className="mt-3 text-xs text-[#F2B8C6] sm:text-sm">
          <span className="tabular-nums font-semibold text-[#F3D999]">
            {discoveredCount} / {totalCount}
          </span>{' '}
          <span aria-hidden="true">·</span>{' '}
          <span>
            {discoveredCount === totalCount
              ? 'All 8 Urdu Shayaris Revealed With Love'
              : 'Tap any golden card to read the Urdu Shayari'}
          </span>
        </p>
      </div>

      {/* Responsive CSS Grid: 1-col mobile, 2-col tablet, 4-col desktop with uniform card geometry */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 xl:gap-6">
        {EIGHT_URDU_SHAYARIS.map((item, idx) => {
          const isFlipped = flippedIds.includes(item.id);
          return (
            <RoyalScrollReveal
              key={item.id}
              yOffset={16}
              delay={getScrollRevealDelay(idx % 4, 0.05, 0.16)}
              amount={0.08}
            >
            <button
              type="button"
              onClick={() => onToggleFlip(item.id)}
              aria-pressed={isFlipped}
              aria-label={`${item.label} — ${
                isFlipped ? 'Tap to show front' : 'Tap to reveal Urdu Shayari'
              }`}
              className="perspective-1200 group relative h-[245px] w-full text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B56D] sm:h-[265px] lg:h-[285px]"
            >
              <div
                className={`preserve-3d relative h-full w-full transition-transform duration-500 ease-out ${
                  isFlipped ? 'rotate-y-180' : 'rotate-y-0 group-hover:-translate-y-1'
                }`}
              >
                {/* Front Face (Royal Purple & Champagne Gold Seal) */}
                <div
                  aria-hidden={isFlipped}
                  className="backface-hidden rotate-y-0 absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#D8B56D]/60 bg-gradient-to-br from-[#2D1845] via-[#211033] to-[#160A24] p-5 shadow-[0_14px_36px_rgba(6,2,14,0.55),0_0_24px_rgba(216,181,109,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="tabular-nums text-xs font-semibold text-[#D8B56D]">
                      {item.number}
                    </span>
                    <Crown
                      className="h-4 w-4 text-[#D8B56D]/90"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="my-auto flex flex-col items-center py-2">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D8B56D]/45 bg-[#160A24]/80 text-[#D8B56D] shadow-[0_0_16px_rgba(216,181,109,0.2)]">
                      <Feather className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-royal-display text-lg font-bold tracking-[0.14em] text-[#F3D999] sm:text-xl">
                      {item.label}
                    </h2>
                    <p
                      dir="rtl"
                      lang="ur"
                      className="font-urdu mt-1 text-base text-[#F2B8C6]/90"
                    >
                      تشو کے نام
                    </p>
                  </div>

                  <span className="text-[11px] font-medium text-[#D8B56D]/85">
                    Tap to reveal Shayari →
                  </span>
                </div>

                {/* Back Face (Glowing Royal Purple & Gold Urdu Shayari) */}
                <div
                  aria-hidden={!isFlipped}
                  className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#D8B56D] bg-gradient-to-br from-[#2B1542] via-[#3A1632] to-[#190B2A] p-4 shadow-[0_16px_40px_rgba(6,2,14,0.65),0_0_28px_rgba(216,181,109,0.22)] sm:p-5 lg:px-4"
                >
                  <div className="flex items-center justify-between border-b border-[#D8B56D]/25 pb-2">
                    <span className="font-royal-display text-[11px] font-semibold tracking-[0.16em] text-[#D8B56D]">
                      {item.label}
                    </span>
                    <Heart
                      className="h-3.5 w-3.5 shrink-0 fill-[#F2B8C6] text-[#F2B8C6]"
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    dir="rtl"
                    lang="ur"
                    className="font-urdu my-auto flex flex-col items-center justify-center gap-2 text-center text-[18px] leading-[2.2] text-[#FFF5E9] sm:text-[18px] lg:text-[15px] xl:text-[16px]"
                  >
                    {item.urduLines.map((line, idx) => (
                      <p key={idx} className="text-balance">
                        {line}
                      </p>
                    ))}
                  </div>

                  <span className="text-[10px] font-medium text-[#D8B56D]/80">
                    Tap to flip back
                  </span>
                </div>
              </div>
            </button>
            </RoyalScrollReveal>
          );
        })}
      </div>

      {/* Bottom Dedication Line */}
      <RoyalScrollReveal yOffset={12} delay={0.08} amount={0.1}>
        <p className="font-royal-display mt-8 text-center text-xs font-semibold tracking-[0.16em] text-[#F3D999] sm:text-sm">
          MERI PRINCESS — HAR SHAYARI SIRF APKE NAAM ❤️
        </p>
      </RoyalScrollReveal>

      <RoyalNavigationFooter
        currentChapter={4}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Memory Gallery"
      />
    </section>
  );
}
