import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/themeContext';
import { usePosts } from '../context/postsContext';
import ArticleCard from '../components/articlecard';
import ImageWithFallback from '../components/ImageWithFallback';
import { getImageAlt } from '../utils/imageUtils';

const MouseGlow = ({ darkMode }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      el.style.background = `radial-gradient(750px circle at ${e.clientX}px ${e.clientY}px, ${
        darkMode ? 'rgba(56,189,248,0.12)' : 'rgba(14,165,233,0.16)'
      }, transparent 55%)`;
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [darkMode]);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
};

const BackgroundGrid = ({ darkMode }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="blogs-grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path
          d="M 80 0 L 0 0 0 80"
          fill="none"
          stroke={darkMode ? 'rgba(255,255,255,0.025)' : 'rgba(15,23,42,0.04)'}
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#blogs-grid)" />
  </svg>
);

const FloatingOrb = ({ darkMode, size, x, y, delay, duration }) => (
  <motion.div
    className={`absolute rounded-full ${
      darkMode ? 'bg-sky-400/10' : 'bg-sky-500/10'
    } blur-3xl`}
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -26, 0],
      x: [0, 18, 0],
      scale: [1, 1.16, 1],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const StaggerWords = ({ text, className }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 36, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.25 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const BlogMetaChip = ({ label, active, onClick, darkMode }) => (
  <motion.button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
      active
        ? darkMode
          ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
          : 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
        : darkMode
          ? 'bg-white/[0.03] text-gray-300 border border-white/[0.1] hover:bg-white/[0.06]'
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-sky-50'
    }`}
    whileHover={{ y: -2, scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {label}
  </motion.button>
);

const slideVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const Blogs = () => {
  const { darkMode } = useTheme();
  const { posts, loading, error, fetchPosts } = usePosts();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [tone, setTone] = useState('all');
  const scrollY = useMotionValue(0);
  const heroY = useTransform(scrollY, [0, 800], [0, -120]);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  const handleRefresh = useCallback(() => {
    fetchPosts();
    setHasInteracted(true);
  }, [fetchPosts]);

  const tones = [
    { id: 'all', label: 'All moods' },
    { id: 'slow', label: 'Slow & reflective' },
    { id: 'city', label: 'City energy' },
    { id: 'coast', label: 'Coastal' },
    { id: 'wild', label: 'Wide open' },
  ];

  const filteredPosts = useMemo(() => {
    const base = posts || [];
    const q = search.trim().toLowerCase();

    let result = base.filter((post) => {
      const text = `${post.title} ${post.author} ${post.content || ''}`.toLowerCase();
      const matchesSearch = q === '' || text.includes(q);

      if (!matchesSearch) return false;
      if (tone === 'all') return true;

      const content = (post.content || '').toLowerCase();
      if (tone === 'slow') return content.includes('slow') || content.includes('quiet');
      if (tone === 'city') return content.includes('city') || content.includes('urban');
      if (tone === 'coast') return content.includes('beach') || content.includes('coast');
      if (tone === 'wild') return content.includes('mountain') || content.includes('desert');
      return true;
    });

    result = result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      if (sortBy === 'popular') {
        return (b.likes || 0) - (a.likes || 0);
      }
      if (sortBy === 'discussed') {
        return (b.comments || 0) - (a.comments || 0);
      }
      return 0;
    });

    return result;
  }, [posts, search, tone, sortBy]);

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);

  const metrics = [
    { label: 'Published stories', value: totalPosts },
    { label: 'Applause recorded', value: totalLikes },
    { label: 'Conversations started', value: totalComments },
    { label: 'Reading queue length', value: filteredPosts.length },
  ];

  const floatingOrbs = [
    { size: 260, x: '6%', y: '10%', delay: 0, duration: 26 },
    { size: 200, x: '76%', y: '8%', delay: 1.5, duration: 22 },
    { size: 180, x: '80%', y: '58%', delay: 3, duration: 24 },
    { size: 220, x: '2%', y: '68%', delay: 2, duration: 26 },
    { size: 140, x: '46%', y: '78%', delay: 4, duration: 20 },
  ];

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}
    >
      <MouseGlow darkMode={darkMode} />
      <BackgroundGrid darkMode={darkMode} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingOrbs.map((orb, index) => (
          <FloatingOrb key={index} darkMode={darkMode} {...orb} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 pb-14 sm:pb-18">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl">
              <motion.div
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 ${
                  darkMode ? 'bg-white/[0.04] text-gray-300' : 'bg-sky-50 text-sky-700'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The WanderLuxe journal
              </motion.div>

              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-7 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                <StaggerWords text="Browse stories by" />
                <br />
                <span className="relative inline-block">
                  <StaggerWords text="feeling, not by feed." />
                  <motion.div
                    className={`absolute -bottom-2 left-0 h-[3px] rounded-full ${
                      darkMode
                        ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400'
                        : 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </h1>

              <motion.p
                className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Use search and mood filters to narrow the noise. Wander until something feels like
                your next chapter, then dive in.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Controls + metrics */}
        <section className="pb-14 sm:pb-18">
          <motion.div
            className={`rounded-3xl border p-5 sm:p-6 lg:p-7 ${
              darkMode
                ? 'bg-white/[0.02] border-white/[0.06]'
                : 'bg-white border-gray-200 shadow-lg shadow-gray-200/60'
            }`}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-6">
              {/* Search + sort */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
                <div className="flex-1">
                  <label
                    className={`block text-xs font-semibold tracking-[0.2em] uppercase mb-2 ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}
                  >
                    Search the archive
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setHasInteracted(true);
                      }}
                      placeholder="Titles, places, details..."
                      className={`w-full rounded-2xl px-4 sm:px-5 py-3.5 text-sm sm:text-base outline-none transition-all duration-200 border-2 ${
                        darkMode
                          ? 'bg-gray-950/60 text-white border-gray-700 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 placeholder-gray-600'
                          : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 placeholder-gray-400'
                      }`}
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className={`absolute inset-y-0 right-3 px-2 text-xs sm:text-[13px] font-medium ${
                          darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 lg:w-[280px]">
                  <div className="flex-1">
                    <label
                      className={`block text-xs font-semibold tracking-[0.2em] uppercase mb-2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    >
                      Sort by
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setHasInteracted(true);
                      }}
                      className={`w-full rounded-2xl px-4 py-3 text-sm outline-none border-2 cursor-pointer ${
                        darkMode
                          ? 'bg-gray-950/60 text-gray-100 border-gray-700 focus:border-sky-400'
                          : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-sky-500'
                      }`}
                    >
                      <option value="latest">Latest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="popular">Most appreciated</option>
                      <option value="discussed">Most discussed</option>
                    </select>
                  </div>
                  <div className="sm:self-end">
                    <button
                      type="button"
                      onClick={handleRefresh}
                      disabled={loading}
                      className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                        darkMode
                          ? 'bg-sky-500 text-white hover:bg-sky-400 disabled:bg-gray-800 disabled:text-gray-500'
                          : 'bg-sky-500 text-white hover:bg-sky-600 disabled:bg-gray-200 disabled:text-gray-500'
                      }`}
                    >
                      {loading ? 'Refreshing…' : hasInteracted ? 'Refresh list' : 'Load latest'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tone chips */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2 border-t border-dashed border-gray-700/40 dark:border-gray-700/40">
                {tones.map((t) => (
                  <BlogMetaChip
                    key={t.id}
                    label={t.label}
                    active={tone === t.id}
                    onClick={() => {
                      setTone(t.id);
                      setHasInteracted(true);
                    }}
                    darkMode={darkMode}
                  />
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-3">
                {metrics.map((m, index) => (
                  <motion.div
                    key={m.label}
                    className="flex flex-col gap-1"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.15 + index * 0.07 }}
                  >
                    <p
                      className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    >
                      {m.label}
                    </p>
                    <p
                      className={`text-base sm:text-lg font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {m.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Main layout */}
        <section className="pb-24 sm:pb-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Left: results */}
            <div className="w-full lg:w-[60%] space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    darkMode
                      ? 'bg-red-950/60 border-red-800 text-red-100'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">We could not load the stories.</p>
                  <p className="text-xs sm:text-sm opacity-80 mb-3">{error}</p>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className={`inline-flex px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ${
                      darkMode ? 'bg-red-800 text-red-50' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    Try again
                  </button>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`rounded-2xl border p-8 sm:p-10 text-center ${
                    darkMode
                      ? 'bg-white/[0.02] border-white/[0.06]'
                      : 'bg-white border-gray-200 shadow-md'
                  }`}
                >
                  <motion.div
                    className="mx-auto mb-4 w-10 h-10 rounded-full border-2 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    style={{
                      borderColor: darkMode ? 'rgba(56,189,248,0.6)' : 'rgba(14,165,233,0.8)',
                    }}
                  />
                  <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Gathering the latest entries for you…
                  </p>
                </motion.div>
              )}

              {!loading && !error && filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-2xl border p-8 sm:p-10 text-center ${
                    darkMode
                      ? 'bg-white/[0.02] border-white/[0.06]'
                      : 'bg-white border-gray-200 shadow-md'
                  }`}
                >
                  <p
                    className={`text-lg font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Nothing matches this view yet.
                  </p>
                  <p className={`text-sm sm:text-base mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try adjusting your search or tone filters, or come back soon as new stories are
                    published.
                  </p>
                  {(search || tone !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setTone('all');
                      }}
                      className={`inline-flex px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold ${
                        darkMode
                          ? 'bg-sky-500 text-white hover:bg-sky-400'
                          : 'bg-sky-500 text-white hover:bg-sky-600'
                      }`}
                    >
                      Clear filters
                    </button>
                  )}
                </motion.div>
              )}

              {!loading && !error && filteredPosts.length > 0 && (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    {filteredPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        variants={slideVariants}
                        whileHover={{ y: -3 }}
                      >
                        <ArticleCard
                          id={post.id}
                          title={post.title}
                          image={post.image}
                          author={post.author}
                          date={new Date(post.created_at).toLocaleDateString()}
                          description={post.description}
                          content={post.content}
                          likes={post.likes}
                          comments={post.comments}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Right: reading queue */}
            <motion.div
              className="w-full lg:w-[40%] space-y-6 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className={`rounded-3xl border overflow-hidden ${
                  darkMode
                    ? 'bg-white/[0.02] border-white/[0.06]'
                    : 'bg-white border-gray-200 shadow-md'
                }`}
              >
                <div
                  className={`px-5 sm:px-6 py-4 border-b ${
                    darkMode ? 'border-white/[0.06]' : 'border-gray-100'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Reading queue
                  </p>
                  <p
                    className={`text-sm sm:text-base font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    A few places to start
                  </p>
                </div>
                <div className="px-5 sm:px-6 py-5 space-y-4">
                  {(filteredPosts.length ? filteredPosts : posts).slice(0, 4).map((post) => (
                    <Link
                      key={post.id}
                      to={`/blogs/singlepost/${post.id}`}
                      className="block group"
                    >
                      <div
                        className={`flex gap-3 sm:gap-4 rounded-2xl p-3 sm:p-3.5 transition-colors ${
                          darkMode
                            ? 'hover:bg-white/[0.04]'
                            : 'hover:bg-sky-50'
                        }`}
                      >
                        <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={post.image}
                            alt={getImageAlt(post.image, post.title)}
                            className="w-full h-full object-cover"
                            fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/96/96"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs mb-1 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p
                            className={`text-sm font-semibold line-clamp-2 group-hover:underline ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {post.title}
                          </p>
                          {post.description && (
                            <p
                              className={`mt-1 text-xs line-clamp-1 ${
                                darkMode ? 'text-gray-500' : 'text-gray-600'
                              }`}
                            >
                              {post.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-3xl border px-5 sm:px-6 py-5 ${
                  darkMode
                    ? 'bg-white/[0.02] border-white/[0.06]'
                    : 'bg-white border-gray-200 shadow-md'
                }`}
              >
                <p
                  className={`text-xs font-semibold tracking-[0.2em] uppercase mb-1 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  A small promise
                </p>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  We will never publish on a schedule just to fill this page. If a story is here, it
                  is because we think it earns your time.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;