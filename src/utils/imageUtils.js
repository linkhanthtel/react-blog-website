// Utility functions for handling different image URL formats

export const getImageUrl = (imageUrl, width = 400, height = 300) => {
  if (!imageUrl) {
    return `http://127.0.0.1:8000/api/placeholder/${width}/${height}`;
  }

  // If it's a relative URL from our uploads, prepend the API base URL
  if (imageUrl.startsWith('/uploads/')) {
    return `http://127.0.0.1:8000${imageUrl}`;
  }

  // If it's already a direct image URL (ends with common image extensions)
  if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)) {
    return imageUrl;
  }

  // If it's a Pixabay page URL, we can't directly use it as an image
  if (imageUrl.includes('pixabay.com')) {
    return `http://127.0.0.1:8000/api/placeholder/${width}/${height}`;
  }

  // If it's an Unsplash URL, try to convert it to a usable format
  if (imageUrl.includes('unsplash.com')) {
    // Convert Unsplash URL to direct image URL
    const unsplashId = imageUrl.match(/photos\/([^/]+)/);
    if (unsplashId) {
      return `https://images.unsplash.com/photo-${unsplashId[1]}?w=${width}&h=${height}&fit=crop`;
    }
  }

  // If it's a placeholder service URL, use it as is
  if (imageUrl.includes('placeholder') || imageUrl.includes('picsum')) {
    return imageUrl;
  }

  // For any other URL, try to use it directly
  return imageUrl;
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
