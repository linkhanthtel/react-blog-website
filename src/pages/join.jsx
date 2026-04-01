import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/themeContext';
import ImageWithFallback from '../components/ImageWithFallback';
import image1 from '../images/image1.jpg';

const Join = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    article: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', category: '', article: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const shell = darkMode ? 'bg-gray-950 text-white' : 'bg-sky-50 text-gray-900';
  const card = darkMode
    ? 'bg-gray-900/80 border border-white/10 backdrop-blur-sm'
    : 'bg-white border border-sky-200/80 shadow-xl shadow-sky-500/10';
  const input = (field) =>
    `w-full rounded-xl border px-4 py-3.5 outline-none transition focus:ring-2 ${
      darkMode
        ? `bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-sky-400 focus:ring-sky-400/20 ${
            focusedField === field ? 'ring-2 ring-sky-400/30' : ''
          }`
        : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500/20 ${
            focusedField === field ? 'ring-2 ring-sky-500/15' : ''
          }`
    }`;

  return (
    <div className={`min-h-screen ${shell}`}>
      {/* Hero band */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-[min(52vh,420px)]">
          <ImageWithFallback
            src={image1}
            alt=""
            className="h-full w-full object-cover"
            fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/1200/500"
            priority
          />
          <div
            className={`absolute inset-0 ${
              darkMode ? 'bg-gradient-to-t from-gray-950 via-gray-950/75 to-sky-950/40' : 'bg-gradient-to-t from-sky-50 via-sky-900/35 to-sky-900/50'
            }`}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-12 pt-28 text-center sm:px-6 sm:pt-32 sm:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.35em] ${darkMode ? 'text-sky-400' : 'text-sky-100'}`}
          >
            WanderLuxe
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Join our community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            Share stories and ideas with travelers worldwide. Tell us what you would like to contribute.
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`mb-8 rounded-2xl p-6 sm:p-8 ${card}`}
        >
          <h2 className={`text-xl font-semibold tracking-tight sm:text-2xl ${darkMode ? 'text-white' : 'text-sky-950'}`}>
            Why contribute?
          </h2>
          <p className={`mt-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our community brings together writers and explorers. Whether you write about destinations, culture, or travel
            tips, your voice helps others dream and plan. This page is a simple way to send us a draft idea—we review
            submissions and may follow up by email.
          </p>
          <p className={`mt-4 text-sm ${darkMode ? 'text-sky-300/90' : 'text-sky-700'}`}>
            Already have an account?{' '}
            <span className="font-medium text-sky-500 dark:text-sky-400">
              Use <Link to="/manage-blogs" className="underline underline-offset-2 hover:opacity-90">Manage blogs</Link> to
              publish when you are signed in.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className={`rounded-2xl p-6 sm:p-8 ${card}`}
        >
          <h2 className={`mb-2 text-center text-xl font-semibold sm:text-2xl ${darkMode ? 'text-white' : 'text-sky-950'}`}>
            Share your idea
          </h2>
          <p className={`mb-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Introduce yourself and paste a short article or outline.
          </p>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
                darkMode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-900'
              }`}
            >
              Thanks—we received your message. This demo does not send email yet; check back soon or contact us via{' '}
              <Link to="/contact" className="font-semibold underline underline-offset-2">
                Contact
              </Link>
              .
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`mb-1.5 block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                className={input('name')}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className={`mb-1.5 block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Asia, city guides, food"
                className={input('category')}
                required
              />
            </div>
            <div>
              <label htmlFor="article" className={`mb-1.5 block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Your article
              </label>
              <textarea
                id="article"
                name="article"
                value={formData.article}
                onChange={handleChange}
                onFocus={() => setFocusedField('article')}
                onBlur={() => setFocusedField(null)}
                rows={8}
                placeholder="Write your article or pitch here…"
                className={`${input('article')} resize-y min-h-[180px]`}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full rounded-xl py-3.5 text-sm font-semibold tracking-wide transition ${
                darkMode
                  ? 'bg-sky-500 text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-950'
                  : 'bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-sky-50'
              }`}
            >
              Send submission
            </button>
          </form>

          <p className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Browsing stories?{' '}
            <Link to="/blogs" className={`font-semibold ${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline`}>
              View blogs
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Join;
