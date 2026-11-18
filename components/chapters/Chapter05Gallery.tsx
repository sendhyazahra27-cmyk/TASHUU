'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { GalleryPhoto } from '@/lib/photos';
import { getScrollRevealDelay, wrapGalleryIndex } from '@/lib/experience-logic';
import RoyalPhotoFrame from '@/components/RoyalPhotoFrame';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';

interface Chapter05GalleryProps {
  photos: GalleryPhoto[];
  onPrev: () => void;
  onNext: () => void;
}

export default function Chapter05Gallery({
  photos,
  onPrev,
  onNext,
}: Chapter05GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activePhoto =
    activeIndex !== null && photos.length > 0
      ? photos[wrapGalleryIndex(activeIndex, photos.length)]
      : null;

  const goPrevPhoto = () => {
    if (activeIndex === null || photos.length === 0) return;
    setActiveIndex((prev) =>
      prev === null ? null : wrapGalleryIndex(prev - 1, photos.length)
    );
  };

  const goNextPhoto = () => {
    if (activeIndex === null || photos.length === 0) return;
    setActiveIndex((prev) =>
      prev === null ? null : wrapGalleryIndex(prev + 1, photos.length)
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : wrapGalleryIndex(prev - 1, photos.length)
        );
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : wrapGalleryIndex(prev + 1, photos.length)
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, photos.length]);

  const lightboxNode = (
    <AnimatePresence>
      {activePhoto && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[#080410]/96 backdrop-blur-md"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta =
              (e.changedTouches[0]?.clientX ?? touchStartX.current) -
              touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) > 45) {
              if (delta > 0) goPrevPhoto();
              else goNextPhoto();
            }
          }}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="text-xs text-[#D8B56D]">
              <span className="tabular-nums font-semibold">
                {wrapGalleryIndex(activeIndex, photos.length) + 1} /{' '}
                {photos.length}
              </span>{' '}
              <span aria-hidden="true">·</span>{' '}
              <span className="text-[#FFF5E9]/85">{activePhoto.tag}</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close photo viewer"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#D8B56D]/45 bg-[#241337]/90 text-[#FFF5E9] transition-colors hover:bg-[#42172D]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Full-Resolution Contained Image Stage */}
          <div className="relative flex flex-1 items-center justify-center px-3 py-2 sm:px-14">
            <button
              type="button"
              onClick={goPrevPhoto}
              aria-label="Previous photograph"
              className="absolute left-2 z-20 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[#D8B56D]/45 bg-[#190D2B]/90 text-[#FFF5E9] shadow-lg transition-transform hover:border-[#D8B56D] active:scale-95 sm:left-5"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="relative h-full max-h-[70vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#D8B56D]/40 bg-[#10091F]">
              <RoyalPhotoFrame
                src={activePhoto.src}
                alt={activePhoto.alt}
                fit="contain"
                priority
                sizes="100vw"
              />
            </div>

            <button
              type="button"
              onClick={goNextPhoto}
              aria-label="Next photograph"
              className="absolute right-2 z-20 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[#D8B56D]/45 bg-[#190D2B]/90 text-[#FFF5E9] shadow-lg transition-transform hover:border-[#D8B56D] active:scale-95 sm:right-5"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Lightbox Caption Footer */}
          <div className="px-4 pb-6 pt-2 text-center sm:px-8">
            <p className="font-royal-serif mx-auto max-w-xl text-sm leading-relaxed text-[#FFF5E9] sm:text-base">
              &ldquo;{activePhoto.caption}&rdquo;
            </p>
            <p className="mt-1 text-[11px] text-[#D8B56D]/75">
              Swipe left or right on mobile · Use arrow keys on desktop
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      aria-labelledby="chapter-5-heading"
      className="mx-auto w-full max-w-6xl py-2 sm:py-6"
    >
      <div className="mb-7 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
          CHAPTER 05 · ROYAL PHOTOGRAPHIC ALBUM
        </p>
        <h1
          id="chapter-5-heading"
          className="font-royal-display text-balance mt-2 text-2xl font-bold text-[#FFF5E9] sm:text-4xl"
        >
          MERI PRINCESS — MERI SAB SE HASEEN YAADEIN
        </h1>
        <p className="mt-2 text-xs text-[#F2B8C6]/90 sm:text-sm">
          <span className="tabular-nums font-semibold text-[#F3D999]">
            {photos.length}
          </span>{' '}
          Treasured Portraits <span aria-hidden="true">·</span> Tap any frame to
          view full size
        </p>
      </div>

      {/* Responsive Balanced Photo Album Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <motion.figure
            key={photo.id}
            data-scroll-reveal="true"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.5,
              delay: getScrollRevealDelay(index % 4, 0.04, 0.14),
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#D8B56D]/40 bg-[#1B0E2E]/90 shadow-[0_14px_34px_rgba(4,1,12,0.55)] transition-colors hover:border-[#D8B56D]/80"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open full view of ${photo.alt}`}
              className="relative aspect-[3/4] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B56D]"
            >
              <RoyalPhotoFrame
                src={photo.src}
                alt={photo.alt}
                fit="cover"
                priority={index < 4}
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10091F]/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"
              />
              <span
                aria-hidden="true"
                className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#D8B56D]/50 bg-[#10091F]/75 text-[#D8B56D] backdrop-blur-sm"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </span>
            </button>

            <figcaption className="flex flex-1 flex-col justify-between gap-1.5 p-3 sm:p-3.5">
              <span className="text-[11px] font-medium text-[#D8B56D]">
                {String(index + 1).padStart(2, '0')} · {photo.tag}
              </span>
              <p className="text-xs leading-relaxed text-[#FFF5E9]/90 sm:text-[13px]">
                {photo.caption}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {activeIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(lightboxNode, document.body)}

      <RoyalNavigationFooter
        currentChapter={5}
        onPrev={onPrev}
        onNext={onNext}
        nextLabel="Next: Treasure Chest"
      />
    </section>
  );
}
