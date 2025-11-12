import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

/**
 * Navbar Component
 * 
 * Minimal navigation bar with logo and login button.
 * Features smooth hover animations and futuristic styling.
 * 
 * @returns {JSX.Element} Navigation bar component.
 */
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo/Brand Name */}
        <Link href="/" className={styles.logo}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Guerrilla Social Club
          </motion.span>
        </Link>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/projects" className={styles.navLink}>
            Projects
          </Link>
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

