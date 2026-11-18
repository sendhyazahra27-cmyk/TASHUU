'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Disc3,
  ExternalLink,
  Gift,
  Heart,
  Home,
  Lock,
  Music,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import type { GalleryPhoto } from '@/lib/photos';
import {
  TASHU_PERSONAL_WORLD,
  type PersonalFavouriteRevealItem,
  type TashuSong,
} from '@/lib/royal-content';
import {
  getScrollRevealDelay,
  getSongPlaybackMode,
  toggleStringSelection,
} from '@/lib/experience-logic';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';
import RoyalScrollReveal from '@/components/RoyalScrollReveal';
import bmwImg from '@/src/assets/images/car_bmw_luxury_1794986610632.jpg';
import spaghettiImg from '@/src/assets/images/fav_spaghetti_dining_1794986612662.jpg';
import mangoShakeImg from '@/src/assets/images/fav_mango_shake_1794986612731.jpg';
import islamabadImg from '@/src/assets/images/fav_islamabad_margalla_1794986612312.jpg';
import koreaTurkeyImg from '@/src/assets/images/fav_korea_turkey_1794986613388.jpg';

interface Chapter11PersonalWorldProps {
  photos: GalleryPhoto[];
  onPrev: () => void;
  onReturnToRoyalWorld: () => void;
  onOpenSecretLetter: () => void;
}

function getRevealPhoto(
  id: PersonalFavouriteRevealItem['id'],
  photos: GalleryPhoto[]
): StaticImageData | string | null {
  switch (id) {
    case 'food':
      return spaghettiImg;
    case 'drink':
      return mangoShakeImg;
    case 'place':
      return islamabadImg;
    case 'countries':
      return koreaTurkeyImg;
    case 'cars':
      return bmwImg;
    case 'habits':
      return photos[0]?.src ?? null;
    default:
      return null;
  }
}

