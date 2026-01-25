import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun, FaUser, FaSignOutAlt, FaBrain, FaPlane, FaRocket } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import AuthModal from './authModal';
import apiService from '../services/api';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check AI status on component mount
  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        const status = await apiService.getAIHealth();
        setAiStatus(status);
      } catch (err) {
        console.log('AI services not available:', err.message);
        setAiStatus({ error: 'AI services not available' });
      }
    };

    checkAIStatus();
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    closeMenu(); // Close mobile menu when link is clicked
    window.location.href = href;
  };

  // Check if current path matches
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? (darkMode ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl' : 'bg-white/95 backdrop-blur-md shadow-2xl') 
            : (darkMode ? 'bg-transparent' : 'bg-transparent')
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with 3D Animation */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2">
                <motion.div
                  className={`p-2 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'} shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaPlane className="text-white text-xl" />
                </motion.div>
                <motion.span 
                  className={`text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="hidden sm:inline">WanderLuxe Ventures</span>
                  <span className="sm:hidden">WanderLuxe</span>
                </motion.span>
              </Link>
            </motion.div>
          {/* Desktop Navigation with 3D Effects */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {['Home', 'Blogs', 'Destinations', 'About', 'Contact'].map((item, index) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                const active = isActive(path);
                
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link 
                      to={path} 
                      onClick={handleLinkClick}
                      className="relative group"
                    >
                      <motion.span
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 block ${
                          active
                            ? darkMode 
                              ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                              : 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                            : darkMode 
                              ? 'text-gray-200 hover:text-white' 
                              : 'text-gray-700 hover:text-gray-900'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.span>
                      
                      {/* Animated underline */}
                      {!active && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                            darkMode ? 'bg-blue-400' : 'bg-blue-600'
                          } origin-left`}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Right Side Actions with 3D Effects */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle with 3D Animation */}
            <motion.button 
              onClick={toggleDarkMode} 
              className={`p-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                darkMode 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaSun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaMoon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Enhanced AI Status Indicator with 3D Pulse */}
            {aiStatus && (
              <motion.div 
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-lg ${
                  aiStatus.error 
                    ? darkMode ? 'bg-red-900/40 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-600 border border-red-300'
                    : darkMode ? 'bg-green-900/40 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600 border border-green-300'
                }`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Pulsing Dot */}
                <motion.div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                    aiStatus.error ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  animate={{ rotate: aiStatus.error ? 0 : 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <FaBrain className="h-4 w-4" />
                </motion.div>
                <span className="hidden lg:inline">
                  {aiStatus.error ? 'AI Offline' : 'AI Online'}
                </span>
              </motion.div>
            )}
            
            {/* Enhanced Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to="/manage-blogs"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      darkMode 
                        ? 'text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-300'
                    }`}
                  >
                    <motion.span whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                      <FaRocket className="h-4 w-4" />
                      <span className="hidden xl:inline">Manage Blogs</span>
                    </motion.span>
                  </Link>
                </motion.div>
                
                <motion.div
                  className={`px-3 py-2 rounded-xl text-sm font-medium ${
                    darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'
                  } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <span className="hidden lg:inline">Hi, {user?.username}!</span>
                  <span className="lg:hidden">{user?.username?.charAt(0)}</span>
                </motion.div>
                
                <motion.button
                  onClick={logout}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    darkMode 
                      ? 'text-red-400 hover:bg-red-900/30 border border-red-900/50' 
                      : 'text-red-600 hover:bg-red-100 border border-red-200'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  title="Logout"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <FaUser className="h-4 w-4" />
                <span>Login</span>
              </motion.button>
            )}
          </div>
          {/* Mobile Actions with 3D Effects */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme toggle for mobile with animation */}
            <motion.button 
              onClick={toggleDarkMode} 
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun-mobile"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaSun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon-mobile"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaMoon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Enhanced Mobile menu button */}
            <motion.button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 shadow-lg ${
                darkMode 
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              } focus:outline-none`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="block h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="block h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Animated Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Enhanced Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              className="md:hidden overflow-hidden relative z-50 mx-3 mt-2 rounded-2xl shadow-2xl"
              id="mobile-menu"
            >
              <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'} backdrop-blur-xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {/* Navigation Links with 3D Cards */}
                <div className="px-4 py-6 space-y-2">
                  {['Home', 'Blogs', 'Destinations', 'About', 'Contact'].map((item, index) => {
                    const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                    const active = isActive(path);
                    
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -30, rotateY: -20 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.08,
                          type: 'spring',
                          stiffness: 150
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <Link
                          to={path}
                          onClick={handleLinkClick}
                          className={`block px-5 py-4 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden ${
                            active
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : darkMode 
                                ? 'text-gray-200 hover:bg-gray-800 border border-gray-700' 
                                : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {/* Shimmer effect on hover */}
                          {!active && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center justify-between">
                            {item}
                            {active && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-xs">✨</motion.span>
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Enhanced User Section */}
                <div className={`px-4 py-6 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-50 to-white'}`}>
                  {isAuthenticated ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
                      className="space-y-3"
                    >
                      {/* User Welcome Card */}
                      <motion.div 
                        className={`px-4 py-3 rounded-xl ${darkMode ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-800' : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300'}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            {user?.username?.charAt(0).toUpperCase()}
                          </motion.div>
                          <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back!</p>
                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.username}</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Manage Blogs Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to="/manage-blogs"
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-5 py-4 rounded-xl text-base font-medium transition-all duration-300 border-2 ${
                            darkMode 
                              ? 'text-gray-200 hover:bg-gray-700 border-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100 border-gray-300'
                          }`}
                        >
                          <FaRocket className="h-5 w-5" />
                          <span>Manage Blogs</span>
                        </Link>
                      </motion.div>
                      
                      {/* Logout Button */}
                      <motion.button
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                        className={`w-full flex items-center justify-center space-x-3 px-5 py-4 rounded-xl text-base font-medium transition-all duration-300 shadow-lg ${
                          darkMode 
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border-2 border-red-900/50' 
                            : 'bg-red-100 text-red-600 hover:bg-red-200 border-2 border-red-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaSignOutAlt className="h-5 w-5" />
                        <span>Logout</span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
                    >
                      <motion.button
                        onClick={() => {
                          setShowAuthModal(true);
                          closeMenu();
                        }}
                        className={`w-full flex items-center justify-center space-x-3 px-5 py-4 rounded-xl text-base font-medium transition-all duration-300 shadow-xl ${
                          darkMode 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:shadow-2xl' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl'
                        }`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaUser className="h-5 w-5" />
                        <span>Login / Sign Up</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      </motion.nav>
    </>
  );
}

export default Navbar;