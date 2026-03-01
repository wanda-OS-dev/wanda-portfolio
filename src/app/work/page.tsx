'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/projects';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24 relative overflow-hidden">
      {/* Deep background gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.06]" style={{ background: 'radial-gradient(circle, #c9a227 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04]" style={{ background: 'radial-gradient(circle, #c9a227 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            Selected Work
          </span>
          <h1 className="text-heading font-light text-brand-white tracking-[-0.02em]">
            Projects & Case Studies
          </h1>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Link
                href={`/work/${project.id}`}
                className="group block relative bg-brand-black p-8 md:p-10 h-full hover:bg-brand-gray-900 transition-colors duration-500 overflow-hidden"
              >
                {/* Hover accent line */}
                <span
                  className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: project.accentColor }}
                />

                {/* Meta */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium tracking-widest uppercase text-brand-gray-500">
                    {project.category}
                  </span>
                  <span className="text-xs text-brand-gray-500">{project.year}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-light text-brand-white tracking-[-0.01em] mb-4 group-hover:text-brand-white transition-colors">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-brand-gray-300 text-sm leading-relaxed mb-8 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-brand-gray-500 border border-white/[0.08] px-2.5 py-1 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm text-brand-gray-500 group-hover:text-brand-gold transition-colors duration-300">
                  <span>Case Study</span>
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                    className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
