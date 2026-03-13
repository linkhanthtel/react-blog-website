import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '../context/themeContext';

const MouseGlow = ({ darkMode }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, ${
        darkMode ? 'rgba(56,189,248,0.09)' : 'rgba(14,165,233,0.12)'
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
      <pattern id="about-grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path
          d="M 80 0 L 0 0 0 80"
          fill="none"
          stroke={darkMode ? 'rgba(255,255,255,0.035)' : 'rgba(15,23,42,0.04)'}
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#about-grid)" />
  </svg>
);

const FloatingOrb = ({ darkMode, size, x, y, delay, duration }) => (
  <motion.div
    className={`absolute rounded-full ${
      darkMode ? 'bg-sky-400/8' : 'bg-sky-500/7'
    } blur-3xl`}
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -28, 0],
      x: [0, 18, 0],
      scale: [1, 1.18, 1],
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
          initial={{ opacity: 0, y: 40, rotateX: -50 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const TimelineStep = ({ index, title, body, active, darkMode }) => (
  <motion.div
    className="relative pl-8 pb-10 last:pb-0"
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
  >
    <div className="absolute left-0 top-1.5 flex flex-col items-center">
      <motion.div
        className={`w-3 h-3 rounded-full border-2 ${
          active
            ? darkMode
              ? 'bg-sky-400 border-sky-300'
              : 'bg-sky-500 border-sky-400'
            : darkMode
              ? 'bg-gray-900 border-gray-600'
              : 'bg-white border-gray-300'
        }`}
        animate={
          active
            ? {
                scale: [1, 1.35, 1],
              }
            : {}
        }
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`flex-1 w-px mt-2 origin-top ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
        animate={{ scaleY: 1 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
      />
    </div>
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
        darkMode ? 'bg-white/[0.04] text-gray-300' : 'bg-sky-50 text-sky-700'
      }`}
    >
      {String(index + 1).padStart(2, '0')}
    </div>
    <h3
      className={`text-lg sm:text-xl font-semibold mb-1.5 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      {title}
    </h3>
    <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      {body}
    </p>
  </motion.div>
);

const PrincipleCard = ({ title, body, tag, darkMode, index }) => (
  <motion.div
    className={`relative p-6 sm:p-7 rounded-3xl border overflow-hidden ${
      darkMode
        ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.16]'
        : 'bg-white border-gray-200 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5'
    }`}
    initial={{ opacity: 0, y: 36, rotateX: -18 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{
      y: -6,
      rotateX: -2,
      rotateY: 3,
      transition: { duration: 0.3 },
    }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <motion.div
      className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full ${
        darkMode ? 'bg-sky-500/15' : 'bg-sky-400/10'
      }`}
      aria-hidden="true"
    />
    <div className="relative z-10">
      <div
        className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase mb-4 ${
          darkMode ? 'bg-white/[0.04] text-gray-300' : 'bg-sky-50 text-sky-700'
        }`}
      >
        {tag}
      </div>
      <h3
        className={`text-lg sm:text-xl font-semibold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h3>
      <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {body}
      </p>
    </div>
  </motion.div>
);

const About = () => {
  const { darkMode } = useTheme();
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const y = useMotionValue(0);
  const heroY = useTransform(y, [0, 800], [0, -120]);

  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  const timeline = [
    {
      title: 'An idea on a boarding pass',
      body: 'WanderLuxe began as notes scribbled in transit lounges — a promise to collect luxury travel wisdom in one place.',
    },
    {
      title: 'Curating stories, not listings',
      body: 'Instead of piling on destinations, we obsessed over the feeling each journey creates, building a library of experiences.',
    },
    {
      title: 'Designing for the curious',
      body: 'Every page, animation, and detail is crafted to reward curiosity and make research feel like part of the trip.',
    },
    {
      title: 'Growing with our travelers',
      body: 'The platform keeps evolving with every story shared, question asked, and itinerary refined with our community.',
    },
  ];

  const principles = [
    {
      title: 'Clarity over noise',
      body: 'We strip away clutter so you can focus on what matters: where to go, when to go, and how it will feel when you get there.',
      tag: 'Principle',
    },
    {
      title: 'Depth over trends',
      body: 'We look beyond viral destinations, surfacing places and perspectives that stay relevant long after the algorithm moves on.',
      tag: 'Principle',
    },
    {
      title: 'Emotion in the details',
      body: 'From typography to micro-animations, every detail is tuned to make planning as satisfying as the journey itself.',
      tag: 'Principle',
    },
    {
      title: 'Respect for your time',
      body: 'Fast, focused, and intentional — we design so you can move from idea to decision with confidence, not decision fatigue.',
      tag: 'Principle',
    },
  ];

  const metrics = [
    { label: 'Countries featured', value: '42' },
    { label: 'Itineraries refined with readers', value: '350+' },
    { label: 'Average read time per visit', value: '6.4 min' },
    { label: 'Articles in constant iteration', value: '100%' },
  ];

  const handleTimelineHover = useCallback((index) => {
    setActiveTimelineIndex(index);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}
    >
      <MouseGlow darkMode={darkMode} />
      <BackgroundGrid darkMode={darkMode} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 260, x: '8%', y: '12%', delay: 0, duration: 26 },
          { size: 180, x: '78%', y: '10%', delay: 1.5, duration: 20 },
          { size: 160, x: '82%', y: '58%', delay: 3, duration: 22 },
          { size: 220, x: '3%', y: '68%', delay: 2, duration: 24 },
          { size: 120, x: '46%', y: '78%', delay: 4, duration: 18 },
        ].map((orb, i) => (
          <FloatingOrb key={i} darkMode={darkMode} {...orb} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 pb-14 sm:pb-20">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl">
              <motion.div
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 ${
                  darkMode ? 'bg-white/[0.04] text-gray-300' : 'bg-sky-50 text-sky-700'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Behind the scenes of WanderLuxe
              </motion.div>

              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-8 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                <StaggerWords text="We design journeys" />
                <br />
                <span className="relative inline-block">
                  <StaggerWords text="before they exist." />
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                WanderLuxe is a digital studio for luxury travel research. We blend editorial
                storytelling, interface design, and obsessive curation to help you choose your next
                journey with confidence.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Story timeline + snapshot */}
        <section className="pb-18 sm:pb-24">
          <div className="grid md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] gap-10 lg:gap-14 items-start">
            <div
              className={`rounded-3xl border p-6 sm:p-8 ${
                darkMode
                  ? 'bg-white/[0.02] border-white/[0.06]'
                  : 'bg-white border-gray-200 shadow-lg shadow-gray-200/60'
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                How this all started
              </h2>
              <p className={`text-sm sm:text-base mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                A quiet collection of notes that became a living map for people who love slow,
                intentional, beautifully-planned travel.
              </p>

              <div className="mt-4">
                {timeline.map((item, index) => (
                  <div
                    key={item.title}
                    onMouseEnter={() => handleTimelineHover(index)}
                    onFocus={() => handleTimelineHover(index)}
                    className="outline-none"
                    tabIndex={0}
                  >
                    <TimelineStep
                      index={index}
                      title={item.title}
                      body={item.body}
                      active={index === activeTimelineIndex}
                      darkMode={darkMode}
                    />
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative rounded-3xl border overflow-hidden min-h-[260px] sm:min-h-[320px]"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`absolute inset-0 ${
                  darkMode ? 'bg-gradient-to-br from-sky-900 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-sky-100 via-white to-cyan-100'
                }`}
              />
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 24, repeat: Infinity, repeatType: 'reverse' }}
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 0 0, rgba(56,189,248,0.8) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(14,165,233,0.9) 0, transparent 55%)',
                  backgroundSize: '240px 240px',
                }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7">
                <div>
                  <p
                    className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${
                      darkMode ? 'text-sky-200' : 'text-sky-700'
                    }`}
                  >
                    What we are in one sentence
                  </p>
                  <p
                    className={`text-lg sm:text-xl leading-relaxed ${
                      darkMode ? 'text-sky-50' : 'text-slate-900'
                    }`}
                  >
                    A calm, opinionated space on the internet for people who treat trip planning as
                    part of the experience, not just a chore.
                  </p>
                </div>

                <div className="mt-6">
                  <p className={`text-xs mb-1 ${darkMode ? 'text-sky-200/80' : 'text-sky-700/80'}`}>
                    How we measure success
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    If you close the tab with fewer options but more certainty, we have done our job.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics band */}
        <section className="pb-18 sm:pb-22">
          <motion.div
            className={`rounded-3xl border px-5 sm:px-7 py-5 sm:py-6 ${
              darkMode
                ? 'bg-white/[0.02] border-white/[0.06]'
                : 'bg-white border-gray-200 shadow-md shadow-gray-200/60'
            }`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {metrics.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <p
                    className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-base sm:text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Principles grid */}
        <section className="pb-24 sm:pb-32">
          <div className="max-w-3xl mb-10">
            <motion.h2
              className={`text-2xl sm:text-3xl font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              How we make every page feel intentional
            </motion.h2>
            <motion.p
              className={`text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-gray-500' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The interface you see is the surface of a lot of small decisions about pacing,
              typography, motion, and focus. These are the principles that guide those decisions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((p, index) => (
              <PrincipleCard
                key={p.title}
                title={p.title}
                body={p.body}
                tag={p.tag}
                darkMode={darkMode}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="mt-10 border-t pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Everything you see here is designed, written, and iterated with the same care we bring
              to every itinerary and story.
            </p>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              This page will change over time &mdash; just like the journeys it helps create.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
