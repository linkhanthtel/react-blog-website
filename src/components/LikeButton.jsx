import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useComments } from '../context/commentsContext';
import { useAuth } from '../context/authContext';

const LikeButton = ({ postId, initialLikes = 0, size = 'sm', showCount = true }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { likePost } = useComments();
  const { isAuthenticated } = useAuth();

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like posts');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const updatedPost = await likePost(postId);
      setLikes(updatedPost.likes);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
      alert('Failed to like post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <motion.button
      onClick={handleLike}
      disabled={isLoading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300
        ${isLiked 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <FaHeart 
          className={`${iconSizes[size]} ${isLiked ? 'fill-current' : ''}`}
        />
      </motion.div>
      {showCount && (
        <span className={`${sizeClasses[size]} font-medium`}>
          {likes}
        </span>
      )}
    </motion.button>
  );
};

export default LikeButton;
