'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <span className="text-brand-gold text-xs font-medium tracking-[0.2em] uppercase block mb-6">
          404
        </span>
        <h1 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-6">
          Page not found.
        </h1>
        <p className="text-brand-gray-500 mb-10">
          The page you&apos;re looking for doesn&apos;t exist.or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
        >
          Go home
        </Link>
      </motion.div>
    </div>
  );
}
