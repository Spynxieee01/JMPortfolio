import React from 'react';
import Experience from '../components/sections/Experience';
import styles from '../styles/pages/pageStyles.module.css';

const ExperiencePage = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Experience</h1>
          <p className={styles.pageDescription}>
            A detailed overview of my professional journey and accomplishments.
          </p>
        </div>
      </div>
      <Experience />
    </>
  );
};

export default ExperiencePage;