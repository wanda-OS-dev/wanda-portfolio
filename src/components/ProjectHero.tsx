'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/projects';

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
      {/* Background visual */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Aurora blobs */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[180px] opacity-[0.12]"
          style={{ background: `radial-gradient(circle, ${project.accentColor}60 0%, transparent 60%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full blur-[150px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #1a0a2e 0%, transparent 70%)' }}
        />
        {/* Bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
      </div>

      {/* Accent sweep top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 40%, #06b6d4 60%, transparent 100%)` }}
      />

      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-10 left-6 md:left-10 z-10"
      >
        <Link
          href="/work"
          className="flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300 group"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
            className="group-hover:-translate-x-0.5 transition-transform duration-300"
          >
            <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Work
        </Link>
      </motion.div>

      {/* Hero content */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-10 pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Category + year */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className="text-[11px] font-medium tracking-[0.2em] uppercase px-3 py-1 rounded-sm"
              style={{
                background: 'rgba(6,182,212,0.1)',
                color: '#06b6d4',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-brand-gray-500 font-light">{project.year}</span>
          </div>

          {/* Title */}
          <h1
            className="font-light text-brand-white tracking-[-0.02em] mb-6 leading-[1.05]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-brand-gray-300 text-xl font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
