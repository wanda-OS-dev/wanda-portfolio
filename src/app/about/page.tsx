'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

const skills = [
  { category: 'AI & Automation', items: ['Multi-Agent Systems', 'LLM Orchestration', 'OpenAI / Anthropic', 'Autonomous Workflows', 'RAG Pipelines'] },
  { category: 'Engineering', items: ['TypeScript / Node.js', 'Next.js / React', 'Rust', 'PostgreSQL / Redis', 'Vercel / Cloudflare'] },
  { category: 'Product & Systems', items: ['Systems Design', 'Revenue Automation', 'API Architecture', 'Edge Computing', 'Performance Optimization'] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <motion.span
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-6 block"
        >
          About
        </motion.span>

        {/* Title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-heading font-light text-brand-white tracking-[-0.02em] mb-16 max-w-2xl"
        >
          We build systems
          <br />
          that compound.
        </motion.h1>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp}>
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gray-500 mb-6">
              Philosophy
            </h2>
            <div className="space-y-5">
              <p className="text-brand-gray-300 font-light leading-relaxed">
                WandaSystems is a precision AI automation studio. We don't build feature lists — we
                build leverage. Systems that get better over time, that run while you sleep, that
                multiply the output of every person they touch.
              </p>
              <p className="text-brand-gray-300 font-light leading-relaxed">
                We operate at the intersection of AI research and production engineering. Our work
                is not a demo — it handles real load, real edge cases, and real consequences.
              </p>
              <p className="text-brand-gray-300 font-light leading-relaxed">
                The philosophy is simple: automate everything routine so humans can focus on
                decisions that actually require judgment.
              </p>
            </div>
          </motion.div>

          <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp}>
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gray-500 mb-6">
              Approach
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Precision over breadth', desc: 'We go deep on fewer problems.' },
                { label: 'Production-first', desc: 'Every system ships ready for real traffic.' },
                { label: 'Compounding design', desc: 'Each component improves the whole.' },
                { label: 'Human in the loop', desc: 'Automation for routine. Judgment for decisions.' },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="border border-white/[0.06] p-5 rounded-sm hover:border-brand-gold/30 transition-colors duration-300"
                >
                  <p className="text-brand-white text-sm font-medium mb-1">{label}</p>
                  <p className="text-brand-gray-500 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-24"
        >
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gray-500 mb-8">
            Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
            {skills.map(({ category, items }) => (
              <div key={category} className="bg-brand-black p-8">
                <h3 className="text-sm font-medium text-brand-white mb-5">{category}</h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-brand-gray-500">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: '#c9a84c' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp}>
          <div className="bg-brand-gray-900 border border-white/[0.06] rounded-sm p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-light text-brand-white mb-2">Have a project in mind?</h3>
              <p className="text-brand-gray-500 text-sm">
                We take on a limited number of engagements per quarter.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
            >
              Start a conversation
              <ArrowRightIcon />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
