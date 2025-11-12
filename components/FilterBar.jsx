import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './FilterBar.module.css';

/**
 * FilterBar component.
 * 
 * Provides category filtering for projects with animated pill-style buttons.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.categories - Array of unique category strings.
 * @param {string} props.activeFilter - Currently selected category (null for "All").
 * @param {Function} props.onFilterChange - Callback when filter changes.
 * @returns {JSX.Element} Filter bar component.
 */
export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  const allCategories = ['All', ...categories];

  return (
    <div className={styles.filterBar} role="group" aria-label="Filter projects by category">
      {allCategories.map((category) => {
        const isActive = (category === 'All' && activeFilter === null) || category === activeFilter;
        
        return (
          <motion.button
            key={category}
            className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
            onClick={() => onFilterChange(category === 'All' ? null : category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={isActive}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}

FilterBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