export default function Chapter11PersonalWorld({
  photos,
  onPrev,
  onReturnToRoyalWorld,
  onOpenSecretLetter,
}: Chapter11PersonalWorldProps) {
  const [admiredHabitIds, setAdmiredHabitIds] = useState<string[]>([
    'listening',
  ]);
  const [flippedRevealIds, setFlippedRevealIds] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [unconfiguredSongId, setUnconfiguredSongId] = useState<string | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const allRevealed =
    flippedRevealIds.length === TASHU_PERSONAL_WORLD.reveals.length;

  const handleToggleAllReveals = () => {
    if (allRevealed) {
      setFlippedRevealIds([]);
    } else {
      setFlippedRevealIds(TASHU_PERSONAL_WORLD.reveals.map((r) => r.id));
    }
  };

  const handleSongAction = (track: TashuSong) => {
    const mode = getSongPlaybackMode(track);
    if (mode === 'audio' && track.audioSrc) {
      setUnconfiguredSongId(null);
      const audio = audioRef.current;
      if (!audio) return;
      if (playingSongId === track.id) {
        audio.pause();
        setPlayingSongId(null);
      } else {
        if (audio.dataset.trackId !== track.id) {
          audio.src = track.audioSrc;
          audio.dataset.trackId = track.id;
        }
        audio
          .play()
          .then(() => {
            setPlayingSongId(track.id);
          })
          .catch(() => {
            setPlayingSongId(null);
            setUnconfiguredSongId(track.id);
          });
      }
      return;
    }

    if (mode === 'unconfigured') {
      if (playingSongId && audioRef.current) {
        audioRef.current.pause();
        setPlayingSongId(null);
      }
      setUnconfiguredSongId((prev) => (prev === track.id ? null : track.id));
    }
  };

  return (
    <section
      aria-labelledby="chapter-11-heading"
      className="mx-auto w-full max-w-7xl py-2 sm:py-6"
    >
      {/* Hidden native audio element — only activated when Bilal supplies an audioSrc */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingSongId(null)}
        preload="none"
      />

      {/* Chapter Hero Header (Black, Navy Blue & Champagne Gold) */}
      <div className="mb-10 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[#D8B56D]">
          <Crown className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{TASHU_PERSONAL_WORLD.chapterBadge}</span>
        </p>

        <h1
          id="chapter-11-heading"
          className="gold-shimmer-text font-royal-display text-balance mt-3 text-3xl font-bold tracking-wide sm:text-5xl"
        >
          {TASHU_PERSONAL_WORLD.title}
        </h1>

        <p className="font-royal-display text-balance mt-3 text-xs tracking-[0.18em] text-[#F2B8C6] sm:text-sm">
          <span>HER FAVOURITES, HER DREAMS &amp; HER LITTLE WORLD</span>{' '}
          <span aria-hidden="true">❤️</span>
        </p>

        <div className="mx-auto mt-5 h-px w-36 bg-gradient-to-r from-transparent via-[#D8B56D]/75 to-transparent" />
      </div>

      {/* ====================================================================
          SECTION 3: THE LITTLE THINGS BILAL LOVES ABOUT TASHU
         ==================================================================== */}
      <RoyalScrollReveal yOffset={18} amount={0.08} className="mb-12">
      <div className="rounded-3xl border border-[#D8B56D]/35 bg-gradient-to-br from-[#0F1B38]/90 via-[#1B1033]/90 to-[#2F1229]/90 p-6 shadow-[0_24px_60px_rgba(4,5,14,0.6)] sm:p-8 lg:p-10">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
            03 · REAL HABITS CLOSE TO HEART
          </p>
          <h2 className="font-royal-display text-balance mt-1 text-2xl font-bold text-[#FFF5E9] sm:text-3xl">
            {TASHU_PERSONAL_WORLD.habits.heading}
          </h2>
          <p className="mt-2 text-xs text-[#F2B8C6]">
            Tap each habit ·{' '}
            <span className="tabular-nums font-semibold text-[#F3D999]">
              {admiredHabitIds.length} /{' '}
              {TASHU_PERSONAL_WORLD.habits.items.length}
            </span>{' '}
            cherished
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {TASHU_PERSONAL_WORLD.habits.items.map((habit) => {
            const active = admiredHabitIds.includes(habit.id);
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() =>
                  setAdmiredHabitIds((prev) =>
                    toggleStringSelection(prev, habit.id)
                  )
                }
                aria-pressed={active}
                className={`flex min-h-[76px] w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors ${
                  active
                    ? 'border-[#D8B56D] bg-[#0B0E1D]/90'
                    : 'border-[#D8B56D]/25 bg-[#090B15]/60 hover:border-[#D8B56D]/60'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    active
                      ? 'border-[#F2B8C6] bg-[#42172D] text-[#F2B8C6]'
                      : 'border-[#D8B56D]/40 bg-[#121B36] text-[#D8B56D]'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${active ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-royal-serif text-base font-semibold text-[#FFF5E9]">
                    {habit.title}
                  </p>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 overflow-hidden text-xs leading-relaxed text-[#F2B8C6] sm:text-sm"
                      >
                        {habit.reaction}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>

        <RoyalScrollReveal yOffset={12} delay={0.08} amount={0.1}>
          <div className="mt-7 rounded-2xl border border-[#D8B56D]/30 bg-[#080A14]/75 p-6 text-center sm:p-8">
            <p className="font-royal-serif mx-auto max-w-3xl text-sm leading-relaxed text-[#FFF5E9]/95 sm:text-base">
              &ldquo;{TASHU_PERSONAL_WORLD.habits.quote}&rdquo;
            </p>
          </div>
        </RoyalScrollReveal>
      </div>
      </RoyalScrollReveal>

      {/* ====================================================================
          SECTION 4: HER FAVOURITE SONGS 🎵 (Honest Album Playlist)
         ==================================================================== */}
      <div className="mb-12">
        <RoyalScrollReveal yOffset={16} amount={0.12}>
          <div className="mb-6 text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
              04 · HER FAVOURITE SONGS 🎵
            </p>
            <h2 className="font-royal-display mt-1 text-2xl font-bold text-[#FFF5E9] sm:text-3xl">
              Melodies That Remind Bilal of Tashu
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs text-[#FFF5E9]/75 sm:text-sm">
              Har woh geet jo Apki yaad aur Apki muskurahat se juda hai.
            </p>
          </div>
        </RoyalScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TASHU_PERSONAL_WORLD.songs.map((track, idx) => {
            const mode = getSongPlaybackMode(track);
            const isPlaying = playingSongId === track.id;
            const showUnconfigured = unconfiguredSongId === track.id;

            return (
              <RoyalScrollReveal
                key={track.id}
                yOffset={16}
                delay={getScrollRevealDelay(idx % 4, 0.05, 0.16)}
                amount={0.08}
                className="flex"
              >
              <div
                className="flex w-full flex-col justify-between rounded-2xl border border-[#D8B56D]/35 bg-gradient-to-br from-[#080910] via-[#0E1A36] to-[#140E29] p-5 shadow-[0_14px_34px_rgba(4,5,14,0.55)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="tabular-nums text-xs font-semibold text-[#D8B56D]">
                      TRACK {track.number}
                    </span>
                    <Disc3
                      className={`h-5 w-5 text-[#D8B56D]/85 ${
                        isPlaying ? 'animate-spin' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Album-style Navy & Black Cover Box */}
                  <div className="mt-4 flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D8B56D]/45 bg-gradient-to-br from-[#06070B] via-[#122654] to-[#241337] text-[#F3D999] shadow-inner">
                      <Music className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-royal-display text-sm font-bold leading-snug text-[#FFF5E9] sm:text-base">
                        {track.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-[#F2B8C6]/85">
                        {mode === 'audio'
                          ? isPlaying
                            ? 'Playing licensed track'
                            : 'Ready to play'
                          : mode === 'external'
                            ? 'Official link ready'
                            : 'Playlist entry · Audio not added'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  {mode === 'external' && track.officialUrl ? (
                    <a
                      href={track.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/45 bg-[#0A0F20] px-4 py-2 text-xs font-medium text-[#F3D999] transition-colors hover:border-[#D8B56D] hover:bg-[#131E3D]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Open Official Track</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSongAction(track)}
                      aria-label={
                        isPlaying
                          ? `Pause ${track.title}`
                          : `Play ${track.title}`
                      }
                      className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                        isPlaying
                          ? 'gold-btn text-[#1A0D29]'
                          : 'border border-[#D8B56D]/40 bg-[#0A0F20] text-[#FFF5E9] hover:border-[#D8B56D] hover:bg-[#121C3A]'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Pause Track</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 text-[#D8B56D]" aria-hidden="true" />
                          <span>Play Song</span>
                        </>
                      )}
                    </button>
                  )}

                  {showUnconfigured && (
                    <p
                      role="status"
                      className="mt-2.5 text-center text-[11px] leading-relaxed text-[#F2B8C6]"
                    >
                      Audio file not configured yet — Bilal can attach a licensed
                      audio file or official music link later.
                    </p>
                  )}
                </div>
              </div>
              </RoyalScrollReveal>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          SECTION 5: INTERACTIVE FAVOURITES REVEAL (8 Golden Flip Cards)
         ==================================================================== */}
      <div className="mb-12">
        <RoyalScrollReveal yOffset={16} amount={0.12}>
          <div className="mb-6 text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
              05 · INTERACTIVE FAVOURITES REVEAL
            </p>
            <h2 className="font-royal-display mt-1 text-2xl font-bold text-[#FFF5E9] sm:text-3xl">
              Unwrap Tashu&apos;s 8 Little Treasures
            </h2>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs text-[#F2B8C6] sm:text-sm">
                <strong className="tabular-nums text-[#F3D999]">
                  {flippedRevealIds.length} /{' '}
                  {TASHU_PERSONAL_WORLD.reveals.length}
                </strong>{' '}
                boxes opened
              </span>
              <button
                type="button"
                onClick={handleToggleAllReveals}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#D8B56D]/45 bg-[#0F1B38]/90 px-4 py-2 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#172852]"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#D8B56D]" aria-hidden="true" />
                <span>
                  {allRevealed ? 'Close All Boxes' : 'Reveal All 8 Favourites'}
                </span>
              </button>
            </div>
          </div>
        </RoyalScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {TASHU_PERSONAL_WORLD.reveals.map((item, idx) => {
            const isFlipped = flippedRevealIds.includes(item.id);
            const revealPhoto = getRevealPhoto(item.id, photos);
            const photoFailed = Boolean(failedImages[`reveal-${item.id}`]);

            return (
              <RoyalScrollReveal
                key={item.id}
                yOffset={16}
                delay={getScrollRevealDelay(idx % 4, 0.05, 0.16)}
                amount={0.08}
              >
              <button
                type="button"
                onClick={() =>
                  setFlippedRevealIds((prev) =>
                    toggleStringSelection(prev, item.id)
                  )
                }
                aria-pressed={isFlipped}
                aria-label={`${item.category} — ${
                  isFlipped ? 'Tap to wrap box' : 'Tap to unwrap favourite'
                }`}
                className="perspective-1200 group relative h-[295px] w-full text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B56D] sm:h-[310px]"
              >
                <div
                  className={`preserve-3d relative h-full w-full transition-transform duration-500 ease-out ${
                    isFlipped
                      ? 'rotate-y-180'
                      : 'rotate-y-0 group-hover:-translate-y-1'
                  }`}
                >
                  {/* Front Face: Golden Gift Box */}
                  <div
                    aria-hidden={isFlipped}
                    className="backface-hidden rotate-y-0 absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#D8B56D]/60 bg-gradient-to-br from-[#0A0C16] via-[#101E3F] to-[#241337] p-5 shadow-[0_16px_38px_rgba(4,5,14,0.6)]"
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

                    <div className="my-auto flex flex-col items-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F3D999]/60 bg-gradient-to-br from-[#D8B56D] via-[#F1D38E] to-[#9B7228] text-[#1A0D29] shadow-[0_0_24px_rgba(216,181,109,0.4)]">
                        <Gift className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-royal-display text-lg font-bold text-[#F3D999]">
                        {item.category}
                      </h3>
                    </div>

                    <span className="text-[11px] font-medium text-[#D8B56D]/85">
                      Tap to open golden box →
                    </span>
                  </div>

                  {/* Back Face: Photography / Swatch + Answer + Roman Urdu Caption */}
                  <div
                    aria-hidden={!isFlipped}
                    className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D8B56D] bg-gradient-to-b from-[#090B14] via-[#0F1B38] to-[#1E102F] p-4 shadow-[0_18px_42px_rgba(4,5,14,0.72)]"
                  >
                    {/* Visual Header inside Back Face */}
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-[#D8B56D]/30 bg-[#070912]">
                      {revealPhoto && !photoFailed ? (
                        <Image
                          src={revealPhoto}
                          alt={item.answer}
                          fill
                          referrerPolicy="no-referrer"
                          sizes="(max-width: 768px) 90vw, 280px"
                          className="object-cover"
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [`reveal-${item.id}`]: true,
                            }))
                          }
                        />
                      ) : item.id === 'colour' ? (
                        <div className="flex h-full w-full">
                          <div className="flex flex-1 flex-col items-center justify-center bg-[#050608] text-[11px] font-semibold tracking-wider text-[#FFF5E9]">
                            BLACK
                          </div>
                          <div className="flex flex-1 flex-col items-center justify-center bg-[#0F2557] text-[11px] font-semibold tracking-wider text-[#FFF5E9]">
                            NAVY BLUE
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#07080F] via-[#122552] to-[#241337] text-[#F3D999]">
                          <Disc3 className="h-8 w-8" aria-hidden="true" />
                          <span className="text-[10px] tracking-[0.2em] text-[#D8B56D]">
                            TASHU&apos;S PLAYLIST
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="my-auto py-2">
                      <p className="text-[10px] font-semibold tracking-[0.16em] text-[#D8B56D]">
                        {item.category}
                      </p>
                      <p className="font-royal-display mt-1 text-sm font-bold leading-snug text-[#FFF5E9]">
                        {item.answer}
                      </p>
                      <p className="font-royal-serif mt-1.5 text-xs leading-relaxed text-[#F2B8C6]/95">
                        {item.romanCaption}
                      </p>
                    </div>

                    <span className="text-[10px] text-[#D8B56D]/75">
                      Tap to close box
                    </span>
                  </div>
                </div>
              </button>
              </RoyalScrollReveal>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          SECTION 6: SPECIAL MESSAGE
         ==================================================================== */}
      <motion.div
        data-scroll-reveal="true"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-[#D8B56D]/55 bg-gradient-to-br from-[#080912] via-[#0F1B3A] to-[#241337] p-6 text-center shadow-[0_26px_65px_rgba(4,5,14,0.72)] sm:p-10 md:p-12"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D8B56D]/60 bg-[#0B1226] text-[#F2B8C6] shadow-[0_0_26px_rgba(216,181,109,0.3)]">
          <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
        </div>

        <p className="text-xs font-medium tracking-[0.22em] text-[#D8B56D]">
          06 · SPECIAL MESSAGE FOR TASHU
        </p>

        <div className="mx-auto mt-5 max-w-3xl space-y-4">
          {TASHU_PERSONAL_WORLD.specialMessageParagraphs.map((para) => (
            <p
              key={para}
              className="font-royal-display text-sm leading-relaxed tracking-[0.12em] text-[#FFF5E9] sm:text-base"
            >
              {para}
            </p>
          ))}
        </div>

        <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-[#D8B56D]/75 to-transparent" />

        <p className="font-royal-display text-base font-bold tracking-[0.16em] text-[#F3D999] sm:text-xl">
          {TASHU_PERSONAL_WORLD.specialMessageSignature}
        </p>

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
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#D8B56D]/45 bg-[#0A0F20] px-6 py-3 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#131F40] whitespace-nowrap sm:text-sm"
          >
            <Home className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
            <span>Return to Royal World</span>
          </button>
        </div>
      </motion.div>

      <RoyalNavigationFooter
        currentChapter={11}
        onPrev={onPrev}
        onNext={() => {}}
      />
    </section>
  );
}
