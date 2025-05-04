import React from 'react';
import BlogList from '../components/sections/BlogList';
import styles from '../styles/pages/pageStyles.module.css';

const BlogListPage = () => {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Blog</h1>
          <p className={styles.pageDescription}>
            Thoughts, insights, and tutorials on software development and technology.
          </p>
        </div>
      </div>
      <BlogList />
    </>
  );
};

export default BlogListPage;