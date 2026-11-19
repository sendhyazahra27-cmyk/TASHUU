'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Crown,
  Eye,
  EyeOff,
  Heart,
  Lock,
  MailOpen,
  RotateCcw,
  Sparkles,
  Unlock,
  X,
} from 'lucide-react';
import { SECRET_LETTER_TEASER } from '@/lib/royal-content';
import {
  isValidSecretAttempt,
  normalizeSecretPasswordInput,
} from '@/lib/experience-logic';
import type { SecretLetterPayload } from '@/lib/secret-letter-server';

interface SecretLoveLetterProps {
  open: boolean;
  onClose: () => void;
}

type ChamberStage = 'locked' | 'password' | 'unlocking' | 'revealed';

const CHAMBER_PETALS = [
  { id: 1, left: '8%', delay: '0s', duration: '13s', size: 12 },
  { id: 2, left: '21%', delay: '2.5s', duration: '15s', size: 10 },
  { id: 3, left: '38%', delay: '1.2s', duration: '14s', size: 13 },
  { id: 4, left: '56%', delay: '3.6s', duration: '16s', size: 11 },
  { id: 5, left: '74%', delay: '0.8s', duration: '13.5s', size: 12 },
  { id: 6, left: '89%', delay: '2.9s', duration: '15.5s', size: 10 },
];

const CHAMBER_SPARKLES = [
  { id: 1, top: '14%', left: '16%', delay: '0.2s' },
  { id: 2, top: '24%', left: '82%', delay: '1.1s' },
  { id: 3, top: '48%', left: '10%', delay: '1.9s' },
  { id: 4, top: '62%', left: '88%', delay: '0.7s' },
  { id: 5, top: '78%', left: '22%', delay: '1.5s' },
  { id: 6, top: '84%', left: '72%', delay: '2.2s' },
];

