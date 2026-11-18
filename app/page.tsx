import { discoverGalleryPhotos } from '@/lib/photo-loader';
import { clampChapter } from '@/lib/experience-logic';
import RoyalExperienceShell from '@/components/RoyalExperienceShell';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams?: Promise<{
    autostart?: string;
    chapter?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const photos = discoverGalleryPhotos();

  let initialChapter = 1;
  if (resolvedParams.chapter) {
    const parsed = Number.parseInt(resolvedParams.chapter, 10);
    if (!Number.isNaN(parsed)) {
      initialChapter = clampChapter(parsed);
    }
  } else if (resolvedParams.autostart === '1') {
    initialChapter = 2;
  }

  return <RoyalExperienceShell photos={photos} initialChapter={initialChapter} />;
}
