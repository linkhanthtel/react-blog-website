import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import ArticleCard from '../components/articlecard';
import Sidebar from '../components/sidebar';
import { useTheme } from '../context/themeContext';

const blogPosts = [
  { id: 1, title: "Popular Destinations" },
  { id: 2, title: "Healthy Diet for Vegetarians" },
  { id: 3, title: "Tips for Purchasing Smartphones" },
  { id: 4, title: "Famous Places in Asia" },
  { id: 5, title: "How to Make a Delicious Curry" },
  { id: 6, title: "Things You Should Know Before 30" },
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme();

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="container mx-auto px-4 pb-8 pt-28">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
        >
          Blogs
        </motion.h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <motion.div 
              className="mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className={`w-full p-3 pl-10 pr-4 ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-700 border-gray-300 focus:border-blue-400'
                  } border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </motion.div>
            <AnimatePresence>
              <motion.div 
                className="grid gap-6 md:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                    }}
                  >
                    <ArticleCard title={post.title} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            {filteredPosts.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-center mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                No articles found matching your search.
              </motion.p>
            )}
          </div>
          <motion.div 
            className="lg:w-1/4 space-y-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Sidebar title="Popular Destinations" />
            <Sidebar title="Shopping" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;