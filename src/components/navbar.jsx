import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun, FaUser, FaSignOutAlt, FaBrain } from "react-icons/fa";
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
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? (darkMode ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-lg') 
        : (darkMode ? 'bg-transparent' : 'bg-transparent')
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
              <span className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="hidden sm:inline">WanderLuxe Ventures</span>
                <span className="sm:hidden">WanderLuxe</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home', 'Blogs', 'Destinations', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  onClick={handleLinkClick}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    darkMode 
                      ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full transition duration-300 ${
                darkMode 
                  ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>

            {/* AI Status Indicator */}
            {aiStatus && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                aiStatus.error 
                  ? darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                  : darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                <FaBrain className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {aiStatus.error ? 'AI Offline' : 'AI Online'}
                </span>
              </div>
            )}
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/manage-blogs"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    darkMode 
                      ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  Manage Blogs
                </Link>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={logout}
                  className={`p-2 rounded-full transition duration-300 ${
                    darkMode 
                      ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Logout"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <FaUser className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme toggle for mobile */}
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full transition duration-300 ${
                darkMode 
                  ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
            </button>
            
            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md transition duration-300 ${
                darkMode 
                  ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded="false"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <FaTimes className="block h-5 w-5" />
                ) : (
                  <FaBars className="block h-5 w-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden relative z-50"
              id="mobile-menu"
            >
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Navigation Links */}
              <div className="px-4 py-4 space-y-2">
                {['Home', 'Blogs', 'Destinations', 'About', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      onClick={handleLinkClick}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition duration-300 ${
                        darkMode 
                          ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* User Section */}
              <div className={`px-4 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {isAuthenticated ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Welcome, {user?.username}
                      </span>
                    </div>
                    <Link
                      to="/manage-blogs"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition duration-300 ${
                        darkMode 
                          ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      Manage Blogs
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition duration-300 ${
                        darkMode 
                          ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        closeMenu();
                      }}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition duration-300 ${
                        darkMode 
                          ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <FaUser className="h-4 w-4" />
                      <span>Login</span>
                    </button>
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
    </nav>
  );
}

export default Navbar;