import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

/**
 * Home page for Guerrilla Playground.
 * Showcases the hero section with animated logo and quick links.
 *
 * @returns {JSX.Element} Home page view.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>Guerrilla Social Club | Joseph Tabora</title>
        <meta
          name="description"
          content="Guerrilla Social Club — a whimsical portfolio playground by Joseph Tabora."
        />
      </Head>
      <main className={styles.page}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.hero}
        >
          {/* Animated logo built from a book icon and gently pulsing orbs */}
          <motion.div
            className={styles.logoWrapper}
            initial={{ rotate: -6, scale: 0.9 }}
            animate={{
              rotate: [ -6, 6, -6 ],
              scale: [ 0.9, 1.05, 0.9 ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className={styles.logoBook} aria-hidden="true">
              📘
            </span>
            <motion.span
              className={styles.logoGlow}
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
            />
          </motion.div>

          <h1 className={styles.title}>Guerrilla Social Club</h1>
          <p className={styles.subtitle}>
            A playground of ideas by Joseph Tabora
          </p>

          <Link href="/projects" className={styles.ctaButton}>
            Explore Projects
          </Link>
        </motion.div>

        {/* Social links displayed in a pastel footer */}
        <footer className={styles.footer}>
          <nav aria-label="Social links" className={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
              Twitch
            </a>
          </nav>
          <p className={styles.footerNote}>
            Crafted with curiosity, storybook vibes, and a dash of code magic.
          </p>
        </footer>
      </main>
    </>
  );
}

