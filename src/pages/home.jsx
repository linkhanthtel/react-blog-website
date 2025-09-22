import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { FaHeart, FaComments, FaShare, FaChevronDown, FaPlane, FaHotel, FaUmbrellaBeach, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaSun, FaUser, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Post from '../components/post';
import { useTheme } from '../context/themeContext';
import { usePosts } from '../context/postsContext';
import { getImageAlt } from '../utils/imageUtils';
import ImageWithFallback from '../components/ImageWithFallback';
import LikeButton from '../components/LikeButton';
import image4 from '../images/image4.jpg';

// Dynamic content will be generated from backend data

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();
  const { posts } = usePosts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate dynamic content from posts
  const dynamicImages = posts.slice(0, 3).map(post => post.image).filter(Boolean);
  const dynamicHeadings = posts.slice(0, 3).map(post => post.title);
  const dynamicSubheadings = posts.slice(0, 3).map(post => post.description || "Discover amazing destinations and experiences");

  useEffect(() => {
    const interval = setInterval(() => {
      if (dynamicImages.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dynamicImages.length);
      }
      if (dynamicHeadings.length > 0) {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicHeadings.length);
      }
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, [dynamicImages.length, dynamicHeadings.length]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsWeatherLoading(true);
      try {
        // This is a mock API call. In a real application, you would call an actual weather API.
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <animated.div style={imageSpring} className="w-full h-full">
              <ImageWithFallback 
                src={dynamicImages[currentImageIndex] || image4} 
                alt="WanderLuxe Ventures" 
                className="w-full h-full object-cover"
                fallbackSrc="http://127.0.0.1:8000/api/placeholder/1200/600"
              />
            </animated.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-lg md:text-xl mb-4"
          >
            {currentTime.toLocaleTimeString()}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentTextIndex}
              className="font-serif text-center text-white text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {dynamicHeadings[currentTextIndex] || "Welcome to WanderLuxe Ventures"}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              className="text-white text-xl md:text-2xl mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {dynamicSubheadings[currentTextIndex] || "Discover the world's hidden gems"}
            </motion.p>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center"
            >
              <FaSearch className="mr-2" /> Search Destinations
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold flex items-center"
            >
              <FaMapMarkerAlt className="mr-2" /> Plan Your Trip
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold flex items-center"
            >
              <FaCalendarAlt className="mr-2" /> Book Now
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12"
          >
            <a href="#content" className="text-white text-4xl animate-bounce block">
              <FaChevronDown />
            </a>
          </motion.div>
        </div>
      </div>

      <div id="content" className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} darkMode={darkMode} />
            <FeaturedDestinations darkMode={darkMode} posts={posts} />
            <Post />
            <TrendingPosts darkMode={darkMode} posts={posts} />
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/3 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
                      fallbackSrc="http://127.0.0.1:8000/api/placeholder/64/64"
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
                  fallbackSrc="http://127.0.0.1:8000/api/placeholder/200/128"
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
                    fallbackSrc="http://127.0.0.1:8000/api/placeholder/48/48"
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
                      fallbackSrc="http://127.0.0.1:8000/api/placeholder/64/64"
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