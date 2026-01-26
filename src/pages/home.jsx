/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaHeart, FaComments, FaShare, FaChevronDown, FaPlane, FaHotel, FaUmbrellaBeach, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaSun, FaUser, FaClock, FaStar, FaRocket, FaGlobe, FaCompass, FaMountain, FaWater, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/themeContext';
import { usePosts } from '../context/postsContext';
import { getImageAlt } from '../utils/imageUtils';
import ImageWithFallback from '../components/ImageWithFallback';
import LikeButton from '../components/LikeButton';
import image7 from '../images/image7.jpg';

// Dynamic content will be generated from backend data

// Minimal Button Component
function MinimalButton({ icon: Icon, text, variant }) {
  const variants = {
    primary: "bg-white text-slate-900 hover:bg-slate-100 shadow-lg",
    secondary: "bg-slate-800/50 text-white border border-white/20 hover:bg-slate-700/50 backdrop-blur-sm",
    outline: "bg-transparent text-white border border-white/40 hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`px-6 sm:px-8 py-3 rounded-full font-light text-xs sm:text-sm flex items-center justify-center transition-all duration-300 w-full sm:w-auto ${variants[variant]}`}
    >
      <Icon className="mr-2 text-xs sm:text-sm" />
      <span>{text}</span>
    </motion.button>
  );
}


// Featured Blog Posts Component with 3D Effects
function FeaturedBlogPosts({ posts, darkMode }) {
  const featuredPosts = posts.slice(0, 3);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          Featured Stories
        </motion.h2>
        <motion.p 
          className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Discover our most popular travel experiences
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link to={`/blogs/singlepost/${post.id}`}>
              <motion.article
                className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden group cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Depth Shadow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-sky-500/20 blur-2xl"
                  animate={{
                    opacity: hoveredIndex === index ? 0.6 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative h-56 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 3 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/400/300"
                    />
                  </motion.div>
                  
                  {/* Animated Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                  />
                  
                  {/* Floating Badge */}
                  <motion.div 
                    className="absolute top-6 left-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                      <FaStar className="text-xs" />
                      <span>Featured</span>
                    </span>
                  </motion.div>

                  {/* Number Badge */}
                  <motion.div
                    className="absolute top-6 right-6"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                  >
                    <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="p-6"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <motion.h3 
                    className={`text-xl font-bold mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-sky-500 transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    whileHover={{ x: 5 }}
                  >
                    {post.title}
                  </motion.h3>
                  <p className={`text-sm mb-6 line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.description || "Read more about this amazing destination..."}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaHeart className="text-red-500" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.likes}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.2 }}
                      >
                        <FaComments className="text-blue-500" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.comments}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Read More Arrow */}
                  <motion.div
                    className="mt-4 flex items-center space-x-2 text-blue-500 group-hover:text-sky-500"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-sm font-semibold">Explore Story</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// Recent Posts Grid Component
