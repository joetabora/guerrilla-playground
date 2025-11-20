/**
 * ContactForm - contact form with confetti on success
 * Includes brand/creator toggle and file upload stub
 */
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { initialState, handleContact } from '@/app/actions/contact';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {pending ? 'Sending...' : 'Send Message'}
    </motion.button>
  );
};

export default function ContactForm() {
  const [state, formAction] = useFormState(handleContact, initialState);
  const confettiTriggered = useRef(false);

  // Trigger confetti on success
  useEffect(() => {
    if (state.status === 'success' && !confettiTriggered.current) {
      confettiTriggered.current = true;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2D95', '#A6FF00', '#00FFD6', '#FFFFFF']
      });
      // Reset after animation
      setTimeout(() => {
        confettiTriggered.current = false;
      }, 3000);
    }
  }, [state.status]);

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto bg-ink border border-white/10 rounded-2xl p-8 space-y-6"
      aria-label="Contact form"
    >
      <div>
        <h2 className="text-3xl font-black text-white mb-2">Let&apos;s Talk</h2>
          <p className="text-white/60 text-sm">Fill out the form and we&apos;ll get back to you within 24 hours.</p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Name *
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-magenta transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Email *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-magenta transition-colors"
          placeholder="you@example.com"
        />
      </div>

      {/* Company/Handle */}
      <div>
        <label htmlFor="company" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Company / Handle
        </label>
        <input
          id="company"
          name="company"
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-magenta transition-colors"
          placeholder="@yourbrand"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-magenta transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      {/* File Upload Stub */}
      <div>
        <label htmlFor="file" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Attach Files (Optional)
        </label>
        <input
          id="file"
          type="file"
          name="file"
          multiple
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white/60 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-magenta file:text-white file:cursor-pointer hover:file:bg-magenta/90"
        />
        <p className="text-white/40 text-xs mt-2">Max file size: 10MB. Supported: PDF, JPG, PNG</p>
      </div>

      {/* Submit Button */}
      <SubmitButton />

      {/* Status Messages */}
      <AnimatePresence>
        {state.status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg ${
              state.status === 'success'
                ? 'bg-lime/20 border border-lime text-lime'
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}
            role="status"
          >
            <p className="font-bold text-sm">{state.message || (statusCopy[state.status] ?? '')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

const statusCopy = {
  success: 'Message sent! We\'ll get back to you soon.',
  error: 'Something went wrong. Please try again.'
};
