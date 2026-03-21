'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';

export function ProjectContent({ project }: { project: Project }) {
  return (
    <>
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
          {project.longDescription.split('\n\n').map((para, i) => (
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
    </>
  );
}
