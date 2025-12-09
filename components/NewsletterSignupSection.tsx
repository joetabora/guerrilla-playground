'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSignupSection() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    console.log('Submitting:', { email, phone });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setPhone('');
    }, 3000);
  };

  return (
    <section className="relative py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white" style={{ letterSpacing: '-0.02em' }}>
            JOIN THE <span className="text-neon-cyan">GUERRILLA</span>
          </h2>
          <p className="text-xl text-white/60">
            Get stream alerts + exclusive Harley deals
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-white font-black mb-2 uppercase text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-6 py-4 bg-gray-900 border-2 border-neon-cyan/30 text-white font-black focus:border-neon-cyan focus:outline-none transition-colors"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-white font-black mb-2 uppercase text-sm">
              Phone (SMS Alerts)
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-6 py-4 bg-gray-900 border-2 border-neon-cyan/30 text-white font-black focus:border-neon-cyan focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitted}
            className="w-full py-6 bg-neon-cyan text-black font-black text-2xl uppercase hover:bg-neon-orange transition-colors shadow-[0_0_30px_rgba(0,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitted ? '✓ JOINED!' : 'SIGN UP'}
          </motion.button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-neon-orange font-black text-lg"
            >
              Welcome to the crew! 🎮🏍️
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

