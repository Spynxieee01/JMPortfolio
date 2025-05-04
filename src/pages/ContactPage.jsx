import React from 'react';
import Contact from '../components/sections/Contact';
import styles from '../styles/pages/pageStyles.module.css';

const ContactPage = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Contact</h1>
          <p className={styles.pageDescription}>
            Let's connect! Reach out for collaboration opportunities or to discuss your project.
          </p>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default ContactPage;