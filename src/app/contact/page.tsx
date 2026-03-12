'use client';

import { motion } from 'framer-motion';
import { useState, useRef, FormEvent } from 'react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formspree.io/f/xpwzogdb', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setState('success');
        formRef.current?.reset();
      } else {
        setErrorMsg('Submission failed. Please email us directly.');
        setState('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setState('error');
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand-gold text-xs font-medium tracking-[0.2em] uppercase mb-6 block">
              Contact
            </span>
            <h1 className="text-heading font-light text-brand-white tracking-[-0.02em] mb-8">
              Let&apos;s build
              <br />
              something.
            </h1>
            <p className="text-brand-gray-300 font-light leading-relaxed mb-10">
              We work with founders, operators, and engineering teams on high-stakes automation and
              AI integration. Every engagement starts with a conversation.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 mb-1">
                  Email
                </p>
                <a
                  href="mailto:wanda.devops@gmail.com"
                  className="text-brand-white hover:text-brand-gold transition-colors duration-300"
                >
                  wanda.devops@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 mb-1">
                  Availability
                </p>
                <p className="text-brand-gray-300 text-sm">
                  Accepting inquiries. Response within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {state === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-12 h-12 rounded-full border border-brand-gold flex items-center justify-center mb-6">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-brand-white mb-2">Message sent.</h3>
                <p className="text-brand-gray-500 text-sm">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border border-white/[0.1] text-brand-white placeholder-brand-gray-500 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-brand-gold transition-colors duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-white/[0.1] text-brand-white placeholder-brand-gray-500 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-brand-gold transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full bg-transparent border border-white/[0.1] text-brand-white placeholder-brand-gray-500 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-brand-gold transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Error */}
                {state === 'error' && (
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="w-full bg-brand-gold text-brand-black font-medium text-sm py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
