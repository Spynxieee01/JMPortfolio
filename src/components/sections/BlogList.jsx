import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/blogList.module.css';
import BlogCard from '../blog/BlogCard';
import { blogPosts } from '../../data/blogPosts';

const BlogList = ({ limit }) => {
  const [isInView, setIsInView] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Filter posts based on selected category and search query
    let filteredPosts = [...blogPosts];
    
    if (selectedCategory !== 'All') {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      filteredPosts = filteredPosts.slice(0, limit);
    }
    
    setPosts(filteredPosts);
  }, [selectedCategory, searchQuery, limit]);
  
  useEffect(() => {
    // Intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('blog-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  // Extract unique categories from blog posts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <section id="blog-section" className={`${styles.blogSection} section`}>
      <div className="container">
        <h2 className={`section-title ${isInView ? 'fade-in-up' : ''}`}>
          From The Blog
        </h2>
        <p className={`section-description ${isInView ? 'fade-in-up stagger-1' : ''}`}>
          Insights, tutorials, and reflections on software engineering, technology trends, and professional growth.
        </p>
        
        {!limit && (
          <div className={`${styles.blogFilters} ${isInView ? 'fade-in-up stagger-2' : ''}`}>
            <div className={styles.categoriesFilter}>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search articles..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        )}
        
        {posts.length > 0 ? (
          <div className={styles.blogGrid}>
            {posts.map((post, index) => (
              <BlogCard 
                key={post.id}
                post={post}
                className={isInView ? `fade-in-up stagger-${index % 5 + 3}` : ''}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noPosts}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3>No articles found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {limit && posts.length > 0 && (
          <div className={`${styles.viewAllContainer} ${isInView ? 'fade-in-up stagger-5' : ''}`}>
            <Link to="/blog" className={styles.viewAllBtn}>
              View All Articles
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;