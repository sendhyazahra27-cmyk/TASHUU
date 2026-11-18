'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { canGoNext, canGoPrev } from '@/lib/experience-logic';
import RoyalScrollReveal from '@/components/RoyalScrollReveal';

interface RoyalNavigationFooterProps {
  currentChapter: number;
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  helperText?: string;
}

export default function RoyalNavigationFooter({
  currentChapter,
  onPrev,
  onNext,
  nextLabel = 'Next Chapter',
  nextDisabled = false,
  helperText,
}: RoyalNavigationFooterProps) {
  const showPrev = canGoPrev(currentChapter);
  const showNext = canGoNext(currentChapter);

  if (!showPrev && !showNext) return null;

  return (
    <RoyalScrollReveal yOffset={12} duration={0.5} amount={0.08}>
      <div className="mt-8 border-t border-[#D8B56D]/20 pt-6 pb-safe">
        {helperText && (
          <p className="mb-3 text-center text-xs text-[#F2B8C6]/90">
            {helperText}
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          {showPrev ? (
            <button
              type="button"
              onClick={onPrev}
              className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-[#D8B56D]/35 bg-[#241337]/70 px-4 py-2.5 text-xs font-medium text-[#FFF5E9] transition-all hover:border-[#D8B56D]/70 hover:bg-[#241337] active:scale-[0.98] whitespace-nowrap shrink-0 sm:px-5 sm:text-sm focus-visible:outline-2 focus-visible:outline-[#D8B56D]"
            >
              <ArrowLeft className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {showNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 sm:px-6 sm:text-sm focus-visible:outline-2 focus-visible:outline-[#FFF5E9] ${
                nextDisabled
                  ? 'cursor-not-allowed border border-[#D8B56D]/20 bg-[#241337]/40 text-[#FFF5E9]/45'
                  : 'gold-btn text-[#1A0D29] active:scale-[0.98]'
              }`}
            >
              <span>{nextLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </RoyalScrollReveal>
  );
}