export default function SecretLoveLetter({
  open,
  onClose,
}: SecretLoveLetterProps) {
  const [stage, setStage] = useState<ChamberStage>('locked');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [letter, setLetter] = useState<SecretLetterPayload | null>(null);
  const [replayPulse, setReplayPulse] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, [open, onClose]);

  const handleClose = () => {
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
    setErrorMsg(null);
    setPasswordInput('');
    setShowPassword(false);
    setStage('locked');
    setLetter(null);
    onClose();
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const cleanedPassword = normalizeSecretPasswordInput(String(passwordInput));
    if (!isValidSecretAttempt(cleanedPassword)) {
      setErrorMsg('Meri Princess, pehle apna secret password likhein ❤️');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/secret-letter/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'same-origin',
        cache: 'no-store',
        body: JSON.stringify({ password: cleanedPassword }),
      });

      let data: {
        ok?: boolean;
        message?: string;
        letter?: SecretLetterPayload;
      } | null = null;

      try {
        data = (await response.json()) as {
          ok?: boolean;
          message?: string;
          letter?: SecretLetterPayload;
        };
      } catch {
        data = null;
      }

      if (!response.ok || !data?.ok || !data.letter) {
        const isClientAuthError =
          response.status === 400 || response.status === 401;
        setErrorMsg(
          data?.message ||
            (isClientAuthError
              ? 'Yeh secret password sahi nahi hai, Meri Princess... Dil se dobara koshish karein ❤️'
              : 'Abhi connection mein thodi si rukawat aayi hai, Meri Princess. Dobara koshish karein ❤️')
        );
        setSubmitting(false);
        return;
      }

      setLetter(data.letter);
      setPasswordInput('');
      setSubmitting(false);
      setStage('unlocking');

      unlockTimerRef.current = window.setTimeout(() => {
        setStage('revealed');
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 950);
    } catch {
      setErrorMsg(
        'Abhi connection mein thodi si rukawat aayi hai, Meri Princess. Dobara koshish karein ❤️'
      );
      setSubmitting(false);
    }
  };

  const handleReadAgain = () => {
    setReplayPulse((n) => n + 1);
    setStage('unlocking');
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
    }
    unlockTimerRef.current = window.setTimeout(() => {
      setStage('revealed');
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="secret-letter-heading"
      ref={scrollContainerRef}
      className="royal-velvet-bg fixed inset-0 z-[70] overflow-y-auto px-4 py-6 sm:px-6 sm:py-10"
    >
      {/* Ambient Royal Particles inside Chamber */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {CHAMBER_PETALS.map((petal) => (
          <span
            key={petal.id}
            style={
              {
                left: petal.left,
                width: petal.size,
                height: petal.size * 1.35,
                '--petal-delay': petal.delay,
                '--petal-duration': petal.duration,
              } as React.CSSProperties
            }
            className="animate-float-petal absolute -top-6 rounded-full bg-gradient-to-br from-[#F2B8C6]/75 to-[#8B2949]/65 blur-[0.3px]"
          />
        ))}
        {CHAMBER_SPARKLES.map((sp) => (
          <span
            key={sp.id}
            style={
              {
                top: sp.top,
                left: sp.left,
                '--sparkle-delay': sp.delay,
                '--sparkle-duration': '4.6s',
              } as React.CSSProperties
            }
            className="animate-float-sparkle absolute h-1.5 w-1.5 rounded-full bg-[#F3D999] shadow-[0_0_10px_rgba(243,217,153,0.9)]"
          />
        ))}
      </div>

      {/* Top Close / Return Bar */}
      <div className="relative z-10 mx-auto mb-4 flex w-full max-w-3xl items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClose}
          className="flex min-h-[44px] items-center gap-2 rounded-xl border border-[#D8B56D]/35 bg-[#190D2B]/85 px-3.5 py-2 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#241337] sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
          <span>{SECRET_LETTER_TEASER.returnCta}</span>
        </button>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close Secret Love Letter"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#D8B56D]/35 bg-[#190D2B]/85 text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#241337]"
        >
          <X className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
        </button>
      </div>

      {/* Main Centered Chamber Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-3xl flex-col items-center justify-center py-2">
        <AnimatePresence mode="wait">
          {/* STAGE 1: LOCKED ROYAL ENVELOPE */}
          {stage === 'locked' && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="royal-glass w-full rounded-3xl p-6 text-center sm:p-10"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D8B56D]/45 bg-[#241337]/90 shadow-[0_0_28px_rgba(216,181,109,0.28)]">
                <Lock className="h-6 w-6 text-[#D8B56D]" aria-hidden="true" />
              </div>

              <p className="text-xs font-medium tracking-[0.22em] text-[#D8B56D]">
                PRIVATE ROYAL ENVELOPE · SEALED FOR TASHU
              </p>

              <h1
                id="secret-letter-heading"
                className="font-royal-display text-balance mt-3 text-2xl font-bold tracking-wide sm:text-4xl"
              >
                <span className="gold-shimmer-text">
                  EK KHAT SIRF MERI PRINCESS KE NAAM
                </span>{' '}
                <span aria-hidden="true" className="inline-block text-[#F2B8C6]">
                  ❤️
                </span>
              </h1>

              <p className="font-royal-serif mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#FFF5E9]/90 sm:text-base">
                {SECRET_LETTER_TEASER.subheading}
              </p>

              {/* Animated Royal Envelope Visual */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mx-auto mt-8 max-w-md overflow-hidden rounded-2xl border border-[#D8B56D]/45 bg-gradient-to-br from-[#2B1239] via-[#1C0B2B] to-[#3B1429] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:p-8"
              >
                {/* Envelope V-Flap */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 border-b border-[#D8B56D]/25 bg-gradient-to-b from-[#42172D]/70 to-transparent"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 92%)' }}
                />

                {/* Wax Seal with Golden Heart */}
                <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#F3D999]/80 bg-gradient-to-br from-[#D8B56D] via-[#F1D38E] to-[#9B7228] text-[#1A0D29] shadow-[0_0_26px_rgba(216,181,109,0.55)]">
                  <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
                </div>

                <p className="font-royal-display text-sm font-semibold tracking-[0.2em] text-[#F3D999] sm:text-base">
                  {SECRET_LETTER_TEASER.recipient}
                </p>
                <div className="mx-auto my-3 h-px w-24 bg-gradient-to-r from-transparent via-[#D8B56D]/60 to-transparent" />
                <p className="font-royal-display text-xs tracking-[0.22em] text-[#F2B8C6]">
                  {SECRET_LETTER_TEASER.sender}
                </p>
              </motion.div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setStage('password');
                  }}
                  className="gold-btn flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-semibold tracking-wider text-[#1A0D29] transition-transform active:scale-[0.98] whitespace-nowrap sm:px-8 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF5E9]"
                >
                  <span>{SECRET_LETTER_TEASER.unlockCta}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: PASSWORD ENTRY INTERFACE */}
          {stage === 'password' && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="royal-glass w-full max-w-xl rounded-3xl p-6 text-center sm:p-10"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D8B56D]/50 bg-[#241337] shadow-[0_0_26px_rgba(216,181,109,0.28)]">
                <Crown className="h-7 w-7 text-[#D8B56D]" aria-hidden="true" />
              </div>

              <p className="text-xs font-medium tracking-[0.2em] text-[#D8B56D]">
                PRIVATE ACCESS · ONLY FOR TASHU
              </p>

              <h1
                id="secret-letter-heading"
                className="gold-shimmer-text font-royal-display text-balance mt-3 text-xl font-bold tracking-wide sm:text-3xl"
              >
                {SECRET_LETTER_TEASER.passwordHeading}
              </h1>

              <p className="font-royal-serif mt-3 text-sm text-[#FFF5E9]/80">
                Sirf Meri Princess hi is raaz ko khol sakti hain.
              </p>

              <form onSubmit={handleSubmitPassword} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="secret-letter-password" className="sr-only">
                    Secret Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="secret-letter-password"
                      name="secret-letter-passcode"
                      type={showPassword ? 'text' : 'password'}
                      inputMode="numeric"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder={SECRET_LETTER_TEASER.passwordPlaceholder}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint="go"
                      data-lpignore="true"
                      data-1p-ignore="true"
                      autoFocus
                      className="min-h-[52px] w-full rounded-2xl border border-[#D8B56D]/40 bg-[#120822]/90 py-3 pr-12 pl-4 text-center text-base text-[#FFF5E9] placeholder:text-[#FFF5E9]/45 focus:border-[#D8B56D] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-1.5 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#D8B56D]/80 transition-colors hover:text-[#F3D999]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {errorMsg && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-[#F2B8C6]/35 bg-[#42172D]/65 px-4 py-3 text-xs leading-relaxed text-[#F2B8C6] sm:text-sm"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="gold-btn flex min-h-[50px] items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-semibold tracking-wider text-[#1A0D29] transition-transform active:scale-[0.98] disabled:opacity-65 whitespace-nowrap sm:px-7 sm:text-sm"
                  >
                    <Unlock className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {submitting
                        ? 'UNLOCKING...'
                        : SECRET_LETTER_TEASER.unlockSubmitCta}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg(null);
                      setStage('locked');
                    }}
                    className="flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-[#D8B56D]/35 bg-[#190D2B]/85 px-6 py-3 text-xs font-medium tracking-wider text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#241337] whitespace-nowrap sm:text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
                    <span>{SECRET_LETTER_TEASER.goBackCta}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STAGE 3A: UNLOCKING ENVELOPE ANIMATION */}
          {stage === 'unlocking' && (
            <motion.div
              key={`unlocking-${replayPulse}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="royal-glass flex w-full max-w-lg flex-col items-center rounded-3xl p-10 text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.18, 1.05],
                  rotate: [0, -4, 4, 0],
                }}
                transition={{ duration: 0.85, ease: 'easeInOut' }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F3D999] bg-gradient-to-br from-[#D8B56D] to-[#9B7228] text-[#1A0D29] shadow-[0_0_40px_rgba(216,181,109,0.6)]"
              >
                <MailOpen className="h-9 w-9" aria-hidden="true" />
              </motion.div>

              <p className="gold-shimmer-text font-royal-display mt-6 text-lg font-bold tracking-wider sm:text-xl">
                Unsealing Bilal&apos;s Letter for Tashu...
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-[#F2B8C6]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Sirf Meri Princess ke liye</span>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
            </motion.div>
          )}

          {/* STAGE 3B: WARM IVORY PARCHMENT LETTER REVEALED */}
          {stage === 'revealed' && letter && (
            <motion.div
              key={`revealed-${replayPulse}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <article className="royal-parchment relative mx-auto max-w-2xl overflow-hidden rounded-3xl p-6 sm:p-10 md:p-12">
                {/* Golden Crest */}
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#9B7228]/45 bg-[#D8B56D]/20 text-[#6F4B15]">
                    <Crown className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-[11px] font-semibold tracking-[0.22em] text-[#7D5318]">
                    {letter.heading}
                  </p>
                </div>

                {/* Salutation */}
                <h1
                  id="secret-letter-heading"
                  className="font-royal-display text-2xl font-bold tracking-wide text-[#3D1631] sm:text-3xl"
                >
                  {letter.salutation}
                </h1>

                <div className="my-5 h-px w-28 bg-gradient-to-r from-[#B98E3E] to-transparent" />

                {/* Heartfelt Paragraphs */}
                <div className="font-royal-serif space-y-4 text-[15px] leading-relaxed text-[#2D1426] sm:text-base">
                  {letter.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Highlighted Royal Promise Lines */}
                <div className="my-7 rounded-2xl border border-[#B98E3E]/45 bg-[#FFFDF8]/75 p-5 text-center shadow-inner sm:p-6">
                  <div className="space-y-1.5">
                    {letter.highlights.map((line) => (
                      <p
                        key={line}
                        className="font-royal-display text-xs font-bold tracking-[0.14em] text-[#5B2040] sm:text-sm"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="font-royal-serif mt-4 text-sm italic text-[#42172D] sm:text-base">
                    {letter.closingLine}
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-8 text-right">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#7D5318]">
                    {letter.signatureLead}
                  </p>
                  <p className="font-cursive mt-1 text-3xl text-[#42172D] sm:text-4xl">
                    {letter.signatureName}
                  </p>
                </div>

                {/* Wax Seal Footer Line */}
                <div className="mt-8 border-t border-[#B98E3E]/35 pt-4 text-center">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#7D5318]">
                    <Heart className="h-3.5 w-3.5 fill-[#8B2949] text-[#8B2949]" aria-hidden="true" />
                    <span>{letter.sealText}</span>
                  </p>
                </div>
              </article>

              {/* Post-Letter Actions */}
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleReadAgain}
                  className="gold-btn flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-semibold tracking-wider text-[#1A0D29] transition-transform active:scale-[0.98] whitespace-nowrap sm:text-sm"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  <span>{SECRET_LETTER_TEASER.readAgainCta}</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#D8B56D]/45 bg-[#190D2B]/90 px-6 py-3 text-xs font-medium text-[#FFF5E9] transition-colors hover:border-[#D8B56D] hover:bg-[#241337] whitespace-nowrap sm:text-sm"
                >
                  <ArrowLeft className="h-4 w-4 text-[#D8B56D]" aria-hidden="true" />
                  <span>{SECRET_LETTER_TEASER.returnCta}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>,
    document.body
  );
}
