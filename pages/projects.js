import Head from 'next/head';
import ProjectCard from '../components/ProjectCard';
import styles from '../styles/Projects.module.css';
import projects from '../data/projects.json';

/**
 * Projects page.
 * Iterates through the projects JSON and renders a ProjectCard for each entry.
 *
 * @returns {JSX.Element} Projects showcase page.
 */
export default function Projects() {
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
        <header className={styles.header}>
          <h1 className={styles.title}>Project Launchpad</h1>
          <p className={styles.subtitle}>
            Explore a gallery of playful prototypes, AI adventures, and polished builds.
          </p>
        </header>

        <section className={styles.grid} aria-label="Project cards">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tech={project.tech}
              image={project.image}
              url={project.url}
            />
          ))}
        </section>
      </main>
    </>
  );
}

