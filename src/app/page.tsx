'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with WebGL
const HeroScene = dynamic(
  () => import('@/components/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Canvas Background */}
      <HeroScene />

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(10,10,10,0.85) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.span
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-block text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-8"
          >
            AI Automation Studio
          </motion.span>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-display font-light text-brand-white leading-[0.95] tracking-[-0.03em] mb-8"
          >
            Build what
            <br />
            <span className="text-brand-gold">others</span>
            <br />
            automate later.
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-brand-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg"
          >
            We design and ship autonomous AI systems, high-performance web products, and
            infrastructure that compounds over time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
            >
              View Work
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-brand-white text-sm px-7 py-3.5 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-brand-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-gray-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
