import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  buildFallbackCaption,
  isSupportedImageFilename,
} from './experience-logic';
import {
  FALLBACK_GALLERY_PHOTOS,
  GalleryPhoto,
  PHOTO_CAPTIONS_BY_FILENAME,
} from './photos';

/**
 * Server-side bulk photo discovery:
 * Automatically reads any photographs placed in /public/images/
 * as well as /public/assets/aistudio/, deduplicates identical files,
 * and applies curated captions without hardcoding any fixed photo count.
 */
export function discoverGalleryPhotos(): GalleryPhoto[] {
  const publicRoot = path.join(process.cwd(), 'public');
  const folders: Array<{ dir: string; urlPrefix: string }> = [
    { dir: path.join(publicRoot, 'images'), urlPrefix: '/images' },
    {
      dir: path.join(publicRoot, 'assets', 'aistudio'),
      urlPrefix: '/assets/aistudio',
    },
  ];

  const seenHashes = new Set<string>();
  const discovered: GalleryPhoto[] = [];

  for (const folder of folders) {
    if (!fs.existsSync(folder.dir)) continue;

    const entries = fs
      .readdirSync(folder.dir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isSupportedImageFilename(entry.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    for (const entry of entries) {
      const fullPath = path.join(folder.dir, entry.name);
      try {
        const buffer = fs.readFileSync(fullPath);
        const hash = crypto.createHash('md5').update(buffer).digest('hex');
        if (seenHashes.has(hash)) continue;
        seenHashes.add(hash);

        const curated = PHOTO_CAPTIONS_BY_FILENAME[entry.name];
        const idx = discovered.length;
        discovered.push({
          id: `royal-photo-${idx + 1}`,
          src: `${folder.urlPrefix}/${encodeURIComponent(entry.name)}`,
          alt: curated ? `Tashu — ${curated.tag}` : `Tashu — Royal Memory ${idx + 1}`,
          caption: curated ? curated.caption : buildFallbackCaption(idx),
          tag: curated ? curated.tag : `Memory ${String(idx + 1).padStart(2, '0')}`,
        });
      } catch {
        // Ignore unreadable files safely
      }
    }
  }

  return discovered.length > 0 ? discovered : FALLBACK_GALLERY_PHOTOS;
}
