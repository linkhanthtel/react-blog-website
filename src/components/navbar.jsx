import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
          {/* Futuristic Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Elegant Theme Toggle */}
            <motion.button 
              onClick={toggleDarkMode} 
              className={`relative px-4 py-2 text-xs font-light tracking-wider transition-all duration-500 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ letterSpacing: '0.1em' }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.span
                    key="light"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    LIGHT
                  </motion.span>
                ) : (
                  <motion.span
                    key="dark"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    DARK
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-px ${
                  darkMode 
                    ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-sky-500 to-transparent'
                }`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            {/* Elegant Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    to="/manage-blogs"
                    className={`px-4 py-2 text-xs font-light tracking-wider transition-all duration-500 ${
                      darkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <motion.span 
                      whileHover={{ letterSpacing: '0.1em' }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="hidden xl:inline">MANAGE</span>
                      <span className="xl:hidden">MGT</span>
                    </motion.span>
                  </Link>
                </motion.div>
                
                <motion.div
                  className={`px-3 py-1.5 text-xs font-light tracking-wider border ${
                    darkMode 
                      ? 'text-gray-300 border-gray-700/50' 
                      : 'text-gray-600 border-gray-300/50'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <span className="hidden lg:inline">{user?.username?.toUpperCase()}</span>
                  <span className="lg:hidden">{user?.username?.charAt(0).toUpperCase()}</span>
                </motion.div>
                
                <motion.button
                  onClick={logout}
                  className={`px-4 py-2 text-xs font-light tracking-wider transition-all duration-500 ${
                    darkMode 
                      ? 'text-red-400/70 hover:text-red-300' 
                      : 'text-red-600/70 hover:text-red-700'
                  }`}
                  whileHover={{ letterSpacing: '0.1em' }}
                  transition={{ duration: 0.3 }}
                >
                  EXIT
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className={`px-6 py-2.5 text-xs font-light tracking-wider transition-all duration-500 ${
                  darkMode 
                    ? 'text-white border border-white/20 hover:border-white/40' 
                    : 'text-gray-900 border border-gray-300 hover:border-gray-400'
                }`}
                whileHover={{ letterSpacing: '0.15em', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                LOGIN
              </motion.button>
            )}
          </div>
          {/* Futuristic Mobile Actions */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Elegant Theme Toggle */}
            <motion.button 
              onClick={toggleDarkMode} 
              className={`px-3 py-1.5 text-xs font-light tracking-wider transition-all duration-500 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ letterSpacing: '0.1em' }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.span
                    key="light-mobile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    LGT
                  </motion.span>
                ) : (
                  <motion.span
                    key="dark-mobile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    DRK
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Minimalist Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              type="button"
              className={`px-4 py-2 text-xs font-light tracking-wider transition-all duration-500 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600' 
                  : 'text-gray-600 hover:text-gray-900 border border-gray-300/50 hover:border-gray-400'
              } focus:outline-none`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              whileHover={{ letterSpacing: '0.15em' }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    CLOSE
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    MENU
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

                {/* User Section */}
                <div className={`px-6 py-6 border-t ${darkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                  {isAuthenticated ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                      className="space-y-3"
                    >
                      {/* User Info */}
                      <motion.div 
                        className={`px-4 py-3 border ${darkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className={`text-xs font-light tracking-wider mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          USER
                        </p>
                        <p className={`text-sm font-light tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user?.username?.toUpperCase()}
                        </p>
                      </motion.div>
                      
                      {/* Manage Blogs */}
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Link
                          to="/manage-blogs"
                          onClick={closeMenu}
                          className={`block px-4 py-3 text-sm font-light tracking-wider transition-all duration-500 border ${
                            darkMode 
                              ? 'text-gray-300 hover:text-white border-gray-800/50 hover:border-gray-700' 
                              : 'text-gray-600 hover:text-gray-900 border-gray-200/50 hover:border-gray-300'
                          }`}
                        >
                          <motion.span
                            whileHover={{ letterSpacing: '0.15em', x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            MANAGE
                          </motion.span>
                        </Link>
                      </motion.div>
                      
                      {/* Logout */}
                      <motion.button
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                        className={`w-full px-4 py-3 text-sm font-light tracking-wider transition-all duration-500 border ${
                          darkMode 
                            ? 'text-red-400/70 hover:text-red-300 border-red-900/30 hover:border-red-800/50' 
                            : 'text-red-600/70 hover:text-red-700 border-red-200/50 hover:border-red-300'
                        }`}
                        whileHover={{ letterSpacing: '0.15em' }}
                        whileTap={{ scale: 0.99 }}
                      >
                        EXIT
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                    >
                      <motion.button
                        onClick={() => {
                          setShowAuthModal(true);
                          closeMenu();
                        }}
                        className={`w-full px-4 py-3 text-sm font-light tracking-wider transition-all duration-500 border ${
                          darkMode 
                            ? 'text-white border-white/20 hover:border-white/40' 
                            : 'text-gray-900 border-gray-300 hover:border-gray-400'
                        }`}
                        whileHover={{ letterSpacing: '0.2em', scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        LOGIN
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

export default React.memo(Navbar);