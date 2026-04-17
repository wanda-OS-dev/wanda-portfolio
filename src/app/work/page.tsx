'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
};

// Pre-compute sliced tags to avoid inline Array.slice in the render loop
const topTagsByProjectId = new Map(projects.map((p) => [p.id, p.tags.slice(0, 4)]));
const EMPTY_TAGS: string[] = [];

// Category → status tag color
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI Automation':       { bg: 'rgba(6,182,212,0.1)',    text: '#06b6d4',  border: 'rgba(6,182,212,0.25)' },
  'Business Automation': { bg: 'rgba(0,245,255,0.08)',   text: '#00f5ff',  border: 'rgba(0,245,255,0.2)' },
  'Web Application':     { bg: 'rgba(139,92,246,0.1)',   text: '#a78bfa',  border: 'rgba(139,92,246,0.2)' },
  'AI Product':          { bg: 'rgba(6,182,212,0.1)',    text: '#06b6d4',  border: 'rgba(6,182,212,0.25)' },
  'Infrastructure':      { bg: 'rgba(45,27,105,0.4)',    text: '#c4b5fd',  border: 'rgba(139,92,246,0.2)' },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] ?? { bg: 'rgba(6,182,212,0.1)', text: '#06b6d4', border: 'rgba(6,182,212,0.2)' };
}

export default function WorkPage() {
  return (
    <div
      className="min-h-screen pt-32 pb-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0816 30%, #0a0a0a 100%)' }}
    >
      {/* Background texture & aurora */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Aurora blobs */}
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[500px] rounded-full blur-[160px] opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #1a0a2e 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[400px] rounded-full blur-[140px] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)' }}
        />
        {/* Top glow divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-25"
          style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #00f5ff, #06b6d4, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span
            className="text-xs font-medium tracking-[0.2em] uppercase mb-4 block"
            style={{ color: '#06b6d4' }}
          >
            Selected Work
          </span>
          <h1 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-4">
            Projects & Case Studies
          </h1>
          <p className="text-brand-gray-300 text-lg font-light max-w-xl leading-relaxed">
            A selection of work spanning AI systems, web products, and infrastructure built for real outcomes.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project) => {
            const catStyle = getCategoryStyle(project.category);
            return (
              <motion.div key={project.id} variants={item}>
                <Link
                  href={`/work/${project.id}`}
                  className="group block relative rounded-sm overflow-hidden transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #120820 0%, #0d0816 100%)',
                    border: '1px solid rgba(6,182,212,0.08)',
                  }}
                >
                  {/* Hover glow overlay */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(0,245,255,0.02) 50%, transparent 100%)' }}
                  />
                  {/* Border glow on hover */}
                  <span
                    className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: '0 0 0 1px rgba(6,182,212,0.2), inset 0 0 40px rgba(6,182,212,0.03)' }}
                  />

                  {/* Accent sweep line on hover */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                    style={{ background: `linear-gradient(90deg, ${project.accentColor}, #06b6d4, #00f5ff)` }}
                  />

                  {/* Image / visual area */}
                  <div
                    className="relative h-48 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(26,10,46,0.8) 0%, rgba(13,8,22,1) 100%)`,
                    }}
                  >
                    {/* Abstract pattern unique per project */}
                    <div
                      className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500"
                      style={{
                        backgroundImage: `radial-gradient(ellipse at 30% 50%, ${project.accentColor}40 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, #06b6d430 0%, transparent 50%)`,
                      }}
                    />
                    {/* Grid accent in image area */}
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                    />
                    {/* Category badge top-right */}
                    <div className="absolute top-4 right-4">
                      <span
                        className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm backdrop-blur-sm"
                        style={{
                          background: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    {/* Year bottom-left */}
                    <div className="absolute bottom-4 left-5">
                      <span className="text-xs text-brand-gray-500 font-light">{project.year}</span>
                    </div>
                    {/* Glowing orb center */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ background: project.accentColor }}
                    />
                    {/* Fade bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#120820] to-transparent" />
                  </div>

                  {/* Card body */}
                  <div className="p-6 md:p-7 relative">
                    {/* Title */}
                    <h2 className="text-xl font-light text-brand-white tracking-[-0.01em] mb-3 group-hover:text-white transition-colors">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-brand-gray-300 text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Outcome pill */}
                    {project.outcome && (
                      <div
                        className="text-xs leading-relaxed mb-5 px-3 py-2 rounded-sm"
                        style={{
                          background: 'rgba(6,182,212,0.06)',
                          borderLeft: '2px solid rgba(6,182,212,0.3)',
                          color: '#a0a0a0',
                        }}
                      >
                        <span className="text-brand-gray-500 font-medium mr-1">Result:</span>
                        {project.outcome}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {/* O(1) lookup map instead of inline array.slice */}
                      {(topTagsByProjectId.get(project.id) ?? EMPTY_TAGS).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-brand-gray-500 px-2 py-0.5 rounded-sm"
                          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 text-sm transition-colors duration-300"
                      style={{ color: '#06b6d4' }}
                    >
                      <span className="text-brand-gray-500 group-hover:text-brand-white transition-colors duration-300">
                        Case Study
                      </span>
                      <ArrowRightIcon className="text-brand-gray-500 group-hover:text-white translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <p className="text-brand-gray-500 text-sm mb-6">
            Have a project in mind?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
          >
            Let&apos;s talk
            <ArrowRightIcon />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
