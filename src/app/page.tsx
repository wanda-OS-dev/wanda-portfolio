'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { projects } from '@/lib/projects';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

// Dynamic import to avoid SSR issues with WebGL
const HeroScene = dynamic(
  () => import('@/components/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

// Show top 3 featured projects on homepage
const featuredProjects = projects.slice(0, 3);

const stats = [
  { value: '40%+', label: 'Avg. cost reduction via automation' },
  { value: '< 8W', label: 'Time-to-production for AI systems' },
  { value: '24/7', label: 'Autonomous agents — zero downtime' },
  { value: '100%', label: 'Custom — no off-the-shelf solutions' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Canvas Background */}
        <HeroScene />

        

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.span
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-8"
            >
              <span className="w-4 h-px bg-brand-gold opacity-60" />
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
              I design and ship autonomous AI systems, high-performance web products, and
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
                <ArrowRightIcon />
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

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gray-500"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-gray-500 to-transparent" />
        </motion.div>
      </section>

      {/* ── ABOUT / INTRO ── */}
      <section className="relative py-32 overflow-hidden">
        {/* Subtle indigo aurora */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, #1a0a2e 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left: personal intro */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gold mb-4 block">
                Who I am
              </span>
              <h2 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-6 leading-[1.1]">
                Engineer.<br />
                Entrepreneur.<br />
                <span className="text-brand-gray-500">Builder.</span>
              </h2>
              <p className="text-brand-gray-300 text-lg font-light leading-relaxed mb-6">
                I build AI systems that actually work — not demos. Multi-agent architectures,
                real-time pipelines, and SaaS products that ship fast and scale.
              </p>
              <p className="text-brand-gray-500 leading-relaxed mb-10">
                Based in Hamburg. Working globally. I take on a small number of projects at a time
                so I can bring full focus to what we build together.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brand-gold text-sm hover:gap-4 transition-all duration-300"
              >
                More about me
                <ArrowRightIcon />
              </Link>
            </motion.div>

            {/* Right: stats/values */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26,10,46,0.6) 0%, rgba(13,8,22,0.8) 100%)',
                    border: '1px solid rgba(6,182,212,0.1)',
                  }}
                >
                  <p className="text-2xl font-light text-brand-white mb-1 tracking-[-0.02em]">{stat.value}</p>
                  <p className="text-xs text-brand-gray-500 leading-snug">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="relative py-24" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0816 50%, #0a0a0a 100%)' }}>
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Cyan glow accent top */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #00f5ff, #06b6d4, transparent)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase mb-3 block" style={{ color: '#06b6d4' }}>
                Featured Work
              </span>
              <h2 className="text-heading font-light text-brand-white tracking-[-0.02em]">
                Selected Projects
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300"
            >
              All projects
              <ArrowRightIcon />
            </Link>
          </motion.div>

          <div className="space-y-4">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/work/${project.id}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-sm transition-all duration-500 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(18,8,32,0.9) 0%, rgba(13,8,22,0.95) 100%)',
                    border: '1px solid rgba(6,182,212,0.08)',
                  }}
                >
                  {/* Hover glow */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
                    style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.04) 0%, transparent 60%)' }}
                  />
                  {/* Top accent line on hover */}
                  <span
                    className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: `linear-gradient(90deg, ${project.accentColor}, #06b6d4)` }}
                  />

                  <div className="flex items-start md:items-center gap-6 flex-1 relative">
                    {/* Index */}
                    <span className="text-xs font-medium text-brand-gray-500 w-6 flex-shrink-0 pt-1 md:pt-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-lg md:text-xl font-light text-brand-white group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <span
                          className="text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-sm"
                          style={{
                            background: 'rgba(6,182,212,0.1)',
                            color: '#06b6d4',
                            border: '1px solid rgba(6,182,212,0.2)',
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                      <p className="text-brand-gray-500 text-sm leading-relaxed line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 relative flex-shrink-0">
                    {project.outcome && (
                      <span className="hidden lg:block text-xs text-brand-gray-500 max-w-[200px] text-right leading-snug">
                        {project.outcome}
                      </span>
                    )}
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="text-brand-gray-500 group-hover:text-brand-cyan translate-x-0 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                      style={{ color: 'inherit' }}
                    >
                      <path
                        d="M4 10h12M11 5l5 5-5 5"
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
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center md:hidden"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300"
            >
              All projects
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </div>

        {/* Cyan glow accent bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #00f5ff, #06b6d4, transparent)' }}
        />
      </section>

      {/* ── CTA ── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-6 block">
              Let&apos;s build
            </span>
            <h2 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-6 max-w-xl mx-auto">
              Have something worth building?
            </h2>
            <p className="text-brand-gray-300 text-lg font-light mb-10 max-w-md mx-auto leading-relaxed">
              First conversation is always free. No pitch — I listen first, then map a concrete next step. Case studies are available on request.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-8 py-4 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
            >
              Start a conversation
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
