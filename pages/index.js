import { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import MusicPlayer from '../components/MusicPlayer';
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

        {/* Optional music player in top-right corner */}
        <MusicPlayer />

        {/* Featured projects carousel */}
        <FeaturedCarousel projects={projectsData} />

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.hero}
        >
          <h1 className={styles.title}>Guerrilla Social Club</h1>
          <p className={styles.subtitle}>
            A playground of ideas by Joseph Tabora
          </p>
        </motion.div>

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
                  category={project.category}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

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

