'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project, projects } from '@/lib/projects';

export function ProjectDetail({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero strip */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      />

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 md:px-10">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/work"
            className="flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path
                d="M13 7H1M6 2L1 7l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All Work
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gold">
              {project.category}
            </span>
            <span className="text-xs text-brand-gray-500">{project.year}</span>
          </div>
          <h1 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-6">
            {project.title}
          </h1>
          <p className="text-brand-gray-300 text-xl font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </motion.div>

        {/* Outcome highlight */}
        {project.outcome && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-gray-900 border border-white/[0.06] rounded-sm p-6 mb-16"
            style={{ borderLeftColor: project.accentColor, borderLeftWidth: '2px' }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block mb-2">
              Outcome
            </span>
            <p className="text-brand-white text-lg font-light">{project.outcome}</p>
          </motion.div>
        )}

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gray-500 mb-6">
            Overview
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {project.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-brand-gray-300 font-light leading-relaxed mb-5">
                {para.trim()}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gray-500 mb-4">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-brand-gray-300 border border-white/[0.1] px-3 py-1.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Next project */}
        <div className="border-t border-white/[0.06] pt-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gray-500 block mb-6">
            Next Project
          </span>
          <Link
            href={`/work/${nextProject.id}`}
            className="group flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-brand-gray-500 mb-1">{nextProject.category}</p>
              <h3 className="text-2xl font-light text-brand-white group-hover:text-brand-gold transition-colors duration-300">
                {nextProject.title}
              </h3>
            </div>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="text-brand-gray-500 group-hover:text-brand-gold translate-x-0 group-hover:translate-x-2 transition-all duration-300"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
