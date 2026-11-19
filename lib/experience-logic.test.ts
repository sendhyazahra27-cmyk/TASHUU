import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TOTAL_CHAPTERS,
  clampChapter,
  canGoPrev,
  canGoNext,
  getProgressPercentage,
  computeDodgingOffset,
  toggleStringSelection,
  addUniqueSelection,
  wrapGalleryIndex,
  isSupportedImageFilename,
  buildFallbackCaption,
  isValidSecretAttempt,
  normalizeSecretPasswordInput,
  getSongPlaybackMode,
  getScrollRevealDelay,
} from './experience-logic';

test('clampChapter keeps chapters within 1..11', () => {
  assert.equal(TOTAL_CHAPTERS, 11);
  assert.equal(clampChapter(0), 1);
  assert.equal(clampChapter(-5), 1);
  assert.equal(clampChapter(5), 5);
  assert.equal(clampChapter(11), 11);
  assert.equal(clampChapter(14), 11);
  assert.equal(clampChapter(Number.NaN), 1);
});

test('navigation boundary helpers report prev/next availability', () => {
  assert.equal(canGoPrev(1), false);
  assert.equal(canGoNext(1), true);
  assert.equal(canGoPrev(5), true);
  assert.equal(canGoNext(5), true);
  assert.equal(canGoPrev(10), true);
  assert.equal(canGoNext(10), true);
  assert.equal(canGoPrev(11), true);
  assert.equal(canGoNext(11), false);
});

test('getProgressPercentage computes expected chapter progress', () => {
  assert.equal(getProgressPercentage(1), 9);
  assert.equal(getProgressPercentage(6), 55);
  assert.equal(getProgressPercentage(11), 100);
});

test('computeDodgingOffset returns zero at rest and bounded non-zero offsets on attempts', () => {
  assert.deepEqual(computeDodgingOffset(0), { x: 0, y: 0 });
  for (let i = 1; i <= 10; i++) {
    const offset = computeDodgingOffset(i, 90, 40);
    assert.ok(Math.abs(offset.x) <= 90);
    assert.ok(Math.abs(offset.y) <= 40);
    assert.ok(offset.x !== 0 || offset.y !== 0);
  }
});

test('selection helpers preserve uniqueness and toggle cleanly', () => {
  const afterAdd = addUniqueSelection(['q1'], 'q2');
  assert.deepEqual(afterAdd, ['q1', 'q2']);
  assert.deepEqual(addUniqueSelection(afterAdd, 'q2'), ['q1', 'q2']);
  assert.deepEqual(toggleStringSelection(afterAdd, 'q1'), ['q2']);
  assert.deepEqual(toggleStringSelection(afterAdd, 'q3'), ['q1', 'q2', 'q3']);
});

test('wrapGalleryIndex wraps cleanly in both directions', () => {
  assert.equal(wrapGalleryIndex(0, 17), 0);
  assert.equal(wrapGalleryIndex(-1, 17), 16);
  assert.equal(wrapGalleryIndex(17, 17), 0);
  assert.equal(wrapGalleryIndex(18, 17), 1);
  assert.equal(wrapGalleryIndex(3, 0), 0);
});

test('isSupportedImageFilename filters supported photo formats', () => {
  assert.equal(isSupportedImageFilename('pic1.jpg'), true);
  assert.equal(isSupportedImageFilename('Tashu.JPEG'), true);
  assert.equal(isSupportedImageFilename('portrait.png'), true);
  assert.equal(isSupportedImageFilename('photo.webp'), true);
  assert.equal(isSupportedImageFilename('README.txt'), false);
  assert.equal(isSupportedImageFilename('.gitkeep'), false);
});

test('buildFallbackCaption rotates through heartfelt Roman Urdu captions', () => {
  const c0 = buildFallbackCaption(0);
  const c1 = buildFallbackCaption(1);
  assert.ok(c0.length > 10);
  assert.notEqual(c0, c1);
});

test('isValidSecretAttempt and normalizeSecretPasswordInput preserve exact string password and trim whitespace/invisible chars', () => {
  assert.equal(isValidSecretAttempt(''), false);
  assert.equal(isValidSecretAttempt('   '), false);
  assert.equal(isValidSecretAttempt('\u200B  \uFEFF'), false);
  assert.equal(isValidSecretAttempt('24022009'), true);
  assert.equal(normalizeSecretPasswordInput(' 24022009 '), '24022009');
  assert.equal(normalizeSecretPasswordInput('\u200B24022009\u00A0'), '24022009');
  assert.equal(normalizeSecretPasswordInput(' 0024022009 '), '0024022009');
});

test('getSongPlaybackMode accurately identifies audio, external, and unconfigured songs', () => {
  assert.equal(getSongPlaybackMode({}), 'unconfigured');
  assert.equal(getSongPlaybackMode({ audioSrc: '   ' }), 'unconfigured');
  assert.equal(
    getSongPlaybackMode({ audioSrc: '/audio/aey-zindagi.mp3' }),
    'audio'
  );
  assert.equal(
    getSongPlaybackMode({ officialUrl: 'https://open.spotify.com/track/123' }),
    'external'
  );
  assert.equal(
    getSongPlaybackMode({
      audioSrc: '/audio/aey-zindagi.mp3',
      officialUrl: 'https://open.spotify.com/track/123',
    }),
    'audio'
  );
});

test('getScrollRevealDelay calculates bounded, non-negative stagger delays', () => {
  assert.equal(getScrollRevealDelay(0), 0);
  assert.equal(getScrollRevealDelay(-2), 0);
  assert.equal(getScrollRevealDelay(Number.NaN), 0);
  assert.equal(getScrollRevealDelay(1, 0.05, 0.2), 0.05);
  assert.equal(getScrollRevealDelay(3, 0.05, 0.2), 0.15);
  assert.equal(getScrollRevealDelay(10, 0.05, 0.2), 0.2);
});