function RecentPostsGrid({ posts, darkMode }) {
  const recentPosts = posts.slice(0, 6);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-16"
    >
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Latest Adventures
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Stay updated with our newest travel stories
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -3 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden group cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-sky-200'}`}
          >
            <Link to={`/blogs/singlepost/${post.id}`}>
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/400/300"
                />
              </div>
              <div className="p-5">
                <h3 className={`font-semibold mb-3 group-hover:text-sky-600 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.description || "Read more..."}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-500" />
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

// Blog Statistics Component
function BlogStatistics({ posts, darkMode }) {
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const avgReadTime = Math.round(posts.reduce((sum, post) => sum + (post.title?.length || 0), 0) / posts.length / 200) || 5;

  const stats = [
    { label: 'Total Posts', value: totalPosts, icon: FaPlane },
    { label: 'Total Likes', value: totalLikes, icon: FaHeart },
    { label: 'Comments', value: totalComments, icon: FaComments },
    { label: 'Avg Read Time', value: `${avgReadTime} min`, icon: FaClock },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-16"
    >
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-sky-100'} rounded-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-sky-200'}`}>
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Impact
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Numbers that tell our story
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${darkMode ? 'bg-blue-500' : 'bg-sky-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Newsletter Signup Component
function NewsletterSignup({ darkMode }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <motion.div 
        className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-sky-500 to-sky-600'} rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 3D Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Stay Updated</h2>
        <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto relative z-10">
          Get the latest travel stories and tips delivered to your inbox
        </p>
        
        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative z-10"
          >
            <div className="text-2xl mb-2">✅</div>
            <p className="text-lg">Thank you for subscribing!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-sky-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.section>
  );
}

// 3D Scroll Reveal Wrapper
function ScrollReveal3D({ children, delay = 0, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
}

// Floating 3D Categories
function Floating3DCategories({ darkMode }) {
  const categories = [
    { name: 'Adventure', icon: FaMountain, color: 'from-green-500 to-emerald-600', count: 12 },
    { name: 'Culture', icon: FaGlobe, color: 'from-blue-500 to-indigo-600', count: 8 },
    { name: 'Food', icon: FaLeaf, color: 'from-orange-500 to-red-600', count: 15 },
    { name: 'Beaches', icon: FaWater, color: 'from-cyan-500 to-blue-600', count: 10 },
    { name: 'Cities', icon: FaPlane, color: 'from-sky-500 to-cyan-500', count: 20 },
    { name: 'Nature', icon: FaStar, color: 'from-pink-500 to-rose-600', count: 18 },
  ];

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Explore Categories
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Discover your next adventure
        </p>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.1, 
              rotateY: 10,
              z: 50,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 text-center cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group`}
          >
            {/* 3D Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
            
            <motion.div 
              className={`relative w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <category.icon className="text-white text-2xl" />
            </motion.div>
            <h3 className={`font-semibold mb-2 text-base relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.name}
            </h3>
            <p className={`text-sm font-medium relative ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {category.count} posts
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Parallax Blog Showcase
function ParallaxBlogShowcase({ posts, darkMode, scrollY }) {
  const showcasePosts = posts.slice(0, 4);
  
  return (
    <section className="mb-24 relative">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Trending Stories
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Most loved by our community
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {showcasePosts.map((post, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: isEven ? -100 : 100, rotateY: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link to={`/blogs/singlepost/${post.id}`}>
                <motion.article
                  className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl overflow-hidden shadow-xl group cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  whileHover={{ 
                    y: -10,
                    rotateX: 5,
                    rotateY: isEven ? 5 : -5,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* 3D Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                        fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/600/400"
                      />
                    </motion.div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Floating Badge */}
                    <motion.div 
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-gray-900 text-sm font-bold">#{index + 1}</span>
                    </motion.div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-white">
                        <motion.div 
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.2 }}
                        >
                          <FaHeart className="text-red-400" />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.2 }}
                        >
                          <FaComments className="text-blue-400" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Content with 3D Transform */}
                  <motion.div 
                    className="p-6"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <h3 className={`text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-sky-500 transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {post.description || "Discover an amazing journey through this destination..."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <motion.div
                        className="text-blue-500 group-hover:text-sky-500 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-semibold">Read more →</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.article>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// Interactive 3D Stats
function Interactive3DStats({ posts, darkMode }) {
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const avgReadTime = 5;

  const stats = [
    { label: 'Blog Posts', value: totalPosts, icon: FaRocket, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Likes', value: totalLikes, icon: FaHeart, color: 'from-pink-500 to-rose-500' },
    { label: 'Comments', value: totalComments, icon: FaComments, color: 'from-sky-500 to-cyan-500' },
    { label: 'Avg Read Time', value: `${avgReadTime}m`, icon: FaClock, color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <section className="mb-24">
      <motion.div
        className={`${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-white via-sky-50 to-white'} rounded-3xl p-12 shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} relative overflow-hidden`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.3) 30%, rgba(59, 130, 246, 0.3) 70%, transparent 70%)',
            backgroundSize: '100px 100px',
          }}
        />

        <div className="text-center mb-12 relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Community Impact
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Growing together, one story at a time
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring"
              }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                z: 50,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="text-center"
            >
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="text-white text-3xl" />
              </motion.div>
              <motion.div 
                className={`text-4xl md:text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Magnetic Card Grid
function MagneticCardGrid({ posts, darkMode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const gridPosts = posts.slice(0, 6);

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
    setHoveredCard(index);
  };

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Latest Adventures
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Interactive stories from around the world
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === index 
                ? `perspective(1000px) rotateY(${mousePosition.x / 20}deg) rotateX(${-mousePosition.y / 20}deg) translateZ(20px)` 
                : 'none',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Link to={`/blogs/singlepost/${post.id}`}>
              <motion.article
                className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl group cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                whileHover={{ scale: 1.05 }}
              >
                {/* Spotlight Effect */}
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(circle 150px at ${mousePosition.x + 150}px ${mousePosition.y + 150}px, rgba(59, 130, 246, 0.2), transparent)`,
                    }}
                  />
                )}

                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/400/300"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <motion.div 
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <span className="text-gray-900 text-xs font-bold">Featured</span>
                  </motion.div>
                </div>

                <div className="p-6" style={{ transform: 'translateZ(40px)' }}>
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.description || "Explore this amazing destination..."}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <FaHeart className="text-red-500" />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaComments className="text-blue-500" />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Clean Weather Widget Component
function CleanWeatherWidget({ weatherData, isLoading }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white/80 text-sm font-medium mb-2">Current Weather</h3>
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-3"></div>
              <span className="text-white/60 text-sm">Loading...</span>
            </div>
          ) : weatherData ? (
            <div className="flex items-center">
              <FaSun className="text-yellow-400 text-2xl mr-3" />
              <div>
                <p className="text-white text-2xl font-light">{weatherData.temperature}°C</p>
                <p className="text-white/60 text-sm">{weatherData.condition} • {weatherData.location}</p>
              </div>
            </div>
          ) : (
            <p className="text-white/60 text-sm">Weather unavailable</p>
          )}
        </div>
      </div>
    </div>
  );
}



