'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Compass,
  Crown,
  Flame,
  Gem,
  Heart,
  Home,
  Lock,
  MapPin,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  FUTURE_JOURNEY_COPY,
  type FutureMilestone,
} from '@/lib/royal-content';
import { getScrollRevealDelay } from '@/lib/experience-logic';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';
import nikkahImg from '@/src/assets/images/future_nikkah_rings_1794984457779.jpg';
import umrahImg from '@/src/assets/images/future_first_umrah_1794984458090.jpg';
import makkahImg from '@/src/assets/images/future_makkah_journey_1794984458263.jpg';
import karbalaImg from '@/src/assets/images/future_karbala_ziyarat_1794984460298.jpg';

interface Chapter10FutureTogetherProps {
  onPrev: () => void;
  onNext: () => void;
  onReturnToRoyalWorld: () => void;
  onOpenSecretLetter: () => void;
}

const MILESTONE_IMAGES: Record<FutureMilestone['id'], StaticImageData> = {
  nikkah: nikkahImg,
  umrah: umrahImg,
  makkah: makkahImg,
  karbala: karbalaImg,
};

function renderMilestoneIcon(id: FutureMilestone['id'], className: string) {
  switch (id) {
    case 'nikkah':
      return <Gem className={className} aria-hidden="true" />;
    case 'umrah':
      return <Compass className={className} aria-hidden="true" />;
    case 'makkah':
      return <MapPin className={className} aria-hidden="true" />;
    case 'karbala':
      return <Flame className={className} aria-hidden="true" />;
  }
}

