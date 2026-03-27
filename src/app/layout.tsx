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
    default: 'Wanda | AI Automation Studio',
    template: '%s | Wanda',
  },
  description:
    'WandaSystems builds autonomous AI workflows and high-performance digital products. Premium tech studio for AI automation, web, and systems.',
  keywords: ['AI automation', 'autonomous agents', 'web development', 'systems engineering'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wanda-os-dev.github.io/wanda-portfolio',
    siteName: 'Wanda',
    title: 'Wanda | AI Automation Studio',
    description:
      'Wanda builds autonomous AI workflows and high-performance digital products.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wanda | AI Automation Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanda | AI Automation Studio',
    description:
      'Wanda builds autonomous AI workflows and high-performance digital products.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/wanda-portfolio/favicon.ico',
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
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://formspree.io https://raw.githack.com;" />
      </head>
      <body className="bg-brand-black text-brand-white antialiased">
        <a
          href="#main-content"
          className="absolute -top-16 left-0 bg-brand-gold text-brand-black font-medium px-4 py-2 z-[60] transition-all focus:top-0"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