function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();
  const { posts } = usePosts();
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Static content for hero section
  const heroTitle = "Discover the World";
  const heroSubtitle = "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences";

  // Parallax transforms
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 1000], [0, -200]);

  // Scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-sky-50 text-gray-900'} scroll-smooth`}>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-sky-800 to-cyan-800"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-white mb-2"
              >
                WanderLuxe
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white/80"
              >
                Preparing your journey...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Background Image */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={image7} 
            alt="Travel Destination" 
            className="w-full h-full object-cover object-center"
            fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/1200/600"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <motion.p 
              className="text-white/80 text-xs sm:text-sm font-medium tracking-widest uppercase mb-2 sm:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              WanderLuxe
            </motion.p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white mb-6 sm:mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {heroTitle}
          </motion.h1>

          {/* Subheading */}
          <motion.div
            className="mb-12 sm:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-white/90 text-base sm:text-lg md:text-xl font-light leading-relaxed px-4">
              {heroSubtitle}
            </p>
          </motion.div>

          {/* Minimal Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4"
          >
            <MinimalButton
              icon={FaSearch}
              text="Explore"
              variant="primary"
            />
            <MinimalButton
              icon={FaMapMarkerAlt}
              text="Plan Trip"
              variant="secondary"
            />
            <MinimalButton
              icon={FaCalendarAlt}
              text="Book Now"
              variant="outline"
            />
          </motion.div>

          {/* Minimal Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-md mx-auto mb-12 sm:mb-16 px-4"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-white mb-1">50+</div>
              <div className="text-xs sm:text-sm text-white/70">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-white mb-1">1000+</div>
              <div className="text-xs sm:text-sm text-white/70">Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-light text-white mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-white/70">Support</div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.a 
              href="#content" 
              className="text-white/60 hover:text-white transition-colors duration-300"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaChevronDown className="text-xl" />
            </motion.a>
            <span className="text-white/60 text-xs mt-3 font-light tracking-wide">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* 3D Interactive Content Section */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-sky-50 via-white to-sky-50'}`}>
        {/* Animated Background Layers */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: yTransform }}
        >
          <div className={`absolute inset-0 ${darkMode ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_50%)]'}`} />
        </motion.div>

        {/* Floating 3D Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400/20' : 'bg-sky-400/30'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* 3D Scroll-Reveal Featured Section */}
          <ScrollReveal3D darkMode={darkMode}>
            <FeaturedBlogPosts posts={posts} darkMode={darkMode} />
          </ScrollReveal3D>

          {/* Interactive 3D Categories Grid */}
          <ScrollReveal3D delay={0.2} darkMode={darkMode}>
            <Floating3DCategories darkMode={darkMode} />
          </ScrollReveal3D>

          {/* Parallax Blog Showcase */}
          <ParallaxBlogShowcase posts={posts} darkMode={darkMode} scrollY={scrollY} />

          {/* 3D Stats Counter */}
          <ScrollReveal3D delay={0.4} darkMode={darkMode}>
            <Interactive3DStats posts={posts} darkMode={darkMode} />
          </ScrollReveal3D>

          {/* Magnetic Card Grid */}
          <MagneticCardGrid posts={posts} darkMode={darkMode} />

          {/* Testimonials Section */}
          <ScrollReveal3D delay={0.3} darkMode={darkMode}>
            <Testimonials3D darkMode={darkMode} />
          </ScrollReveal3D>

          {/* Travel Tips Section */}
          <TravelTips3D darkMode={darkMode} scrollY={scrollY} />

          {/* Destination Highlights */}
          <DestinationHighlights darkMode={darkMode} posts={posts} />

          {/* Interactive World Explorer */}
          <ScrollReveal3D delay={0.4} darkMode={darkMode}>
            <WorldExplorer darkMode={darkMode} />
          </ScrollReveal3D>

          {/* Travel Insights */}
          <TravelInsights darkMode={darkMode} />

          {/* Photo Gallery 3D */}
          <PhotoGallery3D posts={posts} darkMode={darkMode} />

          {/* Community Section */}
          <ScrollReveal3D delay={0.5} darkMode={darkMode}>
            <CommunitySection darkMode={darkMode} />
          </ScrollReveal3D>

          {/* FAQ Accordion */}
          <FAQAccordion darkMode={darkMode} />

          {/* Newsletter with 3D Effect */}
          <ScrollReveal3D delay={0.6} darkMode={darkMode}>
            <NewsletterSignup darkMode={darkMode} />
          </ScrollReveal3D>
        </div>

        {/* Scroll Progress Indicator */}
        <ScrollProgressIndicator darkMode={darkMode} />
      </div>
    </div>
  );
}

