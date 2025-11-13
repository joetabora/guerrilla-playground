import { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import styles from '../styles/Projects.module.css';
import projects from '../data/projects.json';

/**
 * Projects page.
 * Displays all projects with category filtering and animated transitions.
 *
 * @returns {JSX.Element} Projects showcase page.
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState(null);

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const cats = projects
      .map((p) => p.category)
      .filter((cat) => cat != null);
    return [...new Set(cats)];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (activeFilter === null) {
      return projects;
    }
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <Head>
        <title>Projects | Guerrilla Social Club</title>
        <meta
          name="description"
          content="Browse Joseph Tabora's creative AI and app experiments."
        />
      </Head>

      <main className={styles.page}>
        {/* Minimal navigation bar */}
        <Navbar />

        <header className={styles.header}>
          <h1 className={styles.title}>Project Launchpad</h1>
          <p className={styles.subtitle}>
            Explore a gallery of playful prototypes, AI adventures, and polished builds.
          </p>
        </header>

        {/* Filter bar */}
        <FilterBar
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Project grid with animated filtering */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeFilter || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={styles.grid}
            aria-label="Project cards"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tech={project.tech}
                image={project.image}
                url={project.url}
                liveUrl={project.liveUrl}
                codeUrl={project.codeUrl}
                status={project.status}
                category={project.category}
              />
            ))}
          </motion.section>
        </AnimatePresence>
      </main>
    </>
  );
}

