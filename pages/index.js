import { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import styles from '../styles/Home.module.css';
// Import all project data from the JSON file
// This file contains all your projects - add new ones here and they'll appear automatically!
import projectsData from '../data/projects.json';

/**
 * Home page for Guerrilla Playground.
 * 
 * This is the main landing page that dynamically displays all your projects.
 * It reads from /data/projects.json and automatically creates cards for each project.
 * 
 * Features:
 * - Rotating carousel of featured projects
 * - Filterable project grid by category
 * - Optional background music player
 * - All projects displayed as interactive cards
 *
 * @returns {JSX.Element} Home page view.
 */
export default function Home() {
  // State to track which category filter is currently active
  // null means "show all projects"
  const [activeFilter, setActiveFilter] = useState(null);

  // Extract unique categories from all projects
  // This creates the filter buttons automatically based on what categories exist
  const categories = useMemo(() => {
    // Get all category values from projects
    const cats = projectsData
      .map((p) => p.category)
      .filter((cat) => cat != null); // Remove any null/undefined categories
    // Return only unique categories (no duplicates)
    return [...new Set(cats)];
  }, []);

  // Filter projects based on the selected category
  // This determines which projects to show in the grid
  const filteredProjects = useMemo(() => {
    // If no filter is active, show all projects
    if (activeFilter === null) {
      return projectsData;
    }
    // Otherwise, only show projects matching the selected category
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

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
        {/* Minimal navigation bar */}
        <Navbar />

        {/* Hero section */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={styles.hero}
        >
          <div className={styles.heroBadge}>CREATIVE PLAYGROUND — 2025</div>

          <motion.h1
            className={styles.heroDisplay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
          >
            <span className={styles.heroAccent}>Guerrilla</span>
            Social Club
          </motion.h1>

          <p className={styles.heroSubtitle}>
            We build experimental AI products and pixel-perfect launch experiences
            for makers, dreamers, and unapologetic creatives.
          </p>

          <div className={styles.heroMeta}>
            <div>
              <span>Focus</span>
              Creative AI tools · Immersive storytelling · Launch platforms
            </div>
            <div>
              <span>Studios</span>
              San Francisco · Manila · Remote first
            </div>
            <div>
              <span>Status</span>
              Accepting select collaborations & playground partners
            </div>
          </div>
        </motion.section>

        {/* Filter bar */}
        <FilterBar
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* 
          PROJECT GRID SECTION
          This is where all your projects are displayed dynamically.
          
          How it works:
          1. We map through filteredProjects (all projects or filtered by category)
          2. For each project, we create a ProjectCard component
          3. Each card shows: title, description, tech stack, image, and buttons
          4. The grid automatically adjusts to show all projects
          
          To add a new project: Just add it to /data/projects.json and it will appear here!
        */}
        <section className={styles.projectsSection} aria-label="Project showcase">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter || 'all'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={styles.grid}
            >
              {/* 
                MAP THROUGH ALL PROJECTS
                This loop goes through each project in the filteredProjects array
                and creates a ProjectCard for each one.
                
                The .map() function takes each project object and transforms it
                into a ProjectCard component with all the project's data.
              */}
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
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Minimal footer with studio links */}
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
            Guerrilla Social Club © {new Date().getFullYear()} · Built with imaginative code & restless curiosity.
          </p>
        </footer>
      </main>
    </>
  );
}

