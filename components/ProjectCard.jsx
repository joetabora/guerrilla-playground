import Image from 'next/image';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

/**
 * ProjectCard component.
 *
 * Presents a single creative project with an animated entry,
 * hover elevation, and whimsical styling that matches the
 * overall Guerrilla Playground aesthetic.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Name of the project.
 * @param {string} props.description - Short summary of the experience.
 * @param {string[]} props.tech - Technologies used to build the project.
 * @param {string} props.image - Path to the project's display image.
 * @param {string} props.url - URL where the project is deployed.
 * @returns {JSX.Element} Rendered project card.
 */
export default function ProjectCard({ title, description, tech, image, url }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image wrapper ensures consistent aspect ratio and rounded corners */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {/* Tech stack list displayed as pastel badges */}
        <ul className={styles.techList}>
          {tech.map((item) => (
            <li key={item} className={styles.techItem}>
              {item}
            </li>
          ))}
        </ul>

        <a
          className={styles.launchButton}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Launch Project
        </a>
      </div>
    </motion.article>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tech: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

