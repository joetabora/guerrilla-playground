import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './FeaturedCarousel.module.css';

/**
 * FeaturedCarousel component.
 * 
 * Displays a rotating carousel of featured projects at the top of the homepage.
 * Automatically cycles through featured projects with smooth fade transitions.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.projects - Array of project objects with featured: true.
 * @returns {JSX.Element} Featured carousel component.
 */
export default function FeaturedCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = projects.filter((p) => p.featured);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (featuredProjects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  if (featuredProjects.length === 0) {
    return null;
  }

  const currentProject = featuredProjects[currentIndex];

  return (
    <section className={styles.carousel} aria-label="Featured projects">
      <div className={styles.carouselContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={styles.slide}
          >
            {/* Background image with overlay */}
            <div className={styles.imageContainer}>
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className={styles.backgroundImage}
                sizes="100vw"
                priority
              />
              <div className={styles.overlay} />
            </div>

            {/* Content overlay */}
            <div className={styles.content}>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={styles.title}
              >
                {currentProject.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={styles.description}
              >
                {currentProject.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/projects" className={styles.exploreButton}>
                  Explore Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {featuredProjects.length > 1 && (
          <>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              className={`${styles.navButton} ${styles.navButtonRight}`}
              onClick={goToNext}
              aria-label="Next slide"
            >
              →
            </button>
          </>
        )}

        {/* Dot indicators */}
        {featuredProjects.length > 1 && (
          <div className={styles.dots}>
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

FeaturedCarousel.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    })
  ).isRequired,
};

