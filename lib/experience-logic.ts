export const TOTAL_CHAPTERS = 11;

export function clampChapter(chapter: number): number {
  if (!Number.isFinite(chapter)) return 1;
  const rounded = Math.trunc(chapter);
  if (rounded < 1) return 1;
  if (rounded > TOTAL_CHAPTERS) return TOTAL_CHAPTERS;
  return rounded;
}

export function canGoPrev(chapter: number): boolean {
  return clampChapter(chapter) > 1;
}

export function canGoNext(chapter: number): boolean {
  return clampChapter(chapter) < TOTAL_CHAPTERS;
}

export function getProgressPercentage(chapter: number): number {
  const safe = clampChapter(chapter);
  return Math.round((safe / TOTAL_CHAPTERS) * 100);
}

export interface DodgeOffset {
  x: number;
  y: number;
}

/**
 * Computes a playful, bounded offset for the "Koi Aur" quiz button
 * so it dodges taps/pointers while staying comfortably inside the card
 * and never blocking the primary "Ap — Tashu" answer.
 */
export function computeDodgingOffset(
  attempt: number,
  maxRadiusX = 96,
  maxRadiusY = 44
): DodgeOffset {
  if (attempt <= 0) return { x: 0, y: 0 };
  const presets: DodgeOffset[] = [
    { x: maxRadiusX * 0.72, y: -maxRadiusY * 0.85 },
    { x: -maxRadiusX * 0.68, y: maxRadiusY * 0.75 },
    { x: maxRadiusX * 0.85, y: maxRadiusY * 0.65 },
    { x: -maxRadiusX * 0.82, y: -maxRadiusY * 0.72 },
    { x: maxRadiusX * 0.45, y: maxRadiusY * 0.92 },
    { x: -maxRadiusX * 0.52, y: -maxRadiusY * 0.9 },
  ];
  const index = (attempt - 1) % presets.length;
  return {
    x: Math.round(presets[index].x),
    y: Math.round(presets[index].y),
  };
}

export function toggleStringSelection(
  current: string[],
  id: string
): string[] {
  if (current.includes(id)) {
    return current.filter((item) => item !== id);
  }
  return [...current, id];
}

export function addUniqueSelection(
  current: string[],
  id: string
): string[] {
  if (current.includes(id)) return current;
  return [...current, id];
}

export function wrapGalleryIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

const SUPPORTED_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export function isSupportedImageFilename(filename: string): boolean {
  const lower = filename.trim().toLowerCase();
  const dotIdx = lower.lastIndexOf('.');
  if (dotIdx <= 0) return false;
  const ext = lower.slice(dotIdx);
  return SUPPORTED_IMAGE_EXTS.has(ext);
}

export function buildFallbackCaption(index: number): string {
  const captions = [
    'Har tasveer mein Apka ek naya khoobsurat andaaz.',
    'Meri Princess har andaaz mein bemisaal lagti hain.',
    'Apki aankhon mein ek alag hi duniya nazar aati hai.',
    'Yeh lamhe mere liye bohat khaas hain.',
    'Apki muskurahat meri favourite feeling hai.',
    'Apki saadgi hi Apki sab se badi khoobsurati hai.',
  ];
  return captions[index % captions.length];
}

export function isValidSecretAttempt(attempt: string): boolean {
  return attempt.trim().length > 0;
}

export type SongPlaybackMode = 'audio' | 'external' | 'unconfigured';

export function getSongPlaybackMode(track: {
  audioSrc?: string;
  officialUrl?: string;
}): SongPlaybackMode {
  if (track.audioSrc && track.audioSrc.trim().length > 0) {
    return 'audio';
  }
  if (track.officialUrl && track.officialUrl.trim().length > 0) {
    return 'external';
  }
  return 'unconfigured';
}

export function getScrollRevealDelay(
  index: number,
  stepSeconds = 0.05,
  maxDelaySeconds = 0.22
): number {
  if (!Number.isFinite(index) || index <= 0) return 0;
  const raw = index * Math.max(0, stepSeconds);
  const clamped = Math.min(raw, Math.max(0, maxDelaySeconds));
  return Math.round(clamped * 1000) / 1000;
}
