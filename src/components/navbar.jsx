import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaPen } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import AuthModal from './authModal';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
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
      {/* Elegant Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left"
        style={{ 
          scaleX: scrollProgress / 100,
          background: darkMode 
            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 50%, rgba(236, 72, 153, 0.8) 100%)'
            : 'linear-gradient(90deg, rgba(59, 130, 246, 1) 0%, rgba(56, 189, 248, 1) 50%, rgba(14, 165, 233, 1) 100%)'
        }}
        initial={{ scaleX: 0 }}
      />

      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? (darkMode 
                ? 'bg-gray-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border-b border-gray-800/50' 
                : 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border-b border-gray-200/50') 
            : (darkMode ? 'bg-transparent' : 'bg-transparent')
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Futuristic Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link to="/" onClick={handleLinkClick} className="relative group">
                <motion.span 
                  className={`text-xl sm:text-2xl lg:text-3xl font-light tracking-tight ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                  whileHover={{ letterSpacing: '0.05em' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="hidden sm:inline">WanderLuxe</span>
                  <span className="sm:hidden">WL</span>
                </motion.span>
                {/* Elegant underline on hover */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                      : 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500'
                  }`}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </Link>
            </motion.div>
          {/* Futuristic Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {['Home', 'Blogs', 'About', 'Contact'].map((item, index) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                const active = isActive(path);
                
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                  >
                    <Link 
                      to={path} 
                      onClick={handleLinkClick}
                      className="relative group px-4 py-2 block"
                    >
                      <motion.span
                        className={`text-sm font-light tracking-wide transition-all duration-500 ${
                          active
                            ? darkMode 
                              ? 'text-white' 
                              : 'text-gray-900'
                            : darkMode 
                              ? 'text-gray-400 hover:text-gray-200' 
                              : 'text-gray-600 hover:text-gray-900'
                        }`}
                        whileHover={{ letterSpacing: '0.1em' }}
                        transition={{ duration: 0.3 }}
                      >
                        {item}
                      </motion.span>
                      
                      {/* Elegant active indicator */}
                      {active && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-px ${
                            darkMode 
                              ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
                              : 'bg-gradient-to-r from-transparent via-blue-600 to-transparent'
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      {!active && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-px ${
                            darkMode 
                              ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent' 
                              : 'bg-gradient-to-r from-transparent via-sky-500 to-transparent'
                          }`}
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Right side: theme toggle + auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle – icon button */}
            <motion.button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2.5 rounded-xl transition-colors duration-300 ${
                darkMode
                  ? 'text-amber-300 hover:text-amber-200 hover:bg-white/10'
                  : 'text-sky-600 hover:text-sky-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.span
                    key="light"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex"
                  >
                    <FaSun className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="dark"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex"
                  >
                    <FaMoon className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Auth: logged in */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to="/manage-blogs"
                    aria-label="Manage blogs"
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <FaPen className="w-4 h-4 shrink-0" />
                    <span className="hidden xl:inline">Manage</span>
                  </Link>
                </motion.div>
                <motion.div
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                    darkMode
                      ? 'text-gray-300 border-gray-700/50 bg-gray-800/50'
                      : 'text-gray-600 border-gray-200 bg-gray-50'
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <FaUserCircle className={`w-5 h-5 shrink-0 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  <span className="text-sm font-medium max-w-[100px] truncate" title={user?.username}>
                    {user?.username}
                  </span>
                </motion.div>
                <motion.button
                  onClick={logout}
                  aria-label="Log out"
                  className={`p-2.5 rounded-xl transition-colors ${
                    darkMode
                      ? 'text-red-400/80 hover:text-red-300 hover:bg-red-500/10'
                      : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignOutAlt className="w-5 h-5" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                aria-label="Log in"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  darkMode
                    ? 'text-white border border-white/30 hover:bg-white/10'
                    : 'text-gray-900 border border-gray-300 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FaUserCircle className="w-5 h-5 shrink-0" />
                <span>Log in</span>
              </motion.button>
            )}
          </div>
          {/* Mobile: theme + login/user + menu */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2.5 rounded-xl ${
                darkMode ? 'text-amber-300 hover:bg-white/10' : 'text-sky-600 hover:bg-gray-100'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.span key="sun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex">
                    <FaSun className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex">
                    <FaMoon className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            {!isAuthenticated && (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                aria-label="Log in"
                className={`p-2.5 rounded-xl ${darkMode ? 'text-white/90 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserCircle className="w-5 h-5" />
              </motion.button>
            )}
            <motion.button
              onClick={toggleMenu}
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className={`p-2.5 rounded-xl ${
                darkMode ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
              } focus:outline-none`}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} className="inline-flex">
                    <FaTimes className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} className="inline-flex">
                    <FaBars className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Futuristic Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Elegant Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Minimalist Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
              className="md:hidden overflow-hidden relative z-50 mx-4 mt-3 rounded-lg shadow-2xl"
              id="mobile-menu"
            >
              <div className={`${darkMode ? 'bg-gray-900/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'} border ${darkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                {/* Navigation Links */}
                <div className="px-6 py-8 space-y-1">
                  {['Home', 'Blogs', 'About', 'Contact'].map((item, index) => {
                    const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                    const active = isActive(path);
                    
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.06,
                          ease: 'easeOut'
                        }}
                      >
                        <Link
                          to={path}
                          onClick={handleLinkClick}
                          className={`block px-4 py-3 text-sm font-light tracking-wider transition-all duration-500 relative ${
                            active
                              ? darkMode 
                                ? 'text-white' 
                                : 'text-gray-900'
                              : darkMode 
                                ? 'text-gray-400 hover:text-gray-200' 
                                : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <motion.span
                            whileHover={{ letterSpacing: '0.15em', x: 5 }}
                            transition={{ duration: 0.3 }}
                            className="block"
                          >
                            {item.toUpperCase()}
                          </motion.span>
                          
                          {/* Active indicator */}
                          {active && (
                            <motion.div
                              className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 ${
                                darkMode 
                                  ? 'bg-gradient-to-b from-blue-400 to-purple-400' 
                                  : 'bg-gradient-to-b from-blue-600 to-sky-500'
                              }`}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* User Section (mobile menu) */}
                <div className={`px-6 py-6 border-t ${darkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                  {isAuthenticated ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="space-y-2"
                    >
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                        <FaUserCircle className={`w-8 h-8 shrink-0 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                        <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.username}
                        </p>
                      </div>
                      <Link
                        to="/manage-blogs"
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          darkMode ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FaPen className="w-4 h-4 shrink-0" />
                        Manage blogs
                      </Link>
                      <button
                        onClick={() => { logout(); closeMenu(); }}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          darkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <FaSignOutAlt className="w-4 h-4 shrink-0" />
                        Log out
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={() => { setShowAuthModal(true); closeMenu(); }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium ${
                        darkMode ? 'text-white border border-white/30 hover:bg-white/10' : 'text-gray-900 border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <FaUserCircle className="w-5 h-5" />
                      Log in
                    </motion.button>
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

export default React.memo(Navbar);