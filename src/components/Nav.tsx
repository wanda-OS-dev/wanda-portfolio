'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 opacity-100 px-6 md:px-10 py-5 flex items-center justify-between transition-colors duration-500 ${
          scrolled ? 'bg-brand-black/80 backdrop-blur-md border-b border-white/[0.04]' : ''
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-brand-white font-medium text-sm tracking-widest uppercase hover:text-brand-gold transition-colors duration-300"
        >
          WandaSystems
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors duration-300 relative group ${
                pathname === href || pathname.startsWith(href + '/')
                  ? 'text-brand-gold'
                  : 'text-brand-gray-300 hover:text-brand-white'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-brand-gold transition-all duration-300 ${
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 py-1 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block h-px bg-brand-white transition-all duration-300 origin-center ${
              menuOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6'
            }`}
          />
          <span
            className={`block h-px bg-brand-white transition-all duration-300 ${
              menuOpen ? 'w-0 opacity-0' : 'w-4'
            }`}
          />
          <span
            className={`block h-px bg-brand-white transition-all duration-300 origin-center ${
              menuOpen ? 'w-6 -rotate-45 -translate-y-[5px]' : 'w-5'
            }`}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={href}
                  className={`text-4xl font-light transition-colors duration-300 ${
                    pathname === href ? 'text-brand-gold' : 'text-brand-white hover:text-brand-gold'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
