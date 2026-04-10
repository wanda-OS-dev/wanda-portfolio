'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, FormEvent } from 'react';
import { escapeHtml } from '@/lib/validation';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('wanda.devops@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const data = new FormData(e.currentTarget);

    // Security enhancement: Enforce input length limits and trim to prevent DoS/payload issues
    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      setErrorMsg('All fields are required.');
      setState('error');
      return;
    }

    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      setErrorMsg('Input exceeds maximum allowed length.');
      setState('error');
      return;
    }

    // Security enhancement: Strict email validation to prevent malformed payloads
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Invalid email format.');
      setState('error');
      return;
    }

    // Security enhancement: Sanitize inputs to prevent XSS payloads from being forwarded
    const sanitizedData = new FormData();
    sanitizedData.append('name', escapeHtml(name));
    sanitizedData.append('email', escapeHtml(email));
    sanitizedData.append('message', escapeHtml(message));

    try {
      const res = await fetch('https://formspree.io/f/xpwzogdb', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: sanitizedData,
      });
      if (res.ok) {
        setState('success');
        setMessageLength(0);
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
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:wanda.devops@gmail.com"
                    className="text-brand-white hover:text-brand-gold transition-colors duration-300"
                  >
                    wanda.devops@gmail.com
                  </a>
                  <button
                    onClick={handleCopy}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
                    title={copied ? "Copied!" : "Copy to clipboard"}
                    className="text-brand-gray-500 hover:text-brand-gold transition-colors duration-300 p-1 relative"
                  >
                    {copied ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        aria-hidden="true"
                        className="text-xs text-brand-gold ml-2"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {/* Invisible live region for screen readers */}
                  <span
                    className="sr-only"
                    aria-live="polite"
                  >
                    {copied ? 'Email copied to clipboard' : ''}
                  </span>
                </div>
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
              <div className="flex flex-col items-center justify-center h-full py-16 text-center" aria-live="polite">
                <div className="w-12 h-12 rounded-full border border-brand-gold flex items-center justify-center mb-6">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
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
                <button
                  onClick={() => setState('idle')}
                  className="mt-8 text-sm text-brand-gold hover:text-brand-white transition-colors duration-300 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block mb-2">
                    Name <span className="text-brand-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={state === 'sending'}
                    className="w-full bg-transparent border border-white/[0.1] text-brand-white placeholder-brand-gray-500 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-brand-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block mb-2">
                    Email <span className="text-brand-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="your@email.com"
                    autoComplete="email"
                    disabled={state === 'sending'}
                    className="w-full bg-transparent border border-white/[0.1] text-brand-white placeholder-brand-gray-500 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-brand-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor="message" className="text-xs font-medium tracking-widest uppercase text-brand-gray-500 block">
                      Message <span className="text-brand-gold" aria-hidden="true">*</span>
                    </label>
                    <span className="text-xs text-brand-gray-500" aria-hidden="true">
                      {messageLength} / 5000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    placeholder="Tell us about your project..."
                    disabled={state === 'sending'}
                    onChange={(e) => setMessageLength(e.target.value.length)}
                    className="w-full bg-transparent border border-white/[0.1] text-brand-white placeholder-brand-gray-500 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-brand-gold transition-colors duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Error */}
                {state === 'error' && (
                  <p className="text-red-400 text-sm" role="alert" aria-live="assertive">{errorMsg}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-black font-medium text-sm py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === 'sending' && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
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
