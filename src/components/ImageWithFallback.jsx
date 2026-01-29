import React, { useState, useRef, useEffect } from 'react';
import { getImageUrl, isPixabayUrl } from '../utils/imageUtils';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/api/placeholder/400/300',
  showPixabayMessage = true,
  loading = 'lazy',
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, [priority]);

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageError(false);
  };

  const finalSrc = imageError ? fallbackSrc : getImageUrl(src, 400, 300);
  const isPixabay = isPixabayUrl(src);

  return (
    <div className="relative" ref={imgRef}>
      {isInView && (
        <img 
          src={finalSrc}
          alt={alt}
          className={className}
          loading={loading}
          decoding="async"
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
      
      {/* Pixabay URL warning message */}
      {isPixabay && showPixabayMessage && (
        <div className="absolute bottom-2 left-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-2 py-1 rounded text-xs">
          <div className="flex items-center justify-between">
            <span>Pixabay page URL detected</span>
            <button 
              onClick={() => setShowMessage(!showMessage)}
              className="font-bold"
            >
              {showMessage ? '−' : '+'}
            </button>
          </div>
          {showMessage && (
            <div className="mt-1 text-xs">
              <p>To display images from Pixabay, please use direct image URLs instead of page URLs.</p>
              <p className="mt-1">
                <strong>Tip:</strong> Right-click on the image on Pixabay and select &quot;Copy image address&quot; 
                to get the direct URL.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(ImageWithFallback);
