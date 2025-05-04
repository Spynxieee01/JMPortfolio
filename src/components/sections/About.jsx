import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/about.module.css';

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  
  const skills = [
    { category: 'Frontend', items: ['JavaScript', 'React', 'CSS/SASS', 'Responsive Design'] },
    { category: 'Backend', items: ['PHP', 'Python', 'Django'] },
    { category: 'Database', items: ['MongoDB', 'MySQL'] },
    { category: 'DevOps', items: ['Git', 'AWS', 'Netlify'] },
    { category: 'Tools', items: ['VS Code', 'Figma', 'Chrome DevTools'] }
  ];
  
  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Western Mindanao State University',
      duration: '2021 - 2025',
      description: 'Focused on computer systems, software development, databases, and network management.',
      achievements: [
      ]
    },
    {
      degree: 'Database Systems Training',
      institution: 'Oracle Academy',
      duration: '2023 - 2024',
      description: 'Gained practical knowledge in database design, SQL programming, and managing relational database systems.',
      achievements: [
      ]
    }
    
  ];
  
  const certifications = [
    {
      title: 'Introduction to Front End Development',
      issuer: 'Simplilearn',
      date: 'April 19, 2025',
      credentialId: '8217196'
    },
    {
      title: 'Python Django 101',
      issuer: 'Simplilearn',
      date: 'April 21, 2025',
      credentialId: '8223176'
    },
    {
      title: 'Getting Started with Full Stack Java Development',
      issuer: 'Simplilearn',
      date: 'April 22, 2025',
      credentialId: '8232117'
    },
    {
      title: 'Introduction to PHP',
      issuer: 'Simplilearn',
      date: 'May 4, 2025',
      credentialId: '8263728'
    },
  ];
  
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
    
    const section = document.getElementById('about-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <section id="about-section" className={`${styles.aboutSection} section`}>
      <div className="container">
        <div className={styles.aboutWrapper}>
          <div className={`${styles.aboutContent} ${isInView ? 'fade-in-right' : ''}`}>
            <h2 className="section-title">About Me</h2>
            <p className={styles.aboutLead}>
            I'm an IT professional currently pursuing a Bachelor of Science in Information Technology at Western Mindanao State University, with a strong focus on software developing.
            </p>
            <div className={styles.aboutText}>
              <p>
                My experience as a software tester has developed my skills in identifying and documenting bugs, conducting performance testing, and ensuring the overall quality of software products. I combine this hands-on experience with a solid understanding of both frontend and backend development, which allows me to approach projects with technical versatility.
              </p>
              <p>
              Known for being a team player with effective communication and a positive, resilient attitude, I enjoy collaborating with others to turn ideas into impactful solutions. I'm continuously learning and exploring new tools and technologies, particularly in the areas of UI/UX, graphic design, and digital product development.
              </p>
            </div>
            <div className={styles.aboutCta}>
              <Link to="/contact" className={styles.contactBtn}>
                Get In Touch
              </Link>
              <a href="/TABSCV.pdf" className={styles.resumeBtn} target="_blank" rel="noopener noreferrer">
                Download CV
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={`${styles.aboutImage} ${isInView ? 'fade-in-left' : ''}`}>
            <div className={styles.imageContainer}>
              <img src="/about-profile.jpg" alt="John Doe" />
            </div>
            <div className={styles.imageBg}></div>
            <div className={styles.imageAccent}></div>
          </div>
        </div>
        
        <div className={`${styles.aboutTabs} ${isInView ? 'fade-in-up' : ''}`}>
          <div className={styles.tabButtons}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'skills' ? styles.active : ''}`}
              onClick={() => handleTabChange('skills')}
            >
              Skills & Expertise
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'education' ? styles.active : ''}`}
              onClick={() => handleTabChange('education')}
            >
              Education
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'certifications' ? styles.active : ''}`}
              onClick={() => handleTabChange('certifications')}
            >
              Certifications
            </button>
          </div>
          
          <div className={styles.tabContent}>
            {activeTab === 'skills' && (
              <div className={styles.skillsContent}>
                <div className={styles.skillsDescription}>
                  <h3 className={styles.tabContentTitle}>Technical Expertise</h3>
                  <p>
                    I've developed a diverse skill set across the full stack, with particular expertise in React, Node.js, and cloud architecture. I focus on creating scalable, maintainable solutions with clean code and thoughtful design.
                  </p>
                </div>
                
                <div className={styles.skillsGrid}>
                  {skills.map((skillGroup, index) => (
                    <div key={index} className={styles.skillCategory}>
                      <h4 className={styles.skillCategoryTitle}>{skillGroup.category}</h4>
                      <ul className={styles.skillsList}>
                        {skillGroup.items.map((skill, i) => (
                          <li key={i} className={styles.skillItem}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className={styles.educationContent}>
                <h3 className={styles.tabContentTitle}>Academic Background</h3>
                <div className={styles.educationTimeline}>
                  {education.map((edu, index) => (
                    <div key={index} className={styles.educationItem}>
                      <div className={styles.educationHeader}>
                        <div className={styles.educationDegree}>
                          <h4 className={styles.degree}>{edu.degree}</h4>
                          <p className={styles.institution}>{edu.institution}</p>
                        </div>
                        <span className={styles.educationDuration}>{edu.duration}</span>
                      </div>
                      <p className={styles.educationDescription}>{edu.description}</p>
                      <ul className={styles.educationAchievements}>
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className={styles.achievementItem}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'certifications' && (
              <div className={styles.certificationsContent}>
                <h3 className={styles.tabContentTitle}>Professional Certifications</h3>
                <div className={styles.certificationsGrid}>
                  {certifications.map((cert, index) => (
                    <div key={index} className={styles.certificationCard}>
                      <div className={styles.certificationIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="7"></circle>
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                        </svg>
                      </div>
                      <h4 className={styles.certificationTitle}>{cert.title}</h4>
                      <p className={styles.certificationIssuer}>{cert.issuer}</p>
                      <div className={styles.certificationMeta}>
                        <span className={styles.certificationDate}>{cert.date}</span>
                        <span className={styles.certificationId}>ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;