import React, { useState } from 'react';
import { getImageUrl, isPixabayUrl } from '../utils/imageUtils';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/api/placeholder/400/300',
  showPixabayMessage = true 
}) => {
  const [imageError, setImageError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageError(false);
  };

  const finalSrc = imageError ? fallbackSrc : getImageUrl(src, 400, 300);
  const isPixabay = isPixabayUrl(src);

  return (
    <div className="relative">
      <img 
        src={finalSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
      />
      
      {/* Pixabay URL warning message */}
      {isPixabay && showPixabayMessage && (
        <div className="absolute bottom-2 left-2 right-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-2 py-1 rounded text-xs">
          <div className="flex items-center justify-between">
            <span>⚠️ Pixabay page URL detected</span>
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
                <strong>Tip:</strong> Right-click on the image on Pixabay and select "Copy image address" 
                to get the direct URL.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
