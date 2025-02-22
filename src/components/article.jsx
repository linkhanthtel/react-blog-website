import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaClock, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';

const Article = ({ title, image, author, publishedAt }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      className={`my-8 mx-auto max-w-4xl ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col md:flex-row'>
        <motion.div 
          className='flex justify-center items-center md:w-2/5 overflow-hidden'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src={image} alt={title} className='w-full h-64 md:h-full object-cover' />
        </motion.div>
        <div className='md:w-3/5 p-6'>
          <motion.h1 
            className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque a amet atque quas alias et laboriosam quae minima rerum ipsum? Natus neque ex cumque recusandae pariatur possimus iste vero veritatis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, laborum architecto nostrum qui sequi dolor magni repellendus laboriosam? Culpa reprehenderit eos eum repellat. Laboriosam dolorem saepe provident eaque earum expedita.
          </motion.p>
          <motion.div 
            className={`flex justify-between items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <p>{author}</p>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <p>{publishedAt}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link 
              to="/blogs/singlepost" 
              className={`inline-flex items-center ${
                darkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-800'
              } transition-colors duration-300`}
            >
              Read More
              <motion.span
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Article;