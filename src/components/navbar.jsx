import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import AuthModal from './authModal';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    window.location.href = href;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? (darkMode ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-lg') 
        : (darkMode ? 'bg-transparent' : 'bg-transparent')
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                WanderLuxe Ventures
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
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md transition duration-300 ${
                darkMode 
                  ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Blogs', 'Destinations', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3">
            {isAuthenticated && (
              <div className="mb-4">
                <Link
                  to="/manage-blogs"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                    darkMode 
                      ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  Manage Blogs
                </Link>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <>
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
                  </>
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
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </nav>
  );
}

export default Navbar;