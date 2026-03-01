import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wanda-os-dev.github.io/wanda-portfolio'),
  title: {
    default: 'WandaSystems — AI Automation Studio',
    template: '%s | WandaSystems',
  },
  description:
    'WandaSystems builds autonomous AI workflows and high-performance digital products. Premium tech studio for AI automation, web, and systems.',
  keywords: ['AI automation', 'autonomous agents', 'web development', 'systems engineering'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wanda-os-dev.github.io/wanda-portfolio',
    siteName: 'WandaSystems',
    title: 'WandaSystems — AI Automation Studio',
    description:
      'WandaSystems builds autonomous AI workflows and high-performance digital products.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WandaSystems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WandaSystems — AI Automation Studio',
    description:
      'WandaSystems builds autonomous AI workflows and high-performance digital products.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-brand-black text-brand-white antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
