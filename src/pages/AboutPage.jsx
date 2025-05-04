import React from 'react';
import About from '../components/sections/About';
import styles from '../styles/pages/pageStyles.module.css';

const AboutPage = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>About Me</h1>
          <p className={styles.pageDescription}>
            Learn more about my background, skills, and journey in software development.
          </p>
        </div>
      </div>
      <About />
    </>
  );
};

export default AboutPage;