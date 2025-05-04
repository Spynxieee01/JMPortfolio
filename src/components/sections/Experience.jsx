import { useState, useEffect } from 'react';
import styles from '../../styles/components/experience.module.css';
import { experiences } from '../../data/experiences';

const Experience = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeExperience, setActiveExperience] = useState(experiences[0].id);
  
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
    
    const section = document.getElementById('experience-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  const handleExperienceClick = (id) => {
    setActiveExperience(id);
  };
  
  // Get the currently active experience
  const currentExperience = experiences.find((exp) => exp.id === activeExperience);
  
  return (
    <section id="experience-section" className={`${styles.experienceSection} section`}>
      <div className="container">
        <h2 className={`section-title ${isInView ? 'fade-in-up' : ''}`}>
          Professional Experience
        </h2>
        <p className={`section-description ${isInView ? 'fade-in-up stagger-1' : ''}`}>
          A chronicle of my professional journey, highlighting key roles and accomplishments that have shaped my expertise in software development and leadership.
        </p>
        
        <div className={styles.experienceContainer}>
          <div className={`${styles.experienceNav} ${isInView ? 'fade-in-left' : ''}`}>
            {experiences.map((experience) => (
              <button
                key={experience.id}
                className={`${styles.experienceNavItem} ${activeExperience === experience.id ? styles.active : ''}`}
                onClick={() => handleExperienceClick(experience.id)}
              >
                <div className={styles.experienceNavContent}>
                  <h3 className={styles.experienceNavTitle}>{experience.title}</h3>
                  <p className={styles.experienceNavCompany}>{experience.company}</p>
                  <p className={styles.experienceNavDuration}>{experience.duration}</p>
                </div>
                <div className={styles.experienceNavIndicator}></div>
              </button>
            ))}
          </div>
          
          <div className={`${styles.experienceDetails} ${isInView ? 'fade-in-right' : ''}`}>
            <div className={styles.experienceHeader}>
              <div className={styles.experienceTitleContainer}>
                <h3 className={styles.experienceTitle}>{currentExperience.title}</h3>
                <p className={styles.experienceCompany}>{currentExperience.company}</p>
              </div>
              <div className={styles.experienceMeta}>
                <div className={styles.experienceMetaItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>{currentExperience.type}</span>
                </div>
                <div className={styles.experienceMetaItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{currentExperience.location}</span>
                </div>
                <div className={styles.experienceMetaItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{currentExperience.duration}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.experienceDescription}>
              <p>{currentExperience.description}</p>
            </div>
            
            <div className={styles.experienceResponsibilities}>
              <h4 className={styles.responsibilitiesTitle}>Key Responsibilities & Achievements</h4>
              <ul className={styles.responsibilitiesList}>
                {currentExperience.responsibilities.map((responsibility, index) => (
                  <li key={index} className={styles.responsibilityItem}>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.experienceTechnologies}>
              <h4 className={styles.technologiesTitle}>Technologies Used</h4>
              <div className={styles.technologiesList}>
                {currentExperience.technologies.map((technology, index) => (
                  <span key={index} className={styles.technologyTag}>{technology}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;