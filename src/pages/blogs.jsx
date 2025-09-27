import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import { FaUser, FaComment, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/articlecard';
import { useTheme } from '../context/themeContext';
import { usePosts } from '../context/postsContext';
import { getImageAlt } from '../utils/imageUtils';
import ImageWithFallback from '../components/ImageWithFallback';
import LikeButton from '../components/LikeButton';
import apiService from '../services/api';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiTrendingPosts, setAiTrendingPosts] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
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

  // Fetch AI trending posts
  const fetchAITrendingPosts = async () => {
    setAiLoading(true);
    try {
      const result = await apiService.getAITrendingPosts(5);
      setAiTrendingPosts(result.trending_posts || []);
    } catch (err) {
      console.error('Error fetching AI trending posts:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Load AI trending posts on component mount
  useEffect(() => {
    fetchAITrendingPosts();
  }, []);

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
            {/* Popular Destinations Sidebar */}
            <div className={`sticky top-24 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
              {/* Header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    darkMode ? 'bg-green-600' : 'bg-green-500'
                  }`}
                >
                  <FaChartLine className="text-white text-xl" />
                </motion.div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Popular Destinations
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Most loved travel destinations
                </p>
              </div>

              {/* AI Trending Posts */}
              {aiTrendingPosts.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FaChartLine className={`text-lg ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                      AI Trending
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {aiTrendingPosts.slice(0, 3).map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`group relative overflow-hidden rounded-xl ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                        } transition-all duration-300 cursor-pointer`}
                      >
                        <Link to={`/blogs/singlepost/${post.id}`} className="block">
                          <div className="flex gap-3 p-3">
                            <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <ImageWithFallback
                                src={post.image}
                                alt={getImageAlt(post.image, post.title)}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/64/64"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-bold text-sm mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 ${
                                darkMode ? 'text-gray-100' : 'text-gray-800'
                              }`}>
                                {post.title}
                              </h4>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  AI Score: {post.ai_score || 0}
                                </span>
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {post.likes} likes
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Posts */}
              <div className="space-y-4">
                {posts.slice(0, 3).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`group relative overflow-hidden rounded-xl ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    } transition-all duration-300 cursor-pointer`}
                  >
                    <Link to={`/blogs/singlepost/${post.id}`} className="block">
                      <div className="flex gap-4 p-4">
                        {/* Post Image */}
                        <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={post.image}
                            alt={getImageAlt(post.image, post.title)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/80/80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Post Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 ${
                            darkMode ? 'text-gray-100' : 'text-gray-800'
                          }`}>
                            {post.title}
                          </h3>
                          
                          {post.description && (
                            <p className={`text-xs mb-2 line-clamp-2 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {post.description}
                            </p>
                          )}

                          {/* Post Meta */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <FaUser className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {post.author}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <LikeButton 
                                postId={post.id} 
                                initialLikes={post.likes} 
                                size="sm" 
                                showCount={true}
                              />
                              <div className="flex items-center">
                                <FaComment className={`mr-1 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {post.comments}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Date Badge */}
                          <div className="mt-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {new Date(post.created_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Line */}
                      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 ${
                        darkMode ? 'bg-green-500' : 'bg-green-600'
                      }`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="pt-4"
              >
                <Link
                  to="/blogs"
                  className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  View All Destinations
                </Link>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;