'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RoyalScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  amount?: number;
}

export default function RoyalScrollReveal({
  children,
  className,
  delay = 0,
  yOffset = 18,
  duration = 0.6,
  amount = 0.08,
}: RoyalScrollRevealProps) {
  return (
    <motion.div
      data-scroll-reveal="true"
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
