import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import AuthModal from './authModal';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    setIsOpen(false);
    window.location.href = href;
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left"
        style={{
          scaleX: scrollProgress / 100,
          background: darkMode
            ? 'linear-gradient(90deg, rgb(34 211 238), rgb(59 130 246), rgb(147 51 234))'
            : 'linear-gradient(90deg, rgb(14 165 233), rgb(56 189 248), rgb(6 182 212))',
        }}
        initial={false}
      />

      <header
        className={`fixed inset-x-0 top-0.5 z-50 font-sans transition-[background-color,backdrop-filter,border-color] duration-300 ${
          isScrolled
            ? darkMode
              ? 'border-b border-cyan-500/25 bg-sky-950/90 backdrop-blur-md'
              : 'border-b border-sky-300/70 bg-white/85 backdrop-blur-md'
            : darkMode
              ? 'border-b border-transparent bg-transparent'
              : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:h-[3.25rem] sm:px-8">
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`group relative text-lg font-bold tracking-tight sm:text-xl ${
              darkMode ? 'text-white' : 'text-sky-950'
            }`}
          >
            <span className="hidden sm:inline">WanderLuxe</span>
            <span className="text-base sm:hidden">WL</span>
            <span
              className={`absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full ${
                darkMode ? 'bg-cyan-400' : 'bg-sky-500'
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {NAV.map(({ label, path }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={handleLinkClick}
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                    active
                      ? darkMode
                        ? 'text-white'
                        : 'text-sky-900'
                      : darkMode
                        ? 'text-sky-300 hover:text-cyan-200'
                        : 'text-sky-700 hover:text-sky-950'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-min"
                      className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full ${
                        darkMode ? 'bg-cyan-400' : 'bg-sky-500'
                      }`}
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Light mode' : 'Dark mode'}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                darkMode
                  ? 'border-amber-400/60 bg-amber-500/15 text-amber-300 hover:border-amber-300 hover:bg-amber-500/25'
                  : 'border-sky-400 bg-sky-50 text-sky-600 hover:border-sky-500 hover:bg-sky-100'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex"
                  >
                    <FaSun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex"
                  >
                    <FaMoon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="hidden items-center gap-4 md:flex">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/manage-blogs"
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      darkMode ? 'text-cyan-300 hover:text-cyan-100' : 'text-sky-700 hover:text-sky-900'
                    }`}
                  >
                    Manage
                  </Link>
                  <span
                    className={`max-w-[120px] truncate text-sm font-medium ${
                      darkMode ? 'text-sky-200' : 'text-sky-800'
                    }`}
                    title={user?.username}
                  >
                    {user?.username}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      darkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'
                    }`}
                  >
                    Out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                    darkMode
                      ? 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/40 hover:bg-cyan-500/30'
                      : 'bg-sky-500 text-white shadow-md shadow-sky-500/25 hover:bg-sky-600'
                  }`}
                >
                  Sign in
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    darkMode
                      ? 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/40'
                      : 'bg-sky-500 text-white'
                  }`}
                >
                  In
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen((o) => !o)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className={`text-xs font-bold uppercase tracking-[0.2em] ${
                  darkMode ? 'text-cyan-200' : 'text-sky-800'
                }`}
              >
                {isOpen ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-sky-950/30 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className={`fixed left-0 right-0 top-14 z-50 border-b md:hidden ${
                darkMode
                  ? 'border-cyan-500/25 bg-sky-950/95 backdrop-blur-lg'
                  : 'border-sky-200 bg-white/95 backdrop-blur-lg'
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-0 px-5 py-6">
                {NAV.map(({ label, path }, i) => {
                  const active = isActive(path);
                  return (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        to={path}
                        onClick={handleLinkClick}
                        className={`block py-3 text-base font-semibold tracking-wide ${
                          active
                            ? darkMode
                              ? 'text-white'
                              : 'text-sky-900'
                            : darkMode
                              ? 'text-sky-300'
                              : 'text-sky-700'
                        }`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div
                className={`border-t px-5 py-5 ${
                  darkMode ? 'border-cyan-500/20' : 'border-sky-200'
                }`}
              >
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <p className={`text-sm font-medium ${darkMode ? 'text-sky-200' : 'text-sky-800'}`}>
                      {user?.username}
                    </p>
                    <Link
                      to="/manage-blogs"
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm font-semibold ${
                        darkMode ? 'text-cyan-300' : 'text-sky-700'
                      }`}
                    >
                      Manage
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className={`text-sm font-semibold ${
                        darkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'
                      }`}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className={`w-full rounded-xl py-3 text-sm font-semibold ${
                      darkMode
                        ? 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/40'
                        : 'bg-sky-500 text-white'
                    }`}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}

export default React.memo(Navbar);
