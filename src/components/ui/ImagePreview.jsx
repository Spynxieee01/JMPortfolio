import React, { useState } from 'react';
import styles from '../../styles/components/imagePreview.module.css';

const ImagePreview = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => {
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  
  return (
    <>
      <img 
        src={src} 
        alt={alt}
        className={styles.previewable}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpen();
          }
        }}
      />
      
      {isOpen && (
        <div 
          className={styles.modal}
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button className={styles.closeBtn} onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className={styles.imageContainer}>
            <img src={src} alt={alt} className={styles.modalImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;