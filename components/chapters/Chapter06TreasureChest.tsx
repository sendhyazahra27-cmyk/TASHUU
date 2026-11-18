'use client';

import { motion } from 'motion/react';
import { Award, Check, Gift, Sparkles } from 'lucide-react';
import { PRINCESS_VOUCHERS } from '@/lib/royal-content';
import { getScrollRevealDelay } from '@/lib/experience-logic';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';

interface Chapter06TreasureChestProps {
  claimedIds: string[];
  onClaimVoucher: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Chapter06TreasureChest({
  claimedIds,
  onClaimVoucher,
  onPrev,
  onNext,
}: Chapter06TreasureChestProps) {
  const claimedCount = claimedIds.length;
  const totalVouchers = PRINCESS_VOUCHERS.length;

  return (
    <section
      aria-labelledby="chapter-6-heading"
      className="mx-auto w-full max-w-5xl py-2 sm:py-6"
    >
      <div className="mb-7 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D8B56D]/50 bg-[#241337]/90 shadow-[0_0_28px_rgba(216,181,109,0.25)]">
          <Gift className="h-7 w-7 text-[#D8B56D]" aria-hidden="true" />
        </div>
        <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
          CHAPTER 06 · ROYAL TREASURE CHEST
        </p>
        <h1
          id="chapter-6-heading"
          className="font-royal-display text-balance mt-2 text-2xl font-bold text-[#FFF5E9] sm:text-4xl"
        >
          TAP TO CLAIM YOUR PRINCESS TREATS
        </h1>

        <p className="mt-3 text-xs text-[#F2B8C6] sm:text-sm">
          <span className="tabular-nums font-semibold text-[#F3D999]">
            {claimedCount} / {totalVouchers}
          </span>{' '}
          <span aria-hidden="true">·</span>{' '}
          <span>
            {claimedCount === totalVouchers
              ? 'All Royal Vouchers Claimed With Love'
              : 'Tap each golden voucher to claim it'}
          </span>
        </p>
      </div>

      {/* 4 Luxury Golden Gift Vouchers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {PRINCESS_VOUCHERS.map((voucher, idx) => {
          const isClaimed = claimedIds.includes(voucher.id);
          return (
            <motion.button
              key={voucher.id}
              data-scroll-reveal="true"
              type="button"
              onClick={() => onClaimVoucher(voucher.id)}
              aria-pressed={isClaimed}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.55,
                delay: getScrollRevealDelay(idx % 2, 0.06, 0.14),
                ease: [0.16, 1, 0.3, 1],
              }}
              whileTap={{ scale: 0.985 }}
              className={`relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-all sm:p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B56D] ${
                isClaimed
                  ? 'border-[#D8B56D] bg-gradient-to-br from-[#2B1742] via-[#3A1934] to-[#1D0F2E] shadow-[0_14px_38px_rgba(216,181,109,0.22)]'
                  : 'border-[#D8B56D]/40 bg-[#1B0E2E]/85 hover:border-[#D8B56D]/80'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="tabular-nums text-[11px] font-medium tracking-[0.18em] text-[#D8B56D]">
                    {voucher.code}
                  </span>
                  <h2 className="font-royal-display mt-1 text-base font-bold text-[#FFF5E9] sm:text-lg">
                    {voucher.title}
                  </h2>
                  {voucher.subtitle && (
                    <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-[#F2B8C6]">
                      {voucher.subtitle}
                    </p>
                  )}
                </div>

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    isClaimed
                      ? 'border-[#D8B56D] bg-[#D8B56D] text-[#10091F]'
                      : 'border-[#D8B56D]/40 bg-[#241337] text-[#D8B56D]'
                  }`}
                >
                  {isClaimed ? (
                    <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                  ) : (
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </div>

              {/* Description */}
              <p className="my-4 text-sm leading-relaxed text-[#FFF5E9]/90">
                {voucher.description}
              </p>

              {/* Footer / Stamp */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#D8B56D]/20 pt-3">
                <span className="text-[11px] text-[#F2B8C6]/85">
                  {voucher.promiseNote}
                </span>

                {isClaimed ? (
                  <motion.span
                    initial={{ scale: 1.35, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="flex max-w-full items-center gap-1 rounded-md border border-[#F3D999] bg-[#D8B56D]/20 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#F3D999] shadow-[0_0_16px_rgba(216,181,109,0.45)]"
                  >
                    <Award className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{voucher.claimStamp ?? 'CLAIMED WITH LOVE'}</span>
                  </motion.span>
                ) : (
                  <span className="text-xs font-semibold text-[#D8B56D] whitespace-nowrap shrink-0">
                    Tap to Claim →
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <RoyalNavigationFooter
        currentChapter={6}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Shayari Mehfil"
      />
    </section>
  );
}
