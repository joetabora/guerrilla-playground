import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectCard.module.css';

/**
 * ProjectCard Component
 * 
 * This component displays a single project as an interactive card.
 * Each card shows all the project information and provides buttons
 * to preview or launch the project.
 * 
 * What this component displays:
 * - Project title (heading)
 * - Short description (paragraph text)
 * - Tech stack badges (list of technologies used)
 * - Project image (visual preview)
 * - Preview button (opens live preview iframe if liveUrl exists)
 * - Launch button (opens the project in a new tab)
 * 
 * Animations:
 * - Fade-in when the card first appears
 * - Lifts up slightly on hover (with shadow intensifying)
 * - Smooth expand/collapse for preview section
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Name of the project.
 * @param {string} props.description - Short summary of the experience.
 * @param {string[]} props.tech - Technologies used to build the project.
 * @param {string} props.image - Path to the project's display image.
 * @param {string} props.url - URL where the project is deployed.
 * @param {string} [props.liveUrl] - Optional URL for live preview iframe.
 * @param {string} [props.category] - Optional category for filtering.
 * @returns {JSX.Element} Rendered project card.
 */
export default function ProjectCard({ title, description, tech, image, url, liveUrl, category }) {
  // State to track if the preview section is open or closed
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Function to toggle the preview section open/closed
  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <motion.article
      className={styles.card}
      // Animation: Card fades in and slides up when it first appears
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      // Hover effect: Card lifts up and scales slightly when mouse hovers over it
      whileHover={{ y: -6, scale: 1.02 }}
      // Click effect: Card scales down slightly when clicked
      whileTap={{ scale: 0.98 }}
    >
      {/* 
        PROJECT IMAGE
        Displays the project's preview image with consistent sizing
      */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      {/* 
        CARD CONTENT SECTION
        Contains all the text and buttons for the project
      */}
      <div className={styles.content}>
        {/* Project title */}
        <h3 className={styles.title}>{title}</h3>
        
        {/* Project description */}
        <p className={styles.description}>{description}</p>

        {/* 
          TECH STACK BADGES
          Maps through the tech array and creates a badge for each technology
          These appear as small pill-shaped badges with pastel colors
        */}
        <ul className={styles.techList}>
          {tech.map((item) => (
            <li key={item} className={styles.techItem}>
              {item}
            </li>
          ))}
        </ul>

        {/* 
          ACTION BUTTONS
          Preview button: Only shows if liveUrl exists, opens/closes preview iframe
          Launch button: Always shows, opens project in new tab
        */}
        <div className={styles.buttonGroup}>
          {/* Preview button - only shows if project has a liveUrl */}
          {liveUrl && (
            <button
              className={styles.previewButton}
              onClick={togglePreview}
              aria-expanded={isPreviewOpen}
              aria-label={`${isPreviewOpen ? 'Close' : 'Open'} preview for ${title}`}
            >
              {isPreviewOpen ? 'Close Preview' : 'Preview'}
            </button>
          )}
          {/* Launch button - opens project in new tab, uses liveUrl if available, otherwise uses url */}
          <a
            className={styles.launchButton}
            href={liveUrl || url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch Project
          </a>
        </div>
      </div>

      {/* 
        EXPANDABLE PREVIEW SECTION
        This section smoothly expands when the Preview button is clicked.
        It shows either:
        - A live iframe preview of the project (if liveUrl exists)
        - A "Coming Soon" message (if no liveUrl)
      */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            // Animation: Smoothly expands from height 0 to full height
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={styles.previewSection}
          >
            {liveUrl ? (
              // Live preview iframe - embeds the actual project website
              <div className={styles.iframeWrapper}>
                <iframe
                  src={liveUrl}
                  title={`${title} live preview`}
                  className={styles.previewIframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              // Placeholder message if no live preview is available
              <div className={styles.comingSoon}>
                <p>Coming Soon</p>
                <span className={styles.comingSoonIcon}>✨</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tech: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  liveUrl: PropTypes.string,
  category: PropTypes.string,
};

