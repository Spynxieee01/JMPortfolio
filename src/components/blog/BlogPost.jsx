import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/components/blogPost.module.css';
import { blogPosts } from '../../data/blogPosts';
import ImagePreview from '../ui/ImagePreview';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Find the post with the matching slug
    const currentPost = blogPosts.find(post => post.slug === slug);
    
    if (currentPost) {
      setPost(currentPost);
      
      // Find related posts based on category and tags
      const related = blogPosts
        .filter(p => 
          p.id !== currentPost.id && 
          (p.category === currentPost.category || 
           p.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 3); // Get up to 3 related posts
      
      setRelatedPosts(related);
    } else {
      // If post not found, redirect to the blog list
      navigate('/blog');
    }
    
    setIsLoading(false);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug, navigate]);
  
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = encodeURIComponent(post.title);
    const text = encodeURIComponent(post.excerpt);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        // You could show a toast notification here
        console.log('Link copied to clipboard!');
      });
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };
  
  // Function to process content and make images previewable
  const processContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Process images in blog content
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      // Create a new figure element to replace the img
      const figure = doc.createElement('figure');
      const imagePreview = doc.createElement('div');
      imagePreview.className = 'image-preview-container';
      imagePreview.innerHTML = `
        <img src="${img.src}" alt="${img.alt || ''}" class="previewable" onclick="openImagePreview(this)" />
      `;
      figure.appendChild(imagePreview);
      
      // Copy the existing figcaption if it exists
      const existingFigcaption = img.nextElementSibling;
      if (existingFigcaption && existingFigcaption.tagName === 'FIGCAPTION') {
        figure.appendChild(existingFigcaption.cloneNode(true));
      }
      
      // Replace the image with the processed figure
      img.parentNode.replaceChild(figure, img);
    });
    
    return doc.body.innerHTML;
  };
  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  return (
    <div className={styles.blogPostContainer}>
      <div className={styles.blogPostHeader}>
        <div className="container">
          <Link to="/blog" className={styles.backLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </Link>
          
          <div className={styles.postCategory}>{post.category}</div>
          
          <h1 className={styles.postTitle}>{post.title}</h1>
          
          <div className={styles.postMeta}>
            <div className={styles.postAuthor}>
              <div className={styles.authorAvatar}>
                {post.author.charAt(0)}
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.postDate}>{post.date}</span>
              </div>
            </div>
            
            <div className={styles.postTags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={styles.postTag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.featuredImageContainer}>
        <img src={post.coverImage} alt={post.title} className={styles.featuredImage} />
      </div>
      
      <div className="container">
        <div className={styles.postContent}>
          <div 
            className={styles.postBody}
            dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
          />
          
          <div className={styles.postShare}>
            <h3 className={styles.shareTitle}>Share this article</h3>
            <div className={styles.shareBtns}>
              <button 
                className={styles.shareBtn} 
                onClick={() => handleShare('twitter')}
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button 
                className={styles.shareBtn}
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
              <button 
                className={styles.shareBtn}
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button 
                className={styles.shareBtn}
                onClick={() => handleShare('copy')}
                aria-label="Copy link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className={styles.authorBio}>
            <div className={styles.authorAvatarLarge}>
              {post.author.charAt(0)}
            </div>
            <div className={styles.bioContent}>
              <h3 className={styles.bioName}>{post.author}</h3>
              <p className={styles.bioText}>
                Software Engineer and Tech Enthusiast with a passion for creating efficient, 
                elegant solutions to complex problems. I write about software development, 
                architecture, and emerging technologies.
              </p>
              <div className={styles.bioSocial}>
                <a href="#" className={styles.bioSocialLink} aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.bioSocialLink} aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className={styles.bioSocialLink} aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className={styles.relatedPosts}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className={styles.relatedCard}>
                  <Link to={`/blog/${relatedPost.slug}`} className={styles.relatedImageContainer}>
                    <img 
                      src={relatedPost.coverImage} 
                      alt={relatedPost.title} 
                      className={styles.relatedImage}
                    />
                  </Link>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{relatedPost.category}</span>
                    <h3 className={styles.relatedPostTitle}>
                      <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </h3>
                    <div className={styles.relatedMeta}>
                      <span className={styles.relatedDate}>{relatedPost.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;