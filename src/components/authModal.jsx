import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { darkMode } = useTheme();
  const { login, register, error, clearError } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
      onClose();
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    clearError();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-md ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {isLogin ? 'Login' : 'Register'}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <FaTimes />
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md mb-4 ${
                  darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                }`}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter username"
                  />
                  <FaUser className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Enter email"
                    />
                    <FaEnvelope className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter password"
                  />
                  <FaLock className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={switchMode}
                className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
