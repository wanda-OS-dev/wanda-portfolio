'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project, projects } from '@/lib/projects';

// O(1) lookup map to avoid O(N) Array.findIndex inside the render loop
const projectIndexMap = new Map(projects.map((p, i) => [p.id, i]));

// Pre-calculate parsed descriptions to avoid O(N) string splitting and GC allocation on every render
const parsedDescriptionsMap = new Map(
  projects.map((p) => [p.id, p.longDescription.split('\n\n')])
);

// Pre-allocate a constant empty array to prevent unnecessary string splits and heap allocations during cache misses in the render loop
const EMPTY_PARAGRAPHS: string[] = [];

export function ProjectDetail({ project }: { project: Project }) {
  // Use O(1) map lookup instead of O(N) array search on every render
  const currentIndex = projectIndexMap.get(project.id) ?? 0;
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #0d0816 0%, #0a0a0a 40%)' }}
    >
      {/* ── HERO ── */}
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
              aria-hidden="true"
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

      {/* ── BODY ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">

        {/* Outcome highlight */}
        {project.outcome && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 p-6 md:p-8 rounded-sm relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(26,10,46,0.8) 0%, rgba(13,8,22,0.9) 100%)',
              border: '1px solid rgba(6,182,212,0.12)',
              borderLeft: `3px solid ${project.accentColor}`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
              style={{ background: project.accentColor }}
            />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase block mb-3" style={{ color: '#06b6d4' }}>
              Key Outcome
            </span>
            <p className="text-brand-white text-2xl font-light leading-snug relative">{project.outcome}</p>
          </motion.div>
        )}

        {/* Content sections */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-gray-500">Overview</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.1)' }} />
          </div>
          <div className="space-y-5">
            {(parsedDescriptionsMap.get(project.id) ?? EMPTY_PARAGRAPHS).map((para, i) => (
              <p key={i} className="text-brand-gray-300 font-light leading-[1.8] text-base md:text-lg">
                {para.trim()}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-gray-500">Stack</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.1)' }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-brand-gray-300 px-3.5 py-1.5 rounded-sm font-light"
                style={{ border: '1px solid rgba(6,182,212,0.12)', background: 'rgba(6,182,212,0.04)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Next project */}
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
              aria-hidden="true"
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
      </div>
    </div>
  );
}