export default function Chapter10FutureTogether({
  onPrev,
  onNext,
  onReturnToRoyalWorld,
  onOpenSecretLetter,
}: Chapter10FutureTogetherProps) {
  const [openIds, setOpenIds] = useState<string[]>(['nikkah']);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const allExpanded = openIds.length === FUTURE_JOURNEY_COPY.milestones.length;

  const toggleMilestone = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (allExpanded) {
      setOpenIds([]);
    } else {
      setOpenIds(FUTURE_JOURNEY_COPY.milestones.map((m) => m.id));
    }
  };

  return (
    <section
      aria-labelledby="chapter-10-heading"
      className="mx-auto w-full max-w-4xl py-2 sm:py-6"
    >
      {/* Chapter Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#D8B56D]/35 bg-[#241337]/80 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
          <Crown className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{FUTURE_JOURNEY_COPY.chapterBadge}</span>
        </div>

        <h1
          id="chapter-10-heading"
          className="gold-shimmer-text font-royal-display text-balance mt-2 text-3xl font-bold tracking-wide sm:text-5xl"
        >
          {FUTURE_JOURNEY_COPY.title}
        </h1>

        <p className="font-royal-display mt-3 text-xs tracking-[0.18em] text-[#F2B8C6] sm:text-sm">
          {FUTURE_JOURNEY_COPY.subtitle}
        </p>

        <p className="font-royal-serif mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#FFF5E9]/90 sm:text-base">
          {FUTURE_JOURNEY_COPY.intro}
        </p>

        {/* Controls Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-xl border border-[#D8B56D]/25 bg-[#190D2B]/75 px-3.5 py-2 text-xs text-[#FFF5E9]/80">
            <strong className="text-[#D8B56D]">{openIds.length}</strong> /{' '}
            {FUTURE_JOURNEY_COPY.milestones.length} Dreams Opened
          </span>
          <button
            type="button"
            onClick={handleToggleAll}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/40 bg-[#241337]/80 px-4 py-2 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#2E1846]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D8B56D]" aria-hidden="true" />
            <span>{allExpanded ? 'Collapse Dreams' : 'Open All 4 Dreams'}</span>
          </button>
        </div>
      </div>

      {/* Connected Royal Timeline */}
      <div className="relative pl-9 sm:pl-12">
        {/* Vertical Golden Timeline Spine */}
        <div
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-3.5 w-px bg-gradient-to-b from-[#D8B56D]/80 via-[#F2B8C6]/50 to-[#D8B56D]/80 sm:left-5"
        />

        <div className="space-y-6 sm:space-y-8">
          {FUTURE_JOURNEY_COPY.milestones.map((milestone, idx) => {
            const isOpen = openIds.includes(milestone.id);
            const imgFailed = Boolean(failedImages[milestone.id]);
            const imageSrc = MILESTONE_IMAGES[milestone.id];

            return (
              <motion.article
                key={milestone.id}
                data-scroll-reveal="true"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: getScrollRevealDelay(idx, 0.05, 0.15),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Golden Timeline Node */}
                <div
                  aria-hidden="true"
                  className={`absolute top-5 -left-[38px] z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-[0_0_18px_rgba(216,181,109,0.45)] transition-colors sm:top-6 sm:-left-[48px] sm:h-10 sm:w-10 ${
                    isOpen
                      ? 'border-[#F3D999] bg-gradient-to-br from-[#D8B56D] to-[#9B7228] text-[#1A0D29]'
                      : 'border-[#D8B56D]/60 bg-[#190D2B] text-[#D8B56D]'
                  }`}
                >
                  {renderMilestoneIcon(milestone.id, 'h-4 w-4 sm:h-4.5 sm:w-4.5')}
                </div>

                {/* Milestone Luxury Card */}
                <div
                  className={`royal-glass overflow-hidden rounded-3xl transition-colors ${
                    isOpen ? 'border-[#D8B56D]/65' : 'border-[#D8B56D]/30'
                  }`}
                >
                  {/* Visual Destination Frame (16:9) */}
                  <div className="group relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#42172D] via-[#241337] to-[#10091F]">
                    {!imgFailed ? (
                      <Image
                        src={imageSrc}
                        alt={milestone.heading}
                        fill
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 768px) 100vw, 820px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [milestone.id]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#D8B56D]/85">
                        {renderMilestoneIcon(milestone.id, 'h-10 w-10')}
                        <span className="font-royal-display text-xs tracking-widest">
                          {milestone.locationBadge}
                        </span>
                      </div>
                    )}

                    {/* Luxury Gradient Vignette */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10091F] via-[#10091F]/30 to-transparent"
                    />

                    {/* Top Badge & Number */}
                    <div className="absolute top-3 right-3 left-3 flex flex-wrap items-center justify-between gap-2 sm:top-4 sm:right-5 sm:left-5">
                      <span className="rounded-lg border border-[#D8B56D]/45 bg-[#10091F]/80 px-3 py-1 text-[11px] font-medium tracking-wider text-[#F3D999] backdrop-blur-md">
                        {milestone.locationBadge}
                      </span>
                      <span className="rounded-lg border border-[#D8B56D]/45 bg-[#10091F]/80 px-2.5 py-1 text-[11px] font-bold tracking-widest text-[#D8B56D] backdrop-blur-md">
                        {milestone.number} / 04
                      </span>
                    </div>

                    {/* Bottom Milestone Title Strip */}
                    <div className="absolute right-4 bottom-3 left-4 sm:right-6 sm:bottom-4 sm:left-6">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#D8B56D] sm:text-xs">
                        {milestone.label}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Disclosure Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleMilestone(milestone.id)}
                    aria-expanded={isOpen}
                    className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#241337]/45 sm:px-7 sm:py-5"
                  >
                    <div className="min-w-0">
                      <h2 className="font-royal-display text-lg font-bold tracking-wide text-[#FFF5E9] sm:text-2xl">
                        {milestone.heading}
                      </h2>
                      <p className="mt-1 text-xs font-medium tracking-wider text-[#F2B8C6]/90">
                        {isOpen ? 'Tap to fold dream' : 'Tap to read Bilal’s dream'}
                      </p>
                    </div>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8B56D]/40 bg-[#190D2B]/90 text-[#D8B56D] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#D8B56D]/15' : ''
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </button>

                  {/* Expanded Message & Special Caption */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#D8B56D]/20 px-5 pt-4 pb-6 sm:px-7 sm:pb-7">
                          <p className="font-royal-serif text-sm leading-relaxed text-[#FFF5E9]/95 sm:text-base">
                            {milestone.message}
                          </p>

                          <div className="mt-5 rounded-2xl border border-[#D8B56D]/35 bg-gradient-to-r from-[#42172D]/55 via-[#241337]/75 to-[#42172D]/55 px-4 py-3 text-center">
                            <p className="font-royal-display text-xs font-semibold tracking-[0.16em] text-[#F3D999] sm:text-sm">
                              {milestone.caption}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Final Future Promise Section */}
      <motion.div
        data-scroll-reveal="true"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="royal-glass relative mt-10 overflow-hidden rounded-3xl p-6 text-center sm:p-10 md:p-12"
      >
        {/* Floating Stars & Heart Crest */}
        <div
          aria-hidden="true"
          className="mb-4 flex items-center justify-center gap-3 text-[#D8B56D]"
        >
          <Star className="h-4 w-4 fill-current" />
          <Sparkles className="h-5 w-5" />
          <Star className="h-4 w-4 fill-current" />
        </div>

        {/* 4 Connected Golden Milestone Icons */}
        <div
          aria-hidden="true"
          className="relative mx-auto mb-6 flex max-w-md items-center justify-between px-2"
        >
          <div className="absolute right-8 left-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#D8B56D]/40 via-[#F3D999] to-[#D8B56D]/40" />
          {FUTURE_JOURNEY_COPY.milestones.map((m) => (
            <div
              key={m.id}
              className="relative z-10 flex flex-col items-center gap-1.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8B56D]/70 bg-[#190D2B] text-[#F3D999] shadow-[0_0_18px_rgba(216,181,109,0.35)]">
                {renderMilestoneIcon(m.id, 'h-4 w-4')}
              </span>
              <span className="text-[10px] font-medium tracking-widest text-[#D8B56D]/85">
                {m.number}
              </span>
            </div>
          ))}
        </div>

        {/* Glowing Heart */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#F2B8C6]/50 bg-[#42172D]/70 shadow-[0_0_32px_rgba(242,184,198,0.45)]">
          <Heart
            className="h-8 w-8 fill-[#F2B8C6] text-[#F2B8C6]"
            aria-hidden="true"
          />
        </div>

        {/* Closing Prayer */}
        <div className="mx-auto max-w-xl space-y-1.5">
          {FUTURE_JOURNEY_COPY.closingPrayer.map((line, index) => {
            const isAmeen = index === FUTURE_JOURNEY_COPY.closingPrayer.length - 1;
            return (
              <p
                key={line}
                className={
                  isAmeen
                    ? 'gold-shimmer-text font-royal-display pt-3 text-base font-bold tracking-[0.18em] sm:text-xl'
                    : 'font-royal-display text-xs leading-relaxed tracking-[0.15em] text-[#FFF5E9]/95 sm:text-sm'
                }
              >
                {line}
              </p>
            );
          })}
        </div>

        <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-[#D8B56D]/70 to-transparent" />

        {/* Signature */}
        <p className="font-royal-serif text-sm tracking-wide text-[#F2B8C6] sm:text-base">
          {FUTURE_JOURNEY_COPY.closingSignatureLine1}
        </p>
        <p className="font-cursive mt-1 text-3xl text-[#F3D999] sm:text-4xl">
          {FUTURE_JOURNEY_COPY.closingSignatureLine2}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenSecretLetter}
            className="gold-btn flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-semibold tracking-wider text-[#1A0D29] transition-transform active:scale-[0.98] whitespace-nowrap sm:text-sm"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            <span>Unlock Secret Love Letter 🔐</span>
          </button>

          <button
            type="button"
            onClick={onReturnToRoyalWorld}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#D8B56D]/45 bg-[#190D2B]/90 px-6 py-3 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#241337] whitespace-nowrap sm:text-sm"
          >
            <Home className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
            <span>Return to Royal World</span>
          </button>
        </div>
      </motion.div>

      <RoyalNavigationFooter
        currentChapter={10}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Her World"
      />
    </section>
  );
}
