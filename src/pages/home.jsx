import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { FaFire, FaHeart, FaComments, FaShare, FaChevronDown, FaPlane, FaHotel, FaUmbrellaBeach, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaSun, FaGlobe, FaUser, FaComment, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Post from '../components/post';
import { useTheme } from '../context/themeContext';
import { usePosts } from '../context/postsContext';
import { getImageAlt } from '../utils/imageUtils';
import ImageWithFallback from '../components/ImageWithFallback';
import LikeButton from '../components/LikeButton';
import image4 from '../images/image4.jpg';
import image9 from '../images/image9.jpg';
import image12 from '../images/image12.jpg';

const images = [
  image4,image9,image12
];

const headings = [
  "Welcome to WanderLuxe Ventures",
  "Explore Exotic Destinations",
  "Experience Luxury Travel"
];

const subheadings = [
  "Discover the world's hidden gems",
  "Unforgettable journeys await",
  "Indulge in extraordinary adventures"
];

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { darkMode, toggleDarkMode } = useTheme();
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % headings.length);
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
              <img src={images[currentImageIndex]} alt="WanderLuxe Ventures" className="w-full h-full object-cover" />
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
              {headings[currentTextIndex]}
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
              {subheadings[currentTextIndex]}
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
            <FeaturedDestinations darkMode={darkMode} />
            <Post />
            <TrendingPosts darkMode={darkMode} />
            <VirtualTourSection darkMode={darkMode} />
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/3 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Trending Sidebar */}
            <div className={`sticky top-24 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
              {/* Header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    darkMode ? 'bg-red-600' : 'bg-red-500'
                  }`}
                >
                  <FaFire className="text-white text-xl" />
                </motion.div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Trending Now
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Hot posts everyone's talking about
                </p>
              </div>

              {/* Trending Posts */}
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
                            fallbackSrc="http://127.0.0.1:8000/api/placeholder/80/80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Trending Badge */}
                          <div className="absolute top-1 left-1">
                            <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                              darkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
                            }`}>
                              #{index + 1}
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 ${
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
                        darkMode ? 'bg-red-500' : 'bg-red-600'
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
                  View All Trending
                </Link>
              </motion.div>
            </div>

            {/* Best Places to Chill Sidebar */}
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
                  <FaLeaf className="text-white text-xl" />
                </motion.div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Best Places to Chill
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Relaxing destinations for your soul
                </p>
              </div>

              {/* Chill Posts */}
              <div className="space-y-4">
                {posts.slice(3, 6).map((post, index) => (
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
                            fallbackSrc="http://127.0.0.1:8000/api/placeholder/80/80"
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
                  View All Chill Spots
                </Link>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {posts.length}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Posts
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {posts.reduce((sum, post) => sum + post.likes, 0)}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Likes
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <Newsletter darkMode={darkMode} />
            <TravelQuiz darkMode={darkMode} />
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

function FeaturedDestinations({ darkMode }) {
  const destinations = [
    { name: "Bali", icon: FaUmbrellaBeach },
    { name: "Paris", icon: FaPlane },
    { name: "New York", icon: FaHotel },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
      <h2 className="text-2xl font-bold mb-4">Featured Destinations</h2>
      <div className="grid grid-cols-3 gap-4">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.name}
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg text-center`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <dest.icon className={`text-3xl mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className="font-semibold">{dest.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrendingPosts({ darkMode }) {
  const posts = [
    { id: 1, title: "10 Hidden Gems in Southeast Asia", likes: 1234, comments: 56 },
    { id: 2, title: "Ultimate Guide to Budget Travel in Europe", likes: 987, comments: 43 },
    { id: 3, title: "Top 5 Luxury Resorts for a Dreamy Getaway", likes: 2345, comments: 78 },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mt-8`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaFire className="text-red-500 mr-2" /> Trending Posts
      </h2>
      {posts.map((post) => (
        <motion.div 
          key={post.id}
          className={`border-b last:border-b-0 py-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
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
        </motion.div>
      ))}
    </div>
  );
}

function Newsletter({ darkMode }) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-100'} rounded-lg shadow-md p-6 mt-8`}>
      <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Get the latest travel tips and exclusive offers straight to your inbox!</p>
      <form className="flex flex-col space-y-4">
        <input 
          type="email" 
          placeholder="Your email address" 
          className={`px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
        <motion.button 
          type="submit"
          className={`${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } px-4 py-2 rounded-md transition duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </form>
    </div>
  );
}

function VirtualTourSection({ darkMode }) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mt-8`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaGlobe className="text-blue-500 mr-2" /> Virtual Tours
      </h2>
      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Experience destinations from the comfort of your home with our immersive virtual tours.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {['Paris', 'Tokyo', 'New York', 'Rome'].map((city) => (
          <motion.div
            key={city}
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg text-center cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="font-semibold mb-2">{city}</h3>
            <button className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-4 py-2 rounded-full`}>
              Start Tour
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TravelQuiz({ darkMode }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which continent is Egypt in?",
      options: ["Africa", "Asia", "Europe", "South America"],
      correctAnswer: "Africa"
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      correctAnswer: "Yen"
    }
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mt-8`}>
      <h2 className="text-2xl font-bold mb-4">Travel Quiz</h2>
      {showResult ? (
        <div>
          <p className="text-xl mb-4">Your score: {score} out of {questions.length}</p>
          <motion.button
            onClick={resetQuiz}
            className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-4 py-2 rounded-full`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      ) : (
        <div>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-2 rounded ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;