'use client';

import type { CSSProperties } from 'react';

interface PetalSpec {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
}

interface SparkleSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
}

const PETALS: PetalSpec[] = [
  { id: 1, left: '8%', size: 12, duration: '15s', delay: '0s' },
  { id: 2, left: '24%', size: 10, duration: '18s', delay: '3s' },
  { id: 3, left: '43%', size: 14, duration: '14s', delay: '6s' },
  { id: 4, left: '64%', size: 11, duration: '17s', delay: '2s' },
  { id: 5, left: '81%', size: 13, duration: '16s', delay: '5s' },
  { id: 6, left: '92%', size: 10, duration: '19s', delay: '8s' },
];

const SPARKLES: SparkleSpec[] = [
  { id: 1, left: '12%', top: '18%', size: 4, duration: '4.5s', delay: '0s' },
  { id: 2, left: '28%', top: '62%', size: 3, duration: '5.5s', delay: '1.2s' },
  { id: 3, left: '48%', top: '28%', size: 4, duration: '6s', delay: '0.6s' },
  { id: 4, left: '72%', top: '15%', size: 3, duration: '5s', delay: '2.1s' },
  { id: 5, left: '84%', top: '54%', size: 4, duration: '4.8s', delay: '1.5s' },
  { id: 6, left: '19%', top: '82%', size: 3, duration: '5.2s', delay: '2.7s' },
  { id: 7, left: '61%', top: '76%', size: 4, duration: '6.2s', delay: '0.9s' },
  { id: 8, left: '91%', top: '84%', size: 3, duration: '5.4s', delay: '1.8s' },
];

export default function RoyalAmbientCanvas({
  intensity = 'gentle',
}: {
  intensity?: 'gentle' | 'celebration';
}) {
  const petals = intensity === 'celebration' ? PETALS : PETALS.slice(0, 4);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Ambient radial lighting */}
      <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#D8B56D]/10 blur-[110px]" />
      <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#42172D]/50 blur-[120px]" />

      {/* Subtle golden dust sparkles */}
      {SPARKLES.map((s) => {
        const style = {
          left: s.left,
          top: s.top,
          width: `${s.size}px`,
          height: `${s.size}px`,
          '--sparkle-duration': s.duration,
          '--sparkle-delay': s.delay,
        } as CSSProperties;
        return (
          <span
            key={s.id}
            style={style}
            className="animate-float-sparkle absolute rounded-full bg-[#F3D999]/75 shadow-[0_0_8px_rgba(216,181,109,0.65)]"
          />
        );
      })}

      {/* Delicate floating rose petals */}
      {petals.map((p) => {
        const style = {
          left: p.left,
          width: `${p.size}px`,
          height: `${Math.round(p.size * 1.35)}px`,
          '--petal-duration': p.duration,
          '--petal-delay': p.delay,
        } as CSSProperties;
        return (
          <span
            key={p.id}
            style={style}
            className="animate-float-petal absolute -top-8 rounded-[65%_35%_70%_30%/55%_45%_55%_45%] bg-gradient-to-br from-[#F2B8C6]/55 via-[#D97C97]/40 to-[#42172D]/45"
          />
        );
      })}
    </div>
  );
}
