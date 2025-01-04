import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { FaFire, FaHeart, FaComments, FaShare, FaChevronDown } from 'react-icons/fa';
import Sidebar from '../components/sidebar';
import Post from '../components/post';
import { useTheme } from '../context/themeContext';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

const images = [
  image1,image2,image3
];

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h1 
            className="font-serif text-center text-white text-4xl md:text-6xl font-bold mb-4"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            Welcome to WanderLuxe Ventures
          </motion.h1>
          <motion.p
            className="text-white text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover the world's hidden gems
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="#content" className="text-white text-4xl animate-bounce">
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
            <Post />
            <TrendingPosts darkMode={darkMode} />
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sidebar title="Trending" />
            <Sidebar title="Best places to chill" />
            <Newsletter darkMode={darkMode} />
          </motion.div>
        </div>
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

export default Home;