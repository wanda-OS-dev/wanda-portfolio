import Link from 'next/link';
import { projects } from '@/lib/projects';

const featuredProjects = projects.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-black">
        <div className="absolute inset-0 pointer-events-none" style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(26,10,46,0.45) 0%, rgba(10,10,10,1) 80%)',
        }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-8">
              <span className="w-4 h-px bg-brand-gold opacity-60" />
              AI Automation Studio
            </span>

            <h1 className="text-display font-light text-brand-white leading-[0.95] tracking-[-0.03em] mb-8">
              Build what
              <br />
              <span className="text-brand-gold">others</span>
              <br />
              automate later.
            </h1>

            <p className="text-brand-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg">
              I design and ship autonomous AI systems, high-performance web products, and
              infrastructure that compounds over time.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-brand-white text-sm px-7 py-3.5 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0816 50%, #0a0a0a 100%)' }}>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase mb-3 block" style={{ color: '#06b6d4' }}>
                Featured Work
              </span>
              <h2 className="text-heading font-light text-brand-white tracking-[-0.02em]">Selected Projects</h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300"
            >
              All projects
            </Link>
          </div>

          <div className="space-y-4">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-sm transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(18,8,32,0.9) 0%, rgba(13,8,22,0.95) 100%)',
                  border: '1px solid rgba(6,182,212,0.08)',
                }}
              >
                <div className="flex items-start md:items-center gap-6 flex-1 relative">
                  <span className="text-xs font-medium text-brand-gray-500 w-6 flex-shrink-0 pt-1 md:pt-0">
                    {String(index + 1).padStart(2, '0')}
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
                    <p className="text-brand-gray-500 text-sm leading-relaxed line-clamp-1">{project.description}</p>
                  </div>
                </div>

                {project.outcome && (
                  <div className="hidden lg:block text-xs text-brand-gray-500 max-w-[220px] text-right leading-snug">
                    {project.outcome}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <span className="text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-6 block">Let's build</span>
          <h2 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-6 max-w-xl mx-auto">
            Have something worth building?
          </h2>
          <p className="text-brand-gray-300 text-lg font-light mb-10 max-w-md mx-auto leading-relaxed">
            First conversation is always free. No pitch — I listen, then tell you honestly if and how I can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-8 py-4 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
