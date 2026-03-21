'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/projects';

export function NextProjectNav({ nextProject }: { nextProject: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-sm overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #120820 0%, #0d0816 100%)',
        border: '1px solid rgba(6,182,212,0.08)',
      }}
    >
      <Link
        href={`/work/${nextProject.id}`}
        className="group flex items-center justify-between p-8 md:p-10 relative overflow-hidden"
      >
        {/* Hover glow */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.04) 0%, transparent 60%)' }}
        />
        <span
          className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg, ${nextProject.accentColor}, #06b6d4)` }}
        />

        <div className="relative">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-gray-500 block mb-2">
            Next Project
          </span>
          <p className="text-xs text-brand-gray-500 mb-1">{nextProject.category}</p>
          <h3
            className="text-xl md:text-2xl font-light text-brand-white group-hover:text-white transition-colors duration-300"
          >
            {nextProject.title}
          </h3>
        </div>
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
          className="text-brand-gray-500 group-hover:text-brand-white translate-x-0 group-hover:translate-x-2 transition-all duration-300 relative flex-shrink-0"
        >
          <path
            d="M5 14h18M16 7l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </motion.div>
  );
}
