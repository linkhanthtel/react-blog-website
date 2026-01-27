// Utility functions for handling different image URL formats

// Memoized image URL getter for better performance
const imageUrlCache = new Map();

export const getImageUrl = (imageUrl, width = 400, height = 300) => {
  if (!imageUrl) {
    return `https://wanderluxe-ventures.onrender.com/api/placeholder/${width}/${height}`;
  }

  // Check cache first
  const cacheKey = `${imageUrl}_${width}_${height}`;
  if (imageUrlCache.has(cacheKey)) {
    return imageUrlCache.get(cacheKey);
  }

  let finalUrl;

  // If it's a relative URL from our uploads, prepend the API base URL
  if (imageUrl.startsWith('/uploads/')) {
    finalUrl = `https://wanderluxe-ventures.onrender.com${imageUrl}`;
  }
  // If it's already a direct image URL (ends with common image extensions)
  else if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)) {
    finalUrl = imageUrl;
  }
  // If it's a Pixabay page URL, we can't directly use it as an image
  else if (imageUrl.includes('pixabay.com')) {
    finalUrl = `https://wanderluxe-ventures.onrender.com/api/placeholder/${width}/${height}`;
  }
  // If it's an Unsplash URL, try to convert it to a usable format
  else if (imageUrl.includes('unsplash.com')) {
    // Convert Unsplash URL to direct image URL
    const unsplashId = imageUrl.match(/photos\/([^/]+)/);
    if (unsplashId) {
      finalUrl = `https://images.unsplash.com/photo-${unsplashId[1]}?w=${width}&h=${height}&fit=crop`;
    } else {
      finalUrl = imageUrl;
    }
  }
  // If it's a placeholder service URL, use it as is
  else if (imageUrl.includes('placeholder') || imageUrl.includes('picsum')) {
    finalUrl = imageUrl;
  }
  // For any other URL, try to use it directly
  else {
    finalUrl = imageUrl;
  }

  // Cache the result (limit cache size to prevent memory issues)
  if (imageUrlCache.size > 100) {
    const firstKey = imageUrlCache.keys().next().value;
    imageUrlCache.delete(firstKey);
  }
  imageUrlCache.set(cacheKey, finalUrl);

  return finalUrl;
};

export const isPixabayUrl = (url) => {
  return url && url.includes('pixabay.com');
};

export const getImageAlt = (imageUrl, title) => {
  if (!imageUrl) return title || 'Blog post image';
  
  if (imageUrl.includes('pixabay.com')) {
    return 'Image from Pixabay';
  }
  
  if (imageUrl.includes('unsplash.com')) {
    return 'Image from Unsplash';
  }
  
  return title || 'Blog post image';
};

export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Check if it's a direct image URL
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)) {
    return true;
  }
  
  // Check if it's a known image service
  if (url.includes('pixabay.com') || url.includes('unsplash.com') || url.includes('placeholder')) {
    return true;
  }
  
  return false;
};
