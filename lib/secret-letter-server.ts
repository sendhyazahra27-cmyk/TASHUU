import 'server-only';
import {
  isValidSecretAttempt,
  normalizeSecretPasswordInput,
} from '@/lib/experience-logic';

/**
 * ============================================================================
 * SECRET LOVE LETTER CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 * Bilal: To change the secret password for Tashu's private letter:
 *   1. Recommended: Set `SECRET_LETTER_PASSWORD` in your environment / Secrets panel
 *      (or via `wrangler secret put SECRET_LETTER_PASSWORD` on Cloudflare Workers).
 *   2. Or update `DEFAULT_FALLBACK_PASSWORD` below (used when the env var is
 *      not configured).
 *
 * SECURITY NOTE:
 * This file is strictly server-only (`import 'server-only'`). Neither the
 * password nor the letter content is ever bundled into client-side JavaScript.
 * Verification runs exclusively on the server via POST /api/secret-letter/unlock.
 */
const DEFAULT_FALLBACK_PASSWORD = '24022009';

interface CloudflareContextLike {
  env?: Record<string, unknown>;
}

function readCloudflareSecretEnv(): unknown {
  const ctx = (
    globalThis as Record<symbol, CloudflareContextLike | undefined>
  )[Symbol.for('__cloudflare-context__')];
  return ctx?.env?.SECRET_LETTER_PASSWORD;
}

function normalizeConfiguredSecret(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let cleaned = normalizeSecretPasswordInput(raw);
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = normalizeSecretPasswordInput(cleaned.slice(1, -1));
  }
  if (!cleaned || cleaned === 'MY_SECRET_LETTER_PASSWORD') {
    return null;
  }
  return cleaned;
}

export function getConfiguredSecretPassword(): string {
  const fromCloudflare = normalizeConfiguredSecret(readCloudflareSecretEnv());
  if (fromCloudflare) {
    return fromCloudflare;
  }

  const fromProcessEnv = normalizeConfiguredSecret(
    process.env.SECRET_LETTER_PASSWORD
  );
  if (fromProcessEnv) {
    return fromProcessEnv;
  }

  return DEFAULT_FALLBACK_PASSWORD;
}

export interface SecretLetterPayload {
  heading: string;
  salutation: string;
  paragraphs: string[];
  highlights: string[];
  closingLine: string;
  signatureLead: string;
  signatureName: string;
  sealText: string;
}

const SECRET_LETTER_CONTENT: SecretLetterPayload = {
  heading: 'EK KHAT SIRF MERI PRINCESS KE NAAM',
  salutation: 'MERI PYARI TASHU...',
  paragraphs: [
    'Meri Jaan, meri Bachaw, aaj main Apse woh sab kuch dil khol kar kehna chahta hoon jo shayad har roz ki baaton mein lafzon ka sahara nahi paata. Jab se Ap meri zindagi mein aayi hain, har din ek nayi khushi, ek naya sukoon aur ek khoobsurat maqsad mil gaya hai.',
    'Log princesses ki kahaniyan kitabon mein padhte hain, lekin mere liye meri zindagi ki sab se khoobsurat kahani khud Ap hain. Apki masoomiyat, Apki paak muskurahat, aur Apka mere liye hamesha dil se sochna mujhe har roz yeh ehsaas dilata hai ke main kitna khushnaseeb hoon.',
    'Meri Princess, zindagi ke har mod par — chahe muskurane ke pal hon ya thakan bhari shaamein — main hamesha Apke saath khada rehna chahta hoon. Apki izzat, Apka sukoon aur Apke har chhote bade khwab ki hifazat karna mere liye sab se barh kar hai.',
  ],
  highlights: [
    'AP BOHAT KHAAS HAIN',
    'AP BOHAT QIMTI HAIN',
    'AUR APKI MUSKURAHAT MERE LIYE BOHAT MAAYNE RAKHTI HAI',
  ],
  closingLine: 'Hamesha khush rahiye meri Jaan.',
  signatureLead: 'WITH ALL MY LOVE,',
  signatureName: 'APKA BILAL ❤️',
  sealText: 'LETTER WRITTEN WITH LOVE — SEALED FOR TASHU',
};

function constantTimeEquals(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bytesA = encoder.encode(a);
  const bytesB = encoder.encode(b);
  const maxLen = Math.max(bytesA.length, bytesB.length);

  let diff = bytesA.length ^ bytesB.length;
  for (let i = 0; i < maxLen; i += 1) {
    diff |= (bytesA[i] ?? 0) ^ (bytesB[i] ?? 0);
  }
  return diff === 0;
}

export function verifyAndGetSecretLetter(
  attempt: unknown
): { ok: true; letter: SecretLetterPayload } | { ok: false; reason: 'empty' | 'invalid' } {
  if (typeof attempt !== 'string' || !isValidSecretAttempt(attempt)) {
    return { ok: false, reason: 'empty' };
  }

  const normalizedAttempt = normalizeSecretPasswordInput(attempt);
  const expected = getConfiguredSecretPassword();

  if (!constantTimeEquals(normalizedAttempt, expected)) {
    return { ok: false, reason: 'invalid' };
  }

  return { ok: true, letter: SECRET_LETTER_CONTENT };
}
