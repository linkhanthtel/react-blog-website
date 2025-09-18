import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiUser, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useTheme } from '../context/themeContext';
import { getImageAlt } from '../utils/imageUtils';
import ImageWithFallback from './ImageWithFallback';

function ArticleCard({ 
  id, 
  title, 
  image, 
  author, 
  date, 
  description, 
  content, 
  likes = 0, 
  comments = 0 
}) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      className={`max-w-sm mx-auto ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={getImageAlt(image, title)}
          className="h-48 w-full object-cover"
          fallbackSrc="http://127.0.0.1:8000/api/placeholder/400/300"
          showPixabayMessage={false}
        />
        <div className={`absolute top-0 left-0 m-2 px-2 py-1 rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
        }`}>
          <span className="text-xs font-semibold">Travel</span>
        </div>
        <div className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
        }`}>
          <span className="text-xs font-semibold">#{id}</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className={`text-xl font-semibold mb-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>{title}</h2>
        <p className={`mb-4 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description || (content ? content.substring(0, 120) + '...' : 'No description available')}
        </p>
        <div className={`flex justify-between items-center mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center">
            <FiUser className="mr-2" />
            <span className="text-sm">{author || 'Unknown Author'}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span className="text-sm">{date || 'No date'}</span>
          </div>
        </div>
        
        {/* Engagement Stats */}
        <div className={`flex items-center justify-between mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FiHeart className="mr-1" />
              <span className="text-sm">{likes}</span>
            </div>
            <div className="flex items-center">
              <FiMessageCircle className="mr-1" />
              <span className="text-sm">{comments}</span>
            </div>
          </div>
        </div>
        <Link 
          to={`/blogs/singlepost/${id}`} 
          className={`inline-flex items-center ${
            darkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-indigo-600 hover:text-indigo-800'
          } transition duration-300 ease-in-out`}
        >
          Read More
          <motion.span
            className="ml-2"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <FiArrowRight />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

export default ArticleCard;