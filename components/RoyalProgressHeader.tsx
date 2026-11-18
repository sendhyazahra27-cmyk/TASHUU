'use client';

import { Crown, List, Lock } from 'lucide-react';
import { CHAPTERS } from '@/lib/royal-content';
import { TOTAL_CHAPTERS, getProgressPercentage } from '@/lib/experience-logic';
import { useState } from 'react';

interface RoyalProgressHeaderProps {
  currentChapter: number;
  crownUnlocked: boolean;
  onSelectChapter: (chapter: number) => void;
  onOpenSecretLetter: () => void;
}

export default function RoyalProgressHeader({
  currentChapter,
  crownUnlocked,
  onSelectChapter,
  onOpenSecretLetter,
}: RoyalProgressHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentMeta = CHAPTERS[currentChapter - 1] ?? CHAPTERS[0];
  const progressPct = getProgressPercentage(currentChapter);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#D8B56D]/20 bg-[#10091F]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => onSelectChapter(1)}
            className="flex min-h-[44px] items-center gap-2 text-left text-sm font-semibold tracking-wide text-[#FFF5E9] transition-opacity hover:opacity-85 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8B56D]"
            aria-label="Tashu Royal Experience Home"
          >
            <Crown
              className={`h-4 w-4 text-[#D8B56D] ${
                crownUnlocked ? 'drop-shadow-[0_0_8px_rgba(216,181,109,0.85)]' : ''
              }`}
              aria-hidden="true"
            />
            <span className="font-royal-display text-sm sm:text-base text-[#FFF5E9]">
              Tashu
            </span>
          </button>

          {/* Zone 2: Chapter Progress & Crown Trail */}
          <div className="flex flex-1 items-center justify-center gap-3 overflow-hidden">
            <div className="hidden items-center gap-1.5 md:flex" role="navigation" aria-label="Chapter progress">
              {CHAPTERS.map((chap) => {
                const isActive = chap.id === currentChapter;
                const isVisited = chap.id < currentChapter;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => onSelectChapter(chap.id)}
                    aria-label={`Chapter ${chap.id}: ${chap.royalTitle}`}
                    aria-current={isActive ? 'step' : undefined}
                    title={`${chap.id}. ${chap.royalTitle}`}
                    className={`group flex min-h-[44px] min-w-[32px] items-center justify-center rounded-md px-1 transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D8B56D]`}
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-6 bg-[#D8B56D] shadow-[0_0_10px_rgba(216,181,109,0.8)]'
                          : isVisited
                            ? 'w-2.5 bg-[#D8B56D]/65 group-hover:bg-[#D8B56D]'
                            : 'w-2 bg-[#FFF5E9]/25 group-hover:bg-[#FFF5E9]/50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#FFF5E9]/80 truncate">
              <span className="tabular-nums font-medium text-[#D8B56D] whitespace-nowrap shrink-0">
                {String(currentChapter).padStart(2, '0')} / {String(TOTAL_CHAPTERS).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="text-[#D8B56D]/50">
                ·
              </span>
              <span className="truncate font-royal-serif text-xs sm:text-sm text-[#FFF5E9]/90">
                {currentMeta.shortTitle}
              </span>
            </div>
          </div>

          {/* Zone 3: Secret Love Letter + Chapter Index Drawer Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSecretLetter}
              aria-label="Open Secret Love Letter"
              title="Secret Love Letter"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg border border-[#D8B56D]/35 bg-[#42172D]/60 px-2.5 text-xs font-medium text-[#F3D999] transition-colors hover:border-[#D8B56D] hover:bg-[#42172D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D8B56D]"
            >
              <Lock className="h-3.5 w-3.5 text-[#D8B56D]" aria-hidden="true" />
              <span className="hidden lg:inline">Secret Letter</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Open chapters list"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg border border-[#D8B56D]/30 bg-[#241337]/60 px-2.5 sm:px-3 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D]/70 hover:bg-[#241337] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D8B56D]"
            >
              <List className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
              <span className="hidden sm:inline">Chapters</span>
            </button>
          </div>
        </div>

        {/* Thin Gold Progress Hairline */}
        <div className="h-[2px] w-full bg-[#241337]">
          <div
            className="h-full bg-gradient-to-r from-[#B98E3E] via-[#D8B56D] to-[#F2B8C6] transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* Chapter Drawer Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/65 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            aria-label="All 11 Royal Chapters"
            onClick={(e) => e.stopPropagation()}
            className="m-3 mt-16 w-full max-w-sm rounded-2xl border border-[#D8B56D]/35 bg-[#190D2B] p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-[#D8B56D]/20 pb-3">
              <div>
                <p className="text-xs text-[#D8B56D]">Royal Journey</p>
                <h2 className="font-royal-display text-base text-[#FFF5E9]">
                  Eleven Chapters for Tashu
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-xs text-[#FFF5E9]/75 hover:bg-[#241337] hover:text-[#FFF5E9]"
              >
                Close
              </button>
            </div>

            <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {CHAPTERS.map((chap) => {
                const active = chap.id === currentChapter;
                return (
                  <li key={chap.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectChapter(chap.id);
                        setMenuOpen(false);
                      }}
                      className={`flex min-h-[46px] w-full items-center justify-between rounded-xl px-3.5 py-2 text-left text-sm transition-colors ${
                        active
                          ? 'bg-[#D8B56D]/20 text-[#FFF5E9] border border-[#D8B56D]/50'
                          : 'text-[#FFF5E9]/80 hover:bg-[#241337]/80 hover:text-[#FFF5E9]'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="tabular-nums text-xs font-semibold text-[#D8B56D]">
                          {String(chap.id).padStart(2, '0')}
                        </span>
                        <span className="truncate">{chap.royalTitle}</span>
                      </span>
                      {active && (
                        <Crown className="h-3.5 w-3.5 shrink-0 text-[#D8B56D]" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 border-t border-[#D8B56D]/20 pt-3">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSecretLetter();
                }}
                className="flex min-h-[46px] w-full items-center justify-between rounded-xl border border-[#D8B56D]/40 bg-[#42172D]/60 px-3.5 py-2 text-left text-sm font-medium text-[#F3D999] transition-colors hover:border-[#D8B56D] hover:bg-[#42172D]"
              >
                <span className="flex items-center gap-2.5">
                  <Lock className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
                  <span>Secret Love Letter 🔐</span>
                </span>
                <span className="text-[11px] text-[#F2B8C6]">Private</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
