'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Crown, Heart, Sparkles } from 'lucide-react';
import { computeDodgingOffset } from '@/lib/experience-logic';
import RoyalNavigationFooter from '@/components/RoyalNavigationFooter';

interface Chapter03MoodLifterProps {
  quizCompleted: boolean;
  onCompleteQuiz: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const CONFETTI_PIECES = [
  { id: 1, x: -120, y: -90, color: '#D8B56D' },
  { id: 2, x: -70, y: -120, color: '#F2B8C6' },
  { id: 3, x: 0, y: -135, color: '#FFF5E9' },
  { id: 4, x: 75, y: -115, color: '#D8B56D' },
  { id: 5, x: 125, y: -85, color: '#F2B8C6' },
  { id: 6, x: -95, y: -45, color: '#F3D999' },
  { id: 7, x: 95, y: -40, color: '#F3D999' },
];

export default function Chapter03MoodLifter({
  quizCompleted,
  onCompleteQuiz,
  onPrev,
  onNext,
}: Chapter03MoodLifterProps) {
  const [step, setStep] = useState<1 | 2 | 3>(quizCompleted ? 3 : 1);
  const [q1Answered, setQ1Answered] = useState(quizCompleted);
  const [q2Answered, setQ2Answered] = useState(quizCompleted);
  const [q3Choice, setQ3Choice] = useState<string | null>(
    quizCompleted ? 'Jee Bilkul ❤️' : null
  );
  const [dodgeAttempts, setDodgeAttempts] = useState(0);

  const dodgeOffset = computeDodgingOffset(dodgeAttempts, 92, 42);

  const triggerDodge = () => {
    setDodgeAttempts((prev) => prev + 1);
  };

  const handleQ3Select = (choice: string) => {
    setQ3Choice(choice);
    onCompleteQuiz();
  };

  return (
    <section
      aria-labelledby="chapter-3-heading"
      className="mx-auto w-full max-w-3xl py-2 sm:py-6"
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
          CHAPTER 03 · INTERACTIVE ROYAL QUIZ
        </p>
        <h1
          id="chapter-3-heading"
          className="font-royal-display mt-2 text-2xl font-bold text-[#FFF5E9] sm:text-4xl"
        >
          THE PRINCESS MOOD LIFTER
        </h1>
        <p className="mt-2 text-xs text-[#F2B8C6]/85 sm:text-sm">
          Question {step} of 3 · Sirf Apki muskurahat ke liye
        </p>
      </div>

      {/* Step Selector Tabs */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {([1, 2, 3] as const).map((qNum) => {
          const unlocked =
            qNum === 1 || (qNum === 2 && q1Answered) || (qNum === 3 && q2Answered);
          const active = step === qNum;
          return (
            <button
              key={qNum}
              type="button"
              disabled={!unlocked}
              onClick={() => unlocked && setStep(qNum)}
              className={`min-h-[44px] rounded-xl px-4 text-xs font-medium transition-all ${
                active
                  ? 'gold-btn font-semibold text-[#1A0D29]'
                  : unlocked
                    ? 'border border-[#D8B56D]/35 bg-[#241337]/70 text-[#FFF5E9] hover:border-[#D8B56D]'
                    : 'cursor-not-allowed border border-[#FFF5E9]/10 bg-[#190D2B]/50 text-[#FFF5E9]/35'
              }`}
            >
              Question 0{qNum}
            </button>
          );
        })}
      </div>

      <div className="royal-glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="quiz-q1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="font-royal-serif text-xl font-semibold text-[#FFF5E9] sm:text-2xl">
                Duniya ki sab se pyari aur khoobsurat Princess kaun hai?
              </h2>

              <div className="relative mt-8 flex min-h-[140px] flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <button
                  type="button"
                  onClick={() => setQ1Answered(true)}
                  className="gold-btn z-10 flex min-h-[50px] min-w-[200px] items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-[#1A0D29] transition-transform active:scale-[0.98]"
                >
                  <span>Ap — Tashu 👑</span>
                </button>

                <motion.button
                  type="button"
                  onMouseEnter={triggerDodge}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    triggerDodge();
                  }}
                  onClick={triggerDodge}
                  animate={{ x: dodgeOffset.x, y: dodgeOffset.y }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="min-h-[48px] min-w-[140px] rounded-2xl border border-[#FFF5E9]/25 bg-[#190D2B]/90 px-5 py-3 text-sm text-[#FFF5E9]/80 transition-colors hover:border-[#F2B8C6]/50"
                >
                  Koi Aur
                </motion.button>
              </div>

              {dodgeAttempts > 0 && !q1Answered && (
                <p className="mt-2 text-xs text-[#F2B8C6]">
                  Hehe! Yeh option Tashu ke samne tik hi nahi sakta 😉
                </p>
              )}

              {q1Answered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-2xl border border-[#D8B56D]/45 bg-[#241337]/80 p-4"
                >
                  <p className="flex items-center justify-center gap-2 text-sm font-medium text-[#F3D999] sm:text-base">
                    <CheckCircle2 className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
                    <span>Bilkul sahi! Meri duniya ki Queen sirf Ap hain ❤️</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-4 min-h-[44px] rounded-xl border border-[#D8B56D]/50 bg-[#D8B56D]/15 px-5 py-2 text-xs font-semibold text-[#FFF5E9] hover:bg-[#D8B56D]/25"
                  >
                    Next Question →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="quiz-q2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="font-royal-serif text-xl font-semibold text-[#FFF5E9] sm:text-2xl">
                Princess ko sab se zyada khush kaun rakhna chahta hai?
              </h2>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setQ2Answered(true)}
                  className="gold-btn flex min-h-[52px] min-w-[230px] items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-[#1A0D29] transition-transform active:scale-[0.98]"
                >
                  <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>Sirf Apka Bilal ❤️</span>
                </button>
              </div>

              {q2Answered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-[#F2B8C6]/40 bg-[#42172D]/50 p-5"
                >
                  <p className="font-royal-serif text-base text-[#FFF5E9]">
                    Hamesha! Meri Princess ki har muskurahat mere liye poori duniya ki khushi se badh kar hai ❤️
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="mt-4 min-h-[44px] rounded-xl border border-[#D8B56D]/50 bg-[#D8B56D]/15 px-5 py-2 text-xs font-semibold text-[#FFF5E9] hover:bg-[#D8B56D]/25"
                  >
                    Final Question →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="quiz-q3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative text-center"
            >
              <h2 className="font-royal-serif text-xl font-semibold text-[#FFF5E9] sm:text-2xl">
                Kya aj meri Princess thora sa smile karengi?
              </h2>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {['Jee Bilkul ❤️', 'Sirf Apke Liye 🥹'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleQ3Select(option)}
                    className={`min-h-[50px] min-w-[200px] rounded-2xl px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
                      q3Choice === option
                        ? 'gold-btn text-[#1A0D29]'
                        : 'border border-[#D8B56D]/45 bg-[#241337]/80 text-[#FFF5E9] hover:border-[#D8B56D]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {q3Choice && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative mt-7 rounded-2xl border border-[#D8B56D]/50 bg-[#241337]/85 p-5"
                >
                  {/* Confetti Burst */}
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 flex justify-center">
                    {CONFETTI_PIECES.map((piece) => (
                      <motion.span
                        key={piece.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                        animate={{
                          opacity: 0,
                          x: piece.x,
                          y: piece.y,
                          scale: 1.2,
                        }}
                        transition={{ duration: 1.1, ease: 'easeOut' }}
                        style={{ backgroundColor: piece.color }}
                        className="absolute h-2.5 w-2.5 rounded-full"
                      />
                    ))}
                  </div>

                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#D8B56D]/20 text-[#D8B56D]">
                    <Crown className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="flex items-center justify-center gap-1.5 text-base font-semibold text-[#F3D999]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>MashaAllah! Ab meri Princess ki smile sab se haseen hai!</span>
                  </p>
                  <p className="mt-1 text-xs text-[#FFF5E9]/80">
                    Next chapter unlocked with Bilal&apos;s love.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RoyalNavigationFooter
        currentChapter={3}
        onPrev={onPrev}
        onNext={onNext}
        nextDisabled={!quizCompleted}
        nextLabel="Next: 8 Qualities"
        helperText={
          quizCompleted
            ? undefined
            : 'Complete all 3 royal questions to unlock the next chapter.'
        }
      />
    </section>
  );
}
