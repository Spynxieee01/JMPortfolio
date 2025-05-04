import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (email && email.includes('@')) {
      // In a real application, this would connect to a newsletter API
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset subscription status after a delay
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.footerLogo}>
              <span className={styles.logoFirstName}>JohnMark</span>
              <span className={styles.logoLastName}>Taborada</span>
            </Link>
            <p className={styles.footerTagline}>
              Building innovative solutions with clean code and thoughtful design.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/Spynxieee01" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/john-mark-taborada-b24b8b270" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/Mijoyss" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://mailto:hello@johnmark.taborada991@gmail.com" className={styles.socialLink} aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkColumn}>
              <h3 className={styles.footerLinkTitle}>Navigation</h3>
              <ul className={styles.footerLinkList}>
                <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                <li><Link to="/about" className={styles.footerLink}>About</Link></li>
                <li><Link to="/experience" className={styles.footerLink}>Experience</Link></li>
                <li><Link to="/projects" className={styles.footerLink}>Projects</Link></li>
                <li><Link to="/blog" className={styles.footerLink}>Blog</Link></li>
                <li><Link to="/contact" className={styles.footerLink}>Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerLinkColumn}>
              <h3 className={styles.footerLinkTitle}>Services</h3>
              <ul className={styles.footerLinkList}>
                <li><a href="#" className={styles.footerLink}>Web Development</a></li>
                <li><a href="#" className={styles.footerLink}>UI/UX Design</a></li>
                <li><a href="#" className={styles.footerLink}>API Development</a></li>
                <li><a href="#" className={styles.footerLink}>Technical Consulting</a></li>
                <li><a href="#" className={styles.footerLink}>Code Reviews</a></li>
              </ul>
            </div>
            
            <div className={styles.footerLinkColumn}>
              <h3 className={styles.footerLinkTitle}>Newsletter</h3>
              <p className={styles.newsletterDescription}>
                Subscribe to receive updates on new projects and articles.
              </p>
              <form onSubmit={handleSubmit} className={styles.newsletterForm}>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.emailInput}
                    required
                  />
                  <button type="submit" className={styles.subscribeBtn}>
                    Subscribe
                  </button>
                </div>
                {isSubscribed && (
                  <p className={styles.subscribeSuccess}>
                    Thanks for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Johnmark. All rights reserved.
          </p>
          <div className={styles.footerBottomLinks}>
            <a href="#" className={styles.footerBottomLink}>Privacy Policy</a>
            <a href="#" className={styles.footerBottomLink}>Terms of Service</a>
            <a href="#" className={styles.footerBottomLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;