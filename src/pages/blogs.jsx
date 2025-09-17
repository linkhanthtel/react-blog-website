import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import ArticleCard from '../components/articlecard';
import Sidebar from '../components/sidebar';
import { useTheme } from '../context/themeContext';
import { usePosts } from '../context/postsContext';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme();
  const { posts, loading, error, fetchPosts } = usePosts();

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Refresh posts
  const handleRefresh = () => {
    fetchPosts();
  };

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
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className={`w-full p-3 pl-10 pr-4 ${
                      darkMode 
                        ? 'bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500' 
                        : 'bg-white text-gray-700 border-gray-300 focus:border-blue-400'
                    } border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FiSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className={`px-4 py-3 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  } transition-colors duration-200 disabled:opacity-50`}
                >
                  <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </motion.div>
            {/* Error State */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-md mb-6 ${
                  darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                }`}
              >
                <p>Error loading posts: {error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Try again
                </button>
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <FiRefreshCw className={`w-8 h-8 mx-auto mb-4 animate-spin ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading posts...</p>
              </motion.div>
            )}

            {/* Posts Grid */}
            {!loading && !error && (
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
                      <ArticleCard 
                        id={post.id}
                        title={post.title} 
                        image={post.image} 
                        author={post.author} 
                        date={new Date(post.created_at).toLocaleDateString()}
                        description={post.description}
                        content={post.content}
                        likes={post.likes}
                        comments={post.comments}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* No Posts State */}
            {!loading && !error && filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {searchTerm ? 'No articles found matching your search.' : 'No posts available yet.'}
                </p>
                {!searchTerm && (
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Be the first to create a post!
                  </p>
                )}
              </motion.div>
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