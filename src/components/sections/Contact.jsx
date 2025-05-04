import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../../styles/components/contact.module.css';
import useForm from '../../hooks/useForm';

const Contact = () => {
  const [isInView, setIsInView] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  
  // Initialize EmailJS - replace with your credentials
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
  
  const initialState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  const validate = (values) => {
    const errors = {};
    
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };
  
  const handleSubmit = async () => {
    setIsSending(true);
    setFormError(null);
    
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
          to_email: import.meta.env.VITE_CONTACT_EMAIL
        }
      );
      
      if (result.status === 200) {
        setFormSubmitted(true);
        resetForm();
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormError('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };
  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit: submitForm, resetForm } = useForm(
    initialState,
    validate,
    handleSubmit
  );
  
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
    
    const section = document.getElementById('contact-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section id="contact-section" className={`${styles.contactSection} section`}>
      <div className="container">
        <div className={styles.contactWrapper}>
          <div className={`${styles.contactInfo} ${isInView ? 'fade-in-left' : ''}`}>
            <h2 className="section-title">Get in Touch</h2>
            <p className={styles.contactDescription}>
              Have a project in mind or want to discuss collaboration opportunities?
              Feel free to reach out using the contact form or through one of the following channels.
            </p>
            
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className={styles.contactItemContent}>
                  <h3 className={styles.contactItemTitle}>Email</h3>
                  <a href="https://mailto:johnmark.taborada991@gmail.com" className={styles.contactItemValue}>
                    johnmark.taborada991@gmail.com
                  </a>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className={styles.contactItemContent}>
                  <h3 className={styles.contactItemTitle}>Phone</h3>
                  <a href="tel:+11234567890" className={styles.contactItemValue}>
                    +63 945-369-4388
                  </a>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className={styles.contactItemContent}>
                  <h3 className={styles.contactItemTitle}>Location</h3>
                  <p className={styles.contactItemValue}>Villa Sta Maria Gumamela Street Zamboanga City, 7000 , Philippines</p>
                </div>
              </div>
            </div>
            
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

            </div>
          </div>
          
          <div className={`${styles.contactForm} ${isInView ? 'fade-in-right' : ''}`}>
            {formSubmitted ? (
              <div className={styles.formSuccess}>
                <div className={styles.successIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successMessage}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  className={styles.resetFormBtn}
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submitForm} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${touched.name && errors.name ? styles.inputError : ''}`}
                    placeholder="Your name"
                  />
                  {touched.name && errors.name && (
                    <p className={styles.errorMessage}>{errors.name}</p>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${touched.email && errors.email ? styles.inputError : ''}`}
                    placeholder="Your email address"
                  />
                  {touched.email && errors.email && (
                    <p className={styles.errorMessage}>{errors.email}</p>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${touched.subject && errors.subject ? styles.inputError : ''}`}
                    placeholder="Subject of your message"
                  />
                  {touched.subject && errors.subject && (
                    <p className={styles.errorMessage}>{errors.subject}</p>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.formTextarea} ${touched.message && errors.message ? styles.inputError : ''}`}
                    placeholder="Your message"
                    rows="5"
                  ></textarea>
                  {touched.message && errors.message && (
                    <p className={styles.errorMessage}>{errors.message}</p>
                  )}
                </div>
                
                {formError && (
                  <div className={styles.formErrorAlert}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{formError}</span>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Sending...</span>
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;