function WeatherWidget({ weatherData, isLoading, darkMode }) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
      <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
      {isLoading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
            <p>{weatherData.condition}</p>
            <p>{weatherData.location}</p>
          </div>
          <FaSun className="text-5xl text-yellow-400" />
        </div>
      ) : (
        <p>Failed to load weather data</p>
      )}
    </div>
  );
}

function EnhancedWeatherWidget({ weatherData, isLoading, darkMode }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} rounded-2xl shadow-2xl p-8 mb-8 backdrop-blur-sm border border-white/10`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Live Weather
        </motion.h2>
        <motion.div
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {currentTime.toLocaleTimeString()}
        </motion.div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <motion.div
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="ml-3 text-gray-500">Loading weather data...</span>
        </div>
      ) : weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaSun className="text-6xl text-yellow-400 mx-auto mb-4" />
            </motion.div>
            <motion.p 
              className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {weatherData.temperature}°C
            </motion.p>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {weatherData.condition}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Location</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {weatherData.location}
                </span>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Humidity</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  65%
                </span>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wind Speed</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  12 km/h
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-8">
          <FaSun className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Failed to load weather data</p>
        </div>
      )}
    </motion.div>
  );
}

function FeaturedDestinations({ darkMode, posts }) {
  // Extract unique destinations from posts
  const destinations = posts.slice(0, 3).map((post, index) => ({
    name: post.title.split(' ').slice(0, 2).join(' '), // First two words of title
    icon: [FaUmbrellaBeach, FaPlane, FaHotel][index % 3],
    postId: post.id,
    image: post.image
  }));

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
      <h2 className="text-2xl font-bold mb-4">Featured Destinations</h2>
      <div className="grid grid-cols-3 gap-4">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.postId}
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg text-center cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to={`/blogs/singlepost/${dest.postId}`}>
            <dest.icon className={`text-3xl mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className="font-semibold">{dest.name}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrendingPosts({ darkMode, posts }) {
  // Sort posts by likes to get trending posts
  const trendingPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mt-8`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaHeart className="text-red-500 mr-2" /> Trending Posts
      </h2>
      {trendingPosts.map((post) => (
        <motion.div 
          key={post.id}
          className={`border-b last:border-b-0 py-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to={`/blogs/singlepost/${post.id}`}>
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaHeart className="mr-1" /> {post.likes}
            <FaComments className="ml-4 mr-1" /> {post.comments}
            <motion.button 
              className={`ml-auto ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShare />
            </motion.button>
          </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}





// Creative Blog Display Components

// 1. Vertical Timeline Blog Display
function VerticalTimelineBlogs({ posts, darkMode }) {
  const timelinePosts = posts.slice(0, 4);
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            darkMode ? 'bg-purple-600' : 'bg-sky-500'
          }`}
        >
          <FaCalendarAlt className="text-white text-xl" />
        </motion.div>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Latest Stories
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Follow our journey through time
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
        
        {timelinePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="relative flex items-start mb-8 last:mb-0"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-4 w-4 h-4 rounded-full border-4 ${
              darkMode ? 'bg-gray-800 border-purple-500' : 'bg-white border-sky-500'
            } z-10`}></div>
            
            {/* Content Card */}
            <div className={`ml-8 flex-1 group cursor-pointer ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } rounded-xl p-4 transition-all duration-300`}>
              <Link to={`/blogs/singlepost/${post.id}`} className="block">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={getImageAlt(post.image, post.title)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/64/64"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-xs mb-3 line-clamp-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {post.description || "Read more about this amazing destination..."}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {new Date(post.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <div className="flex items-center space-x-2">
                        <LikeButton 
                          postId={post.id} 
                          initialLikes={post.likes} 
                          size="sm" 
                          showCount={true}
                        />
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.comments} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 2. Masonry Grid Blog Display
function MasonryGridBlogs({ posts, darkMode }) {
  const masonryPosts = posts.slice(0, 6);
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            darkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}
        >
          <FaSearch className="text-white text-xl" />
        </motion.div>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Explore Grid
      </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Discover posts in a beautiful grid layout
        </p>
      </div>

      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {masonryPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`group cursor-pointer break-inside-avoid ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } rounded-xl overflow-hidden transition-all duration-300`}
          >
            <Link to={`/blogs/singlepost/${post.id}`} className="block">
              <div className="relative">
                <ImageWithFallback
                  src={post.image}
                  alt={getImageAlt(post.image, post.title)}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/200/128"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {post.title}
                </h3>
                <p className={`text-xs mb-3 line-clamp-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {post.description || "Discover more about this amazing destination..."}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {post.author}
                  </span>
                  <div className="flex items-center space-x-2">
                    <FaHeart className={`${darkMode ? 'text-red-400' : 'text-red-500'}`} />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 3. Category Tabs Blog Display
function CategoryTabsBlogs({ posts, darkMode }) {
  const [activeTab, setActiveTab] = useState('all');
  
  // Create categories from post titles
  const categories = ['all', 'travel', 'adventure', 'culture', 'food'];
  
  const filteredPosts = activeTab === 'all' 
    ? posts.slice(0, 4)
    : posts.filter(post => 
        post.title.toLowerCase().includes(activeTab) || 
        post.description?.toLowerCase().includes(activeTab)
      ).slice(0, 4);

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            darkMode ? 'bg-green-600' : 'bg-green-500'
          }`}
        >
          <FaUser className="text-white text-xl" />
        </motion.div>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Category Explorer
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Browse posts by category
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveTab(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === category
                ? darkMode 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-500 text-white'
                : darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
        </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`group cursor-pointer ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } rounded-xl p-4 transition-all duration-300`}
          >
            <Link to={`/blogs/singlepost/${post.id}`} className="block">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={getImageAlt(post.image, post.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/48/48"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm mb-1 line-clamp-1 group-hover:text-green-600 transition-colors duration-300 ${
                    darkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-xs mb-2 line-clamp-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {post.description || "Read more..."}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {post.author}
                    </span>
                    <div className="flex items-center space-x-2">
                      <LikeButton 
                        postId={post.id} 
                        initialLikes={post.likes} 
                        size="sm" 
                        showCount={true}
                      />
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
            ))}
          </div>
        </div>
  );
}

// 4. Interactive Reading Progress Blog Display
function ReadingProgressBlogs({ posts, darkMode }) {
  const [readingProgress, setReadingProgress] = useState({});
  
  const progressPosts = posts.slice(0, 3);
  
  const getReadingProgress = (postId) => {
    return readingProgress[postId] || 0;
  };

  const simulateReadingProgress = (postId) => {
    const interval = setInterval(() => {
      setReadingProgress(prev => {
        const current = prev[postId] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [postId]: current + Math.random() * 10 };
      });
    }, 1000);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            darkMode ? 'bg-orange-600' : 'bg-orange-500'
          }`}
        >
          <FaClock className="text-white text-xl" />
        </motion.div>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Reading Progress
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Track your reading journey
        </p>
      </div>

      <div className="space-y-4">
        {progressPosts.map((post, index) => {
          const progress = getReadingProgress(post.id);
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className={`group cursor-pointer ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              } rounded-xl p-4 transition-all duration-300`}
            >
              <Link to={`/blogs/singlepost/${post.id}`} className="block">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={getImageAlt(post.image, post.title)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/64/64"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      {post.title}
                    </h3>
                    
                    {/* Reading Progress Bar */}
                    <div className="mb-3">
                      <div className={`w-full h-2 rounded-full ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {Math.round(progress)}% read
                        </span>
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            simulateReadingProgress(post.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`text-xs px-2 py-1 rounded ${
                            darkMode 
                              ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                              : 'bg-orange-500 hover:bg-orange-600 text-white'
                          }`}
                        >
                          Start Reading
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {post.author} • {new Date(post.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <div className="flex items-center space-x-2">
                        <LikeButton 
                          postId={post.id} 
                          initialLikes={post.likes} 
                          size="sm" 
                          showCount={true}
                        />
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Testimonials 3D Section
function Testimonials3D({ darkMode }) {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      avatar: "🌸",
      text: "This platform transformed how I discover destinations. The community is amazing and the content is always inspiring!",
      rating: 5,
      location: "New York, USA"
    },
    {
      name: "Marco Rodriguez",
      role: "Adventure Seeker",
      avatar: "🏔️",
      text: "I've found hidden gems I never knew existed. The detailed guides and stunning photography make planning adventures so easy.",
      rating: 5,
      location: "Barcelona, Spain"
    },
    {
      name: "Yuki Tanaka",
      role: "Photography Enthusiast",
      avatar: "📸",
      text: "The visual storytelling here is exceptional. Every post inspires me to grab my camera and explore new places.",
      rating: 5,
      location: "Tokyo, Japan"
    }
  ];

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          What Travelers Say
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join thousands of happy explorers worldwide
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ 
              y: -10, 
              rotateX: 5,
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} h-full`}>
              {/* Quote Icon */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white text-2xl">"</span>
              </motion.div>

              {/* Avatar */}
              <div className="flex items-center mb-6">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mr-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.1 }}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                  >
                    <FaStar className="text-yellow-400 text-lg mr-1" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {testimonial.text}
              </p>

              {/* Location */}
              <div className="flex items-center text-xs text-gray-500">
                <FaMapMarkerAlt className="mr-1" />
                <span>{testimonial.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Travel Tips 3D Section
function TravelTips3D({ darkMode, scrollY }) {
  const tips = [
    { icon: FaPlane, title: "Book in Advance", description: "Save up to 40% by booking flights 6-8 weeks early", color: "from-blue-500 to-cyan-500" },
    { icon: FaHotel, title: "Local Stays", description: "Experience authentic culture with local accommodations", color: "from-sky-500 to-cyan-500" },
    { icon: FaCalendarAlt, title: "Off-Season Travel", description: "Visit during shoulder season for better deals and fewer crowds", color: "from-green-500 to-emerald-500" },
    { icon: FaMapMarkerAlt, title: "Research First", description: "Learn local customs and basic phrases before visiting", color: "from-orange-500 to-red-500" },
    { icon: FaSun, title: "Pack Light", description: "Travel with carry-on only to save time and money", color: "from-yellow-500 to-orange-500" },
    { icon: FaCompass, title: "Stay Flexible", description: "Allow room for spontaneous adventures and discoveries", color: "from-cyan-500 to-sky-500" },
  ];

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Pro Travel Tips
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Expert advice to make your journey unforgettable
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              z: 30,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden group h-full`}>
              {/* Animated Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                whileHover={{ scale: 1.2 }}
              />

              <div className="relative z-10">
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <tip.icon className="text-white text-2xl" />
                </motion.div>

                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {tip.title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {tip.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Destination Highlights
function DestinationHighlights({ darkMode, posts }) {
  const highlights = posts.slice(0, 4);

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Destinations
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore the world's most breathtaking locations
        </p>
      </motion.div>

      <div className="space-y-12">
        {highlights.map((post, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Link to={`/blogs/singlepost/${post.id}`}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  {/* Image Section */}
                  <motion.div 
                    className="lg:w-1/2"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-80 object-cover"
                          fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/600/400"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <motion.div 
                    className="lg:w-1/2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="inline-block mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Destination #{index + 1}
                      </span>
                    </motion.div>

                    <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {post.description || "Discover the beauty and wonder of this incredible destination. From stunning landscapes to rich cultural experiences, every moment is an adventure waiting to happen."}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <FaHeart className="text-red-500" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {post.likes} Likes
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaComments className="text-blue-500" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {post.comments} Comments
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-green-500" />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          5 min read
                        </span>
                      </div>
                    </div>

                    <motion.button
                      className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Destination →
                    </motion.button>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// World Explorer Interactive
function WorldExplorer({ darkMode }) {
  const regions = [
    { name: "Asia", count: 145, icon: "🏯", color: "from-red-500 to-orange-500" },
    { name: "Europe", count: 98, icon: "🏰", color: "from-blue-500 to-cyan-500" },
    { name: "Americas", count: 87, icon: "🗽", color: "from-green-500 to-emerald-500" },
    { name: "Africa", count: 56, icon: "🦁", color: "from-yellow-500 to-orange-600" },
    { name: "Oceania", count: 42, icon: "🏝️", color: "from-sky-500 to-cyan-500" },
  ];

  return (
    <section className="mb-24">
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-sky-50 to-blue-50'} rounded-3xl p-12 shadow-2xl relative overflow-hidden`}>
        {/* Animated Globe Background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <FaGlobe className="text-9xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Explore the World
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover destinations across all continents
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="cursor-pointer"
              >
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-shadow`}>
                  <motion.div 
                    className={`text-5xl mb-3`}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {region.icon}
                  </motion.div>
                  <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {region.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {region.count} destinations
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Travel Insights
function TravelInsights({ darkMode }) {
  const insights = [
    { label: "Countries Covered", value: "150+", icon: FaGlobe, color: "from-blue-500 to-cyan-500" },
    { label: "Active Travelers", value: "50K+", icon: FaUser, color: "from-sky-500 to-cyan-500" },
    { label: "Photos Shared", value: "100K+", icon: FaCompass, color: "from-green-500 to-emerald-500" },
    { label: "Travel Guides", value: "500+", icon: FaPlane, color: "from-orange-500 to-red-500" },
  ];

  return (
    <section className="mb-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            whileHover={{ 
              scale: 1.1,
              rotateX: 10,
              z: 30,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} rounded-2xl p-6 text-center shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-br ${insight.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <insight.icon className="text-white text-2xl" />
              </motion.div>
              <motion.div 
                className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {insight.value}
              </motion.div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {insight.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Photo Gallery 3D
function PhotoGallery3D({ posts, darkMode }) {
  const galleryPosts = posts.slice(0, 8);

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Travel Gallery
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          A visual journey around the world
        </p>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
        {galleryPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.05,
              rotateZ: index % 2 === 0 ? 2 : -2,
              z: 50,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="break-inside-avoid"
          >
            <Link to={`/blogs/singlepost/${post.id}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className={`w-full ${index % 3 === 0 ? 'h-64' : index % 3 === 1 ? 'h-48' : 'h-56'} object-cover group-hover:scale-110 transition-transform duration-500`}
                  fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/300/400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-sm mb-2 line-clamp-2">{post.title}</h4>
                    <div className="flex items-center space-x-3 text-white text-xs">
                      <span className="flex items-center">
                        <FaHeart className="mr-1 text-red-400" /> {post.likes}
                      </span>
                      <span className="flex items-center">
                        <FaComments className="mr-1 text-blue-400" /> {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Community Section
function CommunitySection({ darkMode }) {
  const features = [
    { icon: FaUser, title: "Join Community", description: "Connect with fellow travelers", color: "from-blue-500 to-cyan-500" },
    { icon: FaShare, title: "Share Stories", description: "Post your travel experiences", color: "from-sky-500 to-cyan-500" },
    { icon: FaStar, title: "Get Featured", description: "Showcase your best content", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <section className="mb-24">
      <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-sky-500'} rounded-3xl p-12 text-white relative overflow-hidden`}>
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Be part of a global network of passionate travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="text-white text-2xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-white text-sky-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now - It's Free!
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// FAQ Accordion
function FAQAccordion({ darkMode }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I start planning my trip?",
      answer: "Browse our destination guides, read traveler reviews, and use our interactive planning tools to create your perfect itinerary. Our community is always here to help with tips and recommendations."
    },
    {
      question: "Can I contribute my own travel stories?",
      answer: "Absolutely! Join our community and share your adventures. Your stories can inspire thousands of fellow travelers. Simply create an account and start posting."
    },
    {
      question: "Are the travel tips verified?",
      answer: "Yes! All our content is curated by experienced travelers and verified by our editorial team. We ensure accuracy and relevance for every destination."
    },
    {
      question: "How often is content updated?",
      answer: "We update our content daily with fresh stories, new destinations, and the latest travel trends. Subscribe to our newsletter to stay informed."
    },
    {
      question: "Is there a mobile app available?",
      answer: "We're currently working on mobile apps for iOS and Android. In the meantime, our website is fully responsive and works great on all devices."
    }
  ];

  return (
    <section className="mb-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Everything you need to know
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.button
                className="w-full p-6 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className={`text-lg font-bold pr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  <FaChevronDown />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 pt-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Scroll Progress Indicator
function ScrollProgressIndicator({ darkMode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500"
      style={{ 
        scaleX: scrollProgress / 100,
        transformOrigin: '0%',
      }}
      initial={{ scaleX: 0 }}
    />
  );
}

export default Home;