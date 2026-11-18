'use client';

import Image from 'next/image';
import { Crown } from 'lucide-react';
import { useState } from 'react';

interface RoyalPhotoFrameProps {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function RoyalPhotoFrame({
  src,
  alt,
  fit = 'cover',
  priority = false,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  className = '',
}: RoyalPhotoFrameProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#241337] via-[#1A0D29] to-[#42172D] p-4 text-center ${className}`}
      >
        <Crown className="h-7 w-7 text-[#D8B56D]/75" aria-hidden="true" />
        <p className="font-royal-serif text-xs text-[#FFF5E9]/80">{alt}</p>
        <span className="text-[11px] text-[#D8B56D]/65">
          Royal Memory Frame
        </span>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#190D2B] ${className}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#241337] via-[#2E1745] to-[#190D2B]"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
      />
    </div>
  );
}
