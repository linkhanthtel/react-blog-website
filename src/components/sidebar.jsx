import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaYoutube, FaHashtag } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useTheme } from '../context/themeContext';

function Sidebar({ title, image, content, posts = [] }) {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`h-fit mx-4 hidden md:flex flex-col ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-lg rounded-lg p-6 my-4`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className={`text-2xl font-semibold text-center border-b-2 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } pb-3 mb-4`}
        variants={itemVariants}
      >
        {title}
      </motion.h1>
      <motion.div 
        className="relative overflow-hidden rounded-md mb-4"
        variants={itemVariants}
      >
        <motion.img 
          src={image} 
          alt="Sidebar" 
          className='w-full h-60 object-cover'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        >
          <span className="text-white text-lg font-semibold">View More</span>
        </motion.div>
      </motion.div>
      <motion.div className='flex flex-col space-y-4' variants={itemVariants}>
        <motion.p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
          {content || "Discover amazing content and stay updated with our latest posts and insights."}
        </motion.p>
        
        {posts.length > 0 && (
          <motion.div className='space-y-2' variants={itemVariants}>
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Recent Posts
            </h3>
            {posts.slice(0, 3).map((post, index) => (
              <motion.div 
                key={post.id || index}
                className={`${
                  darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } p-3 rounded-lg text-sm transition-colors duration-200 cursor-pointer`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="font-medium mb-1 line-clamp-2">{post.title}</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  by {post.author} • {new Date(post.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.ul className='space-y-2'>
          {['Lifestyle', 'Travel', 'Education'].map((item, index) => (
            <motion.li 
              key={index} 
              className={`flex items-center ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } px-3 py-2 rounded-full text-sm transition-colors duration-200 cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHashtag className="mr-2" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.p className={`text-center font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Follow Us
        </motion.p>
        <motion.div className='flex justify-center space-x-4'>
          {[
            { Icon: FaFacebook, color: 'blue', hoverColor: 'darkblue' },
            { Icon: AiFillInstagram, color: 'pink', hoverColor: 'deeppink' },
            { Icon: FaYoutube, color: 'red', hoverColor: 'darkred' }
          ].map(({ Icon, color, hoverColor }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, color: hoverColor }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className={`text-4xl text-${color}-500 cursor-pointer`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;