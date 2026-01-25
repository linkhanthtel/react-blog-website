/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import { FaUser, FaComment, FaHeart, FaEye, FaFire, FaTrophy, FaGlobe, FaMountain, FaUmbrellaBeach, FaPlane, FaFilter, FaCalendar, FaStar, FaRocket } from 'react-icons/fa';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const { darkMode } = useTheme();
  const { posts, loading, error, fetchPosts } = usePosts();

  const categories = [
    { id: 'all', name: 'All Posts', icon: FaGlobe, color: 'from-blue-500 to-cyan-500' },
    { id: 'adventure', name: 'Adventure', icon: FaMountain, color: 'from-green-500 to-emerald-500' },
    { id: 'beach', name: 'Beach', icon: FaUmbrellaBeach, color: 'from-cyan-500 to-blue-500' },
    { id: 'culture', name: 'Culture', icon: FaGlobe, color: 'from-purple-500 to-pink-500' },
    { id: 'travel', name: 'Travel', icon: FaPlane, color: 'from-orange-500 to-red-500' },
  ];

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        post.title.toLowerCase().includes(selectedCategory) ||
        post.content.toLowerCase().includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return (b.likes + b.comments) - (a.likes + a.comments);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'latest':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  // Calculate stats
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const avgLikes = totalPosts > 0 ? Math.round(totalLikes / totalPosts) : 0;

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
      className={`min-h-screen ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-sky-50 via-white to-sky-50'}`}
    >
      {/* Hero Section with 3D Effects */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500'} pt-28 pb-20`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-white/10 blur-2xl"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <FaRocket className="text-yellow-300" />
              <span>{totalPosts} Amazing Stories</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Blog Collection</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover inspiring travel stories, expert guides, and breathtaking destinations from around the world
            </motion.p>

            {/* Stats Cards */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[
                { icon: FaFire, label: 'Posts', value: totalPosts, color: 'from-orange-400 to-red-500' },
                { icon: FaHeart, label: 'Likes', value: totalLikes, color: 'from-pink-400 to-red-500' },
                { icon: FaComment, label: 'Comments', value: totalComments, color: 'from-blue-400 to-cyan-500' },
                { icon: FaStar, label: 'Avg Likes', value: avgLikes, color: 'from-yellow-400 to-orange-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <motion.div 
                    className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="text-white text-lg" />
                  </motion.div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 -mt-8 relative z-20">
        {/* Enhanced Search and Filters Section */}
        <motion.div 
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-6 mb-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          {/* Search Bar with 3D Effects */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search articles, authors, topics..."
                  className={`w-full pl-12 pr-4 py-4 ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500' 
                      : 'bg-gray-50 text-gray-700 border-gray-300 focus:border-blue-400'
                  } border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/20 transition-all duration-300`}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </motion.div>
            </div>

            {/* Sort Dropdown */}
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-6 py-4 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-100 border-gray-600' 
                  : 'bg-gray-50 text-gray-700 border-gray-300'
              } border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/20 cursor-pointer transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Liked</option>
              <option value="trending">Trending</option>
            </motion.select>

            {/* Refresh Button with 3D Animation */}
            <motion.button
              onClick={handleRefresh}
              disabled={loading}
              className={`px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          {/* Category Filter Chips */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
              >
                <category.icon className="text-lg" />
                <span>{category.name}</span>
                {selectedCategory === category.id && (
                  <motion.span
                    className="ml-1"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div 
            className={`flex items-center justify-between mb-6 p-4 rounded-xl ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <FaFilter className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
              <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Result' : 'Results'}
              </span>
            </div>
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm('')}
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear search
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Enhanced Error State */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`p-6 rounded-2xl mb-6 border-2 ${
                  darkMode ? 'bg-red-900/30 text-red-200 border-red-800' : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-red-800' : 'bg-red-200'
                  }`}>
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <p className="font-semibold">Error loading posts</p>
                    <p className="text-sm opacity-80">{error}</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleRefresh}
                  className={`mt-3 px-4 py-2 rounded-xl font-medium ${
                    darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-200 hover:bg-red-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try again
                </motion.button>
              </motion.div>
            )}

            {/* Enhanced Loading State */}
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <div className={`absolute inset-0 rounded-full border-4 border-t-transparent ${
                    darkMode ? 'border-blue-500' : 'border-blue-600'
                  }`} />
                  <FaPlane className={`absolute inset-0 m-auto text-2xl ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </motion.div>
                <motion.p 
                  className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading amazing stories...
                </motion.p>
              </motion.div>
            )}

            {/* Enhanced Posts Grid with 3D Cards */}
            {!loading && !error && (
              <AnimatePresence mode="wait">
                <motion.div 
                  className="grid gap-6 md:grid-cols-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08 } }
                  }}
                >
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      variants={{
                        hidden: { y: 30, opacity: 0, rotateX: -15 },
                        visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.6, type: 'spring' } }
                      }}
                      whileHover={{ 
                        y: -10,
                        rotateY: 5,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
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

            {/* Enhanced No Posts State */}
            {!loading && !error && filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`text-center py-20 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-3xl border-2 border-dashed ${
                  darkMode ? 'border-gray-700' : 'border-gray-300'
                }`}
              >
                <motion.div
                  className="inline-block mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className={`w-24 h-24 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  } flex items-center justify-center mx-auto`}>
                    <FiSearch className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </motion.div>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {searchTerm || selectedCategory !== 'all' ? 'No Results Found' : 'No Posts Yet'}
                </h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {searchTerm 
                    ? `We couldn't find any articles matching "${searchTerm}"`
                    : selectedCategory !== 'all'
                      ? `No posts in the ${categories.find(c => c.id === selectedCategory)?.name} category yet`
                      : 'Be the first to create a post!'}
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <motion.button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className={`px-6 py-3 rounded-xl font-medium ${
                      darkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
          <motion.div 
            className="lg:w-1/3 space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Enhanced Popular Destinations Sidebar with 3D */}
            <motion.div 
              className={`sticky top-24 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} rounded-3xl shadow-2xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
              whileHover={{ 
                boxShadow: darkMode 
                  ? '0 25px 50px -12px rgba(59, 130, 246, 0.25)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                scale: 1.01
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Enhanced Header with 3D */}
              <div className={`px-6 py-6 bg-gradient-to-r ${
                darkMode ? 'from-blue-900/50 to-purple-900/50' : 'from-blue-50 to-purple-50'
              } border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaTrophy className="text-white text-xl" />
                  </motion.div>
                  <div>
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Popular Destinations
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Most loved travel destinations
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Trending Posts with 3D */}
              {aiTrendingPosts.length > 0 && (
                <div className="px-6 py-6 border-b-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg relative`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-purple-500/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <FaRocket className="text-white text-lg relative z-10" />
                    </motion.div>
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        AI Trending
                      </h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Powered by AI analytics
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {aiTrendingPosts.slice(0, 3).map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20, rotateY: -30 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="group cursor-pointer"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <Link to={`/blogs/singlepost/${post.id}`} className="block">
                          <div className={`flex gap-3 p-3 rounded-2xl transition-all duration-300 ${
                            darkMode 
                              ? 'hover:bg-purple-900/20 border border-gray-700 hover:border-purple-500/50' 
                              : 'hover:bg-purple-50 border border-gray-200 hover:border-purple-300'
                          }`}>
                            <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                              <ImageWithFallback
                                src={post.image}
                                alt={getImageAlt(post.image, post.title)}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/80/80"
                              />
                              <div className="absolute top-1 right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 ${
                                darkMode ? 'text-gray-100' : 'text-gray-800'
                              }`}>
                                {post.title}
                              </h4>
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                  darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                                }`}>
                                  🧠 AI: {post.ai_score || 0}
                                </span>
                                <span className={`text-xs flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <FaHeart className="text-red-400" />
                                  <span>{post.likes}</span>
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

              {/* Enhanced Popular Posts with 3D Effects */}
              <div className="px-6 py-6">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaFire className="text-white text-lg" />
                  </motion.div>
                  <div>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Trending Now
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Most popular this week
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {posts.slice(0, 4).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20, rotateX: -20 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, type: 'spring' }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="group cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Link to={`/blogs/singlepost/${post.id}`} className="block">
                        <div className={`relative flex gap-4 p-4 rounded-2xl transition-all duration-300 ${
                          darkMode 
                            ? 'hover:bg-gradient-to-r hover:from-green-900/20 hover:to-emerald-900/20 border border-gray-700 hover:border-green-500/50' 
                            : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border border-gray-200 hover:border-green-300'
                        }`}>
                          {/* Rank Badge */}
                          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-10">
                            {index + 1}
                          </div>

                          {/* Post Image with 3D Effect */}
                          <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                            <motion.div
                              whileHover={{ scale: 1.15 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ImageWithFallback
                                src={post.image}
                                alt={getImageAlt(post.image, post.title)}
                                className="w-full h-full object-cover"
                                fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/96/96"
                              />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Post Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300 ${
                              darkMode ? 'text-gray-100' : 'text-gray-800'
                            }`}>
                              {post.title}
                            </h3>
                            
                            {post.description && (
                              <p className={`text-xs mb-2 line-clamp-1 ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {post.description}
                              </p>
                            )}

                            {/* Post Meta */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <div className="flex items-center gap-1">
                                  <FaUser className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {post.author}
                                  </span>
                                </div>
                                <span className={`${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                                <div className="flex items-center gap-1">
                                  <FaCalendar className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {new Date(post.created_at).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <LikeButton 
                                    postId={post.id} 
                                    initialLikes={post.likes} 
                                    size="sm" 
                                    showCount={true}
                                  />
                                  <div className="flex items-center gap-1">
                                    <FaComment className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {post.comments}
                                    </span>
                                  </div>
                                </div>
                                <motion.div
                                  className="text-xs font-bold text-green-500"
                                  whileHover={{ x: 5 }}
                                >
                                  →
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced Footer Button */}
              <div className={`px-6 py-6 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-50 to-white'}`}>
                <Link to="/blogs">
                  <motion.button
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white shadow-xl relative overflow-hidden ${
                      darkMode 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600'
                    }`}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Animated shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <FaEye />
                      <span>View All Destinations</span>
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;