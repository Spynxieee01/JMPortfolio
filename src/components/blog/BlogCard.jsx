import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/blogCard.module.css';

const BlogCard = ({ post, className = '' }) => {
  // Truncate title if it's too long
  const truncateTitle = (title, maxLength = 60) => {
    return title.length > maxLength 
      ? `${title.substring(0, maxLength)}...` 
      : title;
  };

  // Truncate excerpt if it's too long
  const truncateExcerpt = (excerpt, maxLength = 150) => {
    return excerpt.length > maxLength 
      ? `${excerpt.substring(0, maxLength)}...` 
      : excerpt;
  };

  return (
    <article 
      className={`${styles.blogCard} ${className}`} 
      aria-labelledby={`blog-title-${post.id}`}
    >
      <Link 
        to={`/blog/${post.slug}`} 
        className={styles.blogImageContainer}
        aria-label={`Read more about ${post.title}`}
      >
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className={styles.blogImage}
          loading="lazy"
          width="100%"
          height="220"
        />
        <div className={styles.blogCategory}>
          {post.category}
        </div>
      </Link>
      <div className={styles.blogContent}>
        <div className={styles.blogMeta}>
          <span className={styles.blogDate}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <span className={styles.blogAuthor}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {post.author}
          </span>
        </div>
        <h3 
          id={`blog-title-${post.id}`} 
          className={styles.blogTitle}
        >
          <Link 
            to={`/blog/${post.slug}`} 
            className={styles.titleLink}
          >
            {truncateTitle(post.title)}
          </Link>
        </h3>
        <p className={styles.blogExcerpt}>
          {truncateExcerpt(post.excerpt)}
        </p>
        <div className={styles.blogFooter}>
          <Link 
            to={`/blog/${post.slug}`} 
            className={styles.readMoreLink}
            aria-label={`Continue reading ${post.title}`}
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <div className={styles.blogTags}>
            {post.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className={styles.blogTag}
                title={`Tag: ${tag}`}
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span 
                className={styles.blogTag}
                title={`${post.tags.length - 2} more tags`}
              >
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;