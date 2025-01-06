import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaBars, FaTimes, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useTheme } from '../context/themeContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

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
    <nav className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled 
        ? (darkMode ? 'bg-gray-900 shadow-lg' : 'bg-white shadow-lg') 
        : (darkMode ? 'bg-transparent' : 'bg-transparent')
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-300'}`}>
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
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-blue-400 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-1 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}>
              <FaSearch className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleDarkMode} 
              className={`p-1 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            {[FaFacebook, AiFillInstagram, FaYoutube].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-blue-500 hover:text-blue-800'} transition duration-300`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-200'
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
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-blue-500 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {[FaFacebook, AiFillInstagram, FaYoutube].map((Icon, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-gray-600'} transition duration-300`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="flex space-x-4">
                <button className={`p-1 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-gray-600'}`}>
                  <FaSearch className="h-5 w-5" />
                </button>
                <button 
                  onClick={toggleDarkMode} 
                  className={`p-1 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;