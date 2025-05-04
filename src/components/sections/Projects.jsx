import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/projects.module.css';
import { projects } from '../../data/projects';

const Projects = ({ limit }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Extract unique categories from projects
    const allCategories = ['All', ...new Set(projects.flatMap(project => project.categories))];
    setCategories(allCategories);
    
    // Filter and limit projects
    const filtered = selectedCategory === 'All' 
      ? projects 
      : projects.filter(project => project.categories.includes(selectedCategory));
      
    const limited = limit ? filtered.slice(0, limit) : filtered;
    setVisibleProjects(limited);
    
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
    
    const section = document.getElementById('projects-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [selectedCategory, limit]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  return (
    <section id="projects-section" className={`${styles.projectsSection} section`}>
      <div className="container">
        <h2 className={`section-title ${isInView ? 'fade-in-up' : ''}`}>
          Featured Projects
        </h2>
        <p className={`section-description ${isInView ? 'fade-in-up stagger-1' : ''}`}>
          Explore a selection of my recent work showcasing my expertise in software development,
          problem-solving, and design thinking.
        </p>
        
        <div className={`${styles.categoriesFilter} ${isInView ? 'fade-in-up stagger-2' : ''}`}>
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
        
        <div className={styles.projectsGrid}>
          {visibleProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`${styles.projectCard} ${isInView ? `fade-in-up stagger-${index % 5 + 3}` : ''}`}
            >
              <div className={styles.projectImageContainer}>
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className={styles.projectImage}
                />
                <div className={styles.projectOverlay}>
                  <div className={styles.projectLinks}>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      aria-label={`View live project: ${project.title}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      aria-label={`View repository: ${project.title}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className={styles.projectTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {limit && visibleProjects.length > 0 && (
          <div className={`${styles.viewAllContainer} ${isInView ? 'fade-in-up stagger-5' : ''}`}>
            <Link to="/projects" className={styles.viewAllBtn}>
              View All Projects 
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

export default Projects;