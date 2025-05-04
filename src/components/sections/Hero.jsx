import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/hero.module.css';

const Hero = () => {
  const headingRef = useRef(null);
  
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    
    // Animate the heading text with a typewriter effect
    const text = heading.textContent;
    heading.textContent = '';
    
    const typeWriter = async () => {
      for (let i = 0; i < text.length; i++) {
        heading.textContent += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };
    
    typeWriter();
  }, []);
  
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <h1 ref={headingRef} className={styles.heroTitle}>
            Innovation meets intellectual precision
          </h1>
          <h2 className={`${styles.heroSubtitle} fade-in-up stagger-1`}>
            John Mark Taborada | Software Developer
          </h2>
          <p className={`${styles.heroDescription} fade-in-up stagger-2`}>
            Crafting elegant solutions to complex problems through clean, efficient code and
            thoughtful design. Bringing analytical thinking and business acumen to every project.
          </p>
          <div className={`${styles.ctaContainer} fade-in-up stagger-3`}>
            <Link to="/projects" className={styles.primaryBtn}>
              View My Work
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              Get In Touch
            </Link>
          </div>
        </div>
        <div className={`${styles.heroImageContainer} fade-in-left`}>
          <div className={styles.heroImage}>
            <div className={styles.imageShape}>
              <img 
                src="/hero-profile.jpg" 
                alt="JohnMark Taborada" 
                className={styles.profileImage}
              />
            </div>
            <div className={styles.imageBg}></div>
          </div>

        </div>
      </div>
      <div className={styles.heroScrollIndicator}>
        <a href="#about" className={styles.scrollDown}>
          <span className={styles.scrollText}>Scroll Down</span>
          <span className={styles.scrollIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;