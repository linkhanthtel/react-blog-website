import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useSpring, animated, useTrail } from 'react-spring';
import { FaHeart, FaComments, FaShare, FaChevronDown, FaPlane, FaHotel, FaUmbrellaBeach, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaSun, FaUser, FaClock, FaStar, FaRocket, FaGlobe, FaCompass, FaMountain, FaWater, FaLeaf, FaFire, FaSnowflake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Post from '../components/post';
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

// Clean Button Component (keeping for compatibility)
function CleanButton({ icon: Icon, text, variant }) {
  const variants = {
    primary: "bg-white text-gray-900 hover:bg-gray-100 shadow-lg",
    secondary: "bg-gray-900/50 text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm",
    outline: "bg-transparent text-white border border-white/40 hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`px-8 py-4 rounded-full font-medium flex items-center justify-center transition-all duration-300 ${variants[variant]}`}
    >
      <Icon className="mr-3 text-lg" />
      <span>{text}</span>
    </motion.button>
  );
}

// Featured Blog Posts Component
function FeaturedBlogPosts({ posts, darkMode }) {
  const featuredPosts = posts.slice(0, 3);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Stories
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Discover our most popular travel experiences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden group cursor-pointer border ${darkMode ? 'border-gray-700' : 'border-sky-200'}`}
          >
            <Link to={`/blogs/singlepost/${post.id}`}>
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/400/300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-4 group-hover:text-sky-600 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-6 line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.description || "Read more about this amazing destination..."}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaHeart className="text-red-500 mr-1" />
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <FaComments className="text-blue-500 mr-1" />
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.comments}</span>
                    </div>
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

// Blog Categories Component
function BlogCategories({ darkMode }) {
  const categories = [
    { name: 'Adventure', icon: FaMountain, count: 12, color: 'bg-green-500' },
    { name: 'Culture', icon: FaGlobe, count: 8, color: 'bg-blue-500' },
    { name: 'Food', icon: FaLeaf, count: 15, color: 'bg-orange-500' },
    { name: 'Beaches', icon: FaWater, count: 10, color: 'bg-cyan-500' },
    { name: 'Cities', icon: FaPlane, count: 20, color: 'bg-purple-500' },
    { name: 'Nature', icon: FaStar, count: 18, color: 'bg-pink-500' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-16"
    >
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Explore by Category
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Find your perfect travel inspiration
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-sky-200'}`}
          >
            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <category.icon className="text-white text-2xl" />
            </div>
            <h3 className={`font-semibold mb-3 text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.name}
            </h3>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {category.count} posts
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mb-16"
    >
      <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-sky-500 to-sky-600'} rounded-2xl p-8 md:p-12 text-center text-white`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
        <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
          Get the latest travel stories and tips delivered to your inbox
        </p>
        
        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-2xl mb-2">✅</div>
            <p className="text-lg">Thank you for subscribing!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-sky-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </form>
        )}
      </div>
    </motion.section>
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsWeatherLoading(true);
      try {
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({ 
            temperature: 25, 
            condition: 'Sunny', 
            location: 'Paradise City' 
          }), 1000)
        );
        setWeatherData(response);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsWeatherLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Parallax transforms
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 1000], [0, -200]);
  const xTransform = useTransform(y, [0, 1000], [0, 100]);

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
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

      {/* Blog Content Section */}
      <div className={`relative ${darkMode ? 'bg-gray-900' : 'bg-sky-100'}`}>
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Featured Blog Posts Section */}
          <FeaturedBlogPosts posts={posts} darkMode={darkMode} />
          
          {/* Blog Categories Section */}
          <BlogCategories darkMode={darkMode} />
          
          {/* Recent Posts Grid */}
          <RecentPostsGrid posts={posts} darkMode={darkMode} />
          
          {/* Blog Statistics */}
          <BlogStatistics posts={posts} darkMode={darkMode} />
          
          {/* Newsletter Signup */}
          <NewsletterSignup darkMode={darkMode} />
        </div>
      </div>

      {/* Parallax Background Elements */}
      <div className={`relative ${darkMode ? 'bg-gray-900' : 'bg-sky-50'}`}>
        <motion.div
          className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/5' : 'bg-gradient-to-b from-transparent via-sky-100/30 to-sky-200/20'}`}
          style={{ y: yTransform }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-24 h-24 border rounded-full ${darkMode ? 'border-blue-400/10' : 'border-sky-300/40'}`}
              style={{
                left: `${15 + i * 25}%`,
                top: `${20 + i * 15}%`,
                x: xTransform,
                y: yTransform,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 30 + i * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div id="content" className={`container mx-auto px-4 pt-20 relative z-10 ${darkMode ? 'bg-gray-900' : 'bg-sky-50'}`}>
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
              className="w-full lg:w-2/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ y: yTransform }}
            >
              <EnhancedWeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} darkMode={darkMode} />
              <FeaturedDestinations darkMode={darkMode} posts={posts} />
              <Post />
              <TrendingPosts darkMode={darkMode} posts={posts} />
            </motion.div>
            <motion.div 
              className="w-full lg:w-1/3 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ y: yTransform }}
            >
              {/* Creative Blog Displays Container */}
              <div className="space-y-6 relative z-10">
                {/* Vertical Timeline Blog Display */}
                <VerticalTimelineBlogs posts={posts} darkMode={darkMode} />
                
                {/* Masonry Grid Blog Display */}
                <MasonryGridBlogs posts={posts} darkMode={darkMode} />
                
                {/* Category Tabs Blog Display */}
                <CategoryTabsBlogs posts={posts} darkMode={darkMode} />
                
                {/* Interactive Reading Progress */}
                <ReadingProgressBlogs posts={posts} darkMode={darkMode} />
              </div>
            </motion.div>
          </div>
        </div>
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
            darkMode ? 'bg-purple-600' : 'bg-purple-500'
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
              darkMode ? 'bg-gray-800 border-purple-500' : 'bg-white border-purple-500'
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
                    <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 ${
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

export default Home;