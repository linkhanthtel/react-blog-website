import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiUser } from 'react-icons/fi';
import { useTheme } from '../context/themeContext';

function ArticleCard({ title, image, author, date }) {
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
        <img 
          className="h-48 w-full object-cover" 
          src={image} 
          alt={title} 
        />
        <div className={`absolute top-0 left-0 m-2 px-2 py-1 rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
        }`}>
          <span className="text-xs font-semibold">Travel</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className={`text-xl font-semibold mb-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>{title}</h2>
        <p className={`mb-4 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className={`flex justify-between items-center mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center">
            <FiUser className="mr-2" />
            <span className="text-sm">{author}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span className="text-sm">{date}</span>
          </div>
        </div>
        <Link 
          to="/blogs/singlepost" 
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