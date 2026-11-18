'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import type { GalleryPhoto } from '@/lib/photos';
import {
  addUniqueSelection,
  clampChapter,
  toggleStringSelection,
} from '@/lib/experience-logic';
import RoyalAmbientCanvas from '@/components/RoyalAmbientCanvas';
import RoyalProgressHeader from '@/components/RoyalProgressHeader';
import Chapter01Invitation from '@/components/chapters/Chapter01Invitation';
import Chapter02Proclamation from '@/components/chapters/Chapter02Proclamation';
import Chapter03MoodLifter from '@/components/chapters/Chapter03MoodLifter';
import Chapter04Qualities from '@/components/chapters/Chapter04Qualities';
import Chapter05Gallery from '@/components/chapters/Chapter05Gallery';
import Chapter06TreasureChest from '@/components/chapters/Chapter06TreasureChest';
import Chapter07ShayariMehfil from '@/components/chapters/Chapter07ShayariMehfil';
import Chapter08ForeverPromise from '@/components/chapters/Chapter08ForeverPromise';
import Chapter09RoyalFinale from '@/components/chapters/Chapter09RoyalFinale';
import Chapter10FutureTogether from '@/components/chapters/Chapter10FutureTogether';
import Chapter11PersonalWorld from '@/components/chapters/Chapter11PersonalWorld';
import SecretLoveLetter from '@/components/SecretLoveLetter';

interface RoyalExperienceShellProps {
  photos: GalleryPhoto[];
  initialChapter?: number;
}

export default function RoyalExperienceShell({
  photos,
  initialChapter = 1,
}: RoyalExperienceShellProps) {
  const [currentChapter, setCurrentChapter] = useState(() =>
    clampChapter(initialChapter)
  );
  const [crownUnlocked, setCrownUnlocked] = useState(initialChapter > 1);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [flippedQualityIds, setFlippedQualityIds] = useState<string[]>([]);
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<string[]>([]);
  const [wishMade, setWishMade] = useState(false);
  const [secretLetterOpen, setSecretLetterOpen] = useState(false);

  const navigateTo = (target: number) => {
    const next = clampChapter(target);
    setCurrentChapter(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.dataset.chapter = String(currentChapter);
  }, [currentChapter]);

  const handleUnlockCrown = () => {
    setCrownUnlocked(true);
    navigateTo(2);
  };

  const handleReplay = () => {
    setCrownUnlocked(false);
    setQuizCompleted(false);
    setFlippedQualityIds([]);
    setClaimedVoucherIds([]);
    setWishMade(false);
    navigateTo(1);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="royal-velvet-bg relative flex min-h-screen flex-col overflow-x-hidden">
      <RoyalAmbientCanvas
        intensity={currentChapter === 9 && wishMade ? 'celebration' : 'gentle'}
      />

      <RoyalProgressHeader
        currentChapter={currentChapter}
        crownUnlocked={crownUnlocked}
        onSelectChapter={navigateTo}
        onOpenSecretLetter={() => setSecretLetterOpen(true)}
      />

      <main
        className={`relative z-10 mx-auto flex w-full flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 ${
          currentChapter === 4 || currentChapter === 11
            ? 'max-w-7xl'
            : 'max-w-6xl'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentChapter === 1 && (
              <Chapter01Invitation
                crownUnlocked={crownUnlocked}
                onUnlockCrown={handleUnlockCrown}
                onOpenSecretLetter={() => setSecretLetterOpen(true)}
              />
            )}

            {currentChapter === 2 && (
              <Chapter02Proclamation
                onPrev={() => navigateTo(1)}
                onNext={() => navigateTo(3)}
              />
            )}

            {currentChapter === 3 && (
              <Chapter03MoodLifter
                quizCompleted={quizCompleted}
                onCompleteQuiz={() => setQuizCompleted(true)}
                onPrev={() => navigateTo(2)}
                onNext={() => navigateTo(4)}
              />
            )}

            {currentChapter === 4 && (
              <Chapter04Qualities
                flippedIds={flippedQualityIds}
                onToggleFlip={(id) =>
                  setFlippedQualityIds((prev) => toggleStringSelection(prev, id))
                }
                onPrev={() => navigateTo(3)}
                onNext={() => navigateTo(5)}
              />
            )}

            {currentChapter === 5 && (
              <Chapter05Gallery
                photos={photos}
                onPrev={() => navigateTo(4)}
                onNext={() => navigateTo(6)}
              />
            )}

            {currentChapter === 6 && (
              <Chapter06TreasureChest
                claimedIds={claimedVoucherIds}
                onClaimVoucher={(id) =>
                  setClaimedVoucherIds((prev) => addUniqueSelection(prev, id))
                }
                onPrev={() => navigateTo(5)}
                onNext={() => navigateTo(7)}
              />
            )}

            {currentChapter === 7 && (
              <Chapter07ShayariMehfil
                onPrev={() => navigateTo(6)}
                onNext={() => navigateTo(8)}
              />
            )}

            {currentChapter === 8 && (
              <Chapter08ForeverPromise
                onPrev={() => navigateTo(7)}
                onNext={() => navigateTo(9)}
              />
            )}

            {currentChapter === 9 && (
              <Chapter09RoyalFinale
                wishMade={wishMade}
                onMakeWish={() => setWishMade(true)}
                onPrev={() => navigateTo(8)}
                onNext={() => navigateTo(10)}
                onOpenSecretLetter={() => setSecretLetterOpen(true)}
                onReplay={handleReplay}
              />
            )}

            {currentChapter === 10 && (
              <Chapter10FutureTogether
                onPrev={() => navigateTo(9)}
                onNext={() => navigateTo(11)}
                onReturnToRoyalWorld={() => navigateTo(1)}
                onOpenSecretLetter={() => setSecretLetterOpen(true)}
              />
            )}

            {currentChapter === 11 && (
              <Chapter11PersonalWorld
                photos={photos}
                onPrev={() => navigateTo(10)}
                onReturnToRoyalWorld={() => navigateTo(1)}
                onOpenSecretLetter={() => setSecretLetterOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <SecretLoveLetter
        open={secretLetterOpen}
        onClose={() => setSecretLetterOpen(false)}
      />

      <footer className="relative z-10 border-t border-[#D8B56D]/15 py-5 text-center text-[11px] text-[#FFF5E9]/55">
        Dedicated to Tashu · 18 November · Created with Love by Bilal
      </footer>
    </div>
    </MotionConfig>
  );
}
