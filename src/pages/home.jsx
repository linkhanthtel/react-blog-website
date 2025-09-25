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
import image4 from '../images/image4.jpg';

// Dynamic content will be generated from backend data

// Floating Icons Component - Mobile Optimized
function FloatingIcons({ mousePosition }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const iconCount = isMobile ? 4 : 8; // Reduce icons on mobile
  
  const allIcons = [
    { Icon: FaPlane, delay: 0, x: 10, y: 20 },
    { Icon: FaMountain, delay: 0.5, x: 85, y: 15 },
    { Icon: FaWater, delay: 1, x: 15, y: 80 },
    { Icon: FaLeaf, delay: 1.5, x: 80, y: 75 },
    { Icon: FaGlobe, delay: 2, x: 50, y: 10 },
    { Icon: FaCompass, delay: 2.5, x: 90, y: 50 },
    { Icon: FaRocket, delay: 3, x: 5, y: 50 },
    { Icon: FaStar, delay: 3.5, x: 70, y: 90 },
  ];

  const icons = allIcons.slice(0, iconCount);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-white/20"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: isMobile ? 6 : 4, // Slower on mobile
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 0.8,
            transition: { duration: 0.2 }
          }}
        >
          <Icon size={isMobile ? 20 : 24} />
        </motion.div>
      ))}
    </div>
  );
}

// Interactive Button Component
function InteractiveButton({ icon: Icon, text, color, hoverColor, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-semibold flex items-center justify-center text-white transition-all duration-300 bg-gradient-to-r ${color} hover:${hoverColor} shadow-lg hover:shadow-xl w-full sm:w-auto min-w-[200px] sm:min-w-0`}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <Icon className="mr-2 sm:mr-3 relative z-10 text-sm sm:text-base" />
      <span className="relative z-10 text-sm sm:text-base">{text}</span>
    </motion.button>
  );
}

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();
  const { posts } = usePosts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [gradientAngle, setGradientAngle] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  // Mouse tracking for interactive effects
  const handleMouseMove = useCallback((e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [handleMouseMove]);

  // Generate dynamic content from posts
  const dynamicImages = posts.slice(0, 3).map(post => post.image).filter(Boolean);
  const dynamicHeadings = posts.slice(0, 3).map(post => post.title);
  const dynamicSubheadings = posts.slice(0, 3).map(post => post.description || "Discover amazing destinations and experiences");

  // Particle system - optimized for mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50; // Reduce particles on mobile
    
    const generateParticles = () => {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 2 : 4) + 1,
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * 360,
        opacity: Math.random() * 0.6 + 0.2,
        color: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction * Math.PI / 180) * particle.speed) % 100,
        y: (particle.y + Math.sin(particle.direction * Math.PI / 180) * particle.speed) % 100,
        direction: particle.direction + (Math.random() - 0.5) * 2
      })));
    }, isMobile ? 100 : 50); // Slower updates on mobile

    return () => clearInterval(interval);
  }, []);

  // Dynamic gradient rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle(prev => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentHeading = dynamicHeadings[currentTextIndex] || "Welcome to WanderLuxe Ventures";
    let index = 0;
    setIsTyping(true);
    setTypedText('');

    const typeInterval = setInterval(() => {
      if (index < currentHeading.length) {
        setTypedText(currentHeading.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentTextIndex, dynamicHeadings]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dynamicImages.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dynamicImages.length);
      }
      if (dynamicHeadings.length > 0) {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicHeadings.length);
      }
      setCurrentTime(new Date());
    }, 8000);
    return () => clearInterval(interval);
  }, [dynamicImages.length, dynamicHeadings.length]);

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

  const imageSpring = useSpring({
    opacity: 1,
    transform: `scale(${1 + scrollY * 0.001})`,
    config: { duration: 0 }
  });

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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} scroll-smooth`}>
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

      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Animated Background Images */}
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <animated.div style={imageSpring} className="w-full h-full">
              <ImageWithFallback 
                src={dynamicImages[currentImageIndex] || image4} 
                alt="WanderLuxe Ventures" 
                className="w-full h-full object-cover"
                fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/1200/600"
              />
            </animated.div>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Gradient Overlays */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(${gradientAngle}deg, 
              rgba(59, 130, 246, 0.3) 0%, 
              rgba(16, 185, 129, 0.3) 25%, 
              rgba(139, 92, 246, 0.3) 50%, 
              rgba(245, 158, 11, 0.3) 75%, 
              rgba(239, 68, 68, 0.3) 100%)`
          }}
        />
        
        {/* Interactive Radial Gradient */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(0, 0, 0, 0.3) 70%)`
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.opacity,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <FloatingIcons mousePosition={mousePosition} />

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          {/* Time Display */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-lg md:text-xl mb-4 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full"
          >
            <FaClock className="inline mr-2" />
            {currentTime.toLocaleTimeString()}
          </motion.div>

          {/* Dynamic Main Heading with Typewriter Effect */}
          <div className="text-center mb-4 px-4">
            <motion.h1 
              className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {typedText}
                {isTyping && <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-white"
                >|</motion.span>}
              </span>
            </motion.h1>
          </div>

          {/* Dynamic Subheading */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              className="text-white text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-center max-w-4xl backdrop-blur-sm bg-black/20 px-4 sm:px-6 py-3 rounded-2xl mx-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {dynamicSubheadings[currentTextIndex] || "Discover the world's hidden gems"}
            </motion.p>
          </AnimatePresence>

          {/* Interactive Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4"
          >
            <InteractiveButton
              icon={FaSearch}
              text="Search Destinations"
              color="from-blue-500 to-blue-600"
              hoverColor="from-blue-600 to-blue-700"
              delay={0}
            />
            <InteractiveButton
              icon={FaMapMarkerAlt}
              text="Plan Your Trip"
              color="from-green-500 to-green-600"
              hoverColor="from-green-600 to-green-700"
              delay={0.1}
            />
            <InteractiveButton
              icon={FaCalendarAlt}
              text="Book Now"
              color="from-purple-500 to-purple-600"
              hoverColor="from-purple-600 to-purple-700"
              delay={0.2}
            />
          </motion.div>

          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="backdrop-blur-sm bg-black/30 rounded-2xl p-4 mb-8"
          >
            <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} darkMode={darkMode} />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8"
          >
            <motion.a 
              href="#content" 
              className="text-white text-4xl block"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.2 }}
            >
              <FaChevronDown />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Parallax Background Elements */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/10 to-purple-50/10 dark:from-transparent dark:via-blue-900/10 dark:to-purple-900/10"
          style={{ y: yTransform }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-blue-200/20 dark:border-blue-400/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                x: xTransform,
                y: yTransform,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div id="content" className="container mx-auto px-4 py-16 relative z-10">
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