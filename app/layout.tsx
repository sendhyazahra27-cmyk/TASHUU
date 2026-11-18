import type { Metadata, Viewport } from 'next';
import {
  Cinzel,
  Playfair_Display,
  Poppins,
  Noto_Nastaliq_Urdu,
  Great_Vibes,
} from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-urdu',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tashu — My Forever Princess | 18 November',
  description:
    'A royal National Princess Day celebration dedicated with love and respect to Tashu, from Bilal.',
  openGraph: {
    title: 'Tashu — My Forever Princess | 18 November',
    description:
      'A royal National Princess Day celebration dedicated with love and respect to Tashu, from Bilal.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tashu — My Forever Princess | 18 November',
    description:
      'A royal National Princess Day celebration dedicated with love and respect to Tashu, from Bilal.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#10091F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${poppins.variable} ${notoNastaliq.variable} ${greatVibes.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#10091F] text-[#FFF5E9] antialiased selection:bg-[#D8B56D]/30 selection:text-[#FFF5E9]"
      >
        {children}
      </body>
    </html>
  );
}
