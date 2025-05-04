import React from 'react';
import Projects from '../components/sections/Projects';
import styles from '../styles/pages/pageStyles.module.css';

const ProjectsPage = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Projects</h1>
          <p className={styles.pageDescription}>
            Explore my portfolio of software development and design work.
          </p>
        </div>
      </div>
      <Projects />
    </>
  );
};

export default ProjectsPage;