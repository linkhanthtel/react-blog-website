import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiMessageSquare, FiSend, FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useTheme } from '../context/themeContext';

const MouseGlow = ({ darkMode }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, ${
        darkMode ? 'rgba(56,189,248,0.05)' : 'rgba(14,165,233,0.06)'
      }, transparent 50%)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [darkMode]);
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
};

const FloatingShape = ({ darkMode, size, x, y, delay, duration }) => (
  <motion.div
    className={`absolute rounded-full ${darkMode ? 'border border-white/[0.04]' : 'border border-gray-900/[0.04]'}`}
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.15, 1],
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
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const PulsingDot = ({ darkMode }) => (
  <div className="relative">
    <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
    <motion.div
      className={`absolute inset-0 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}
      animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </div>
);

const FORM_STEPS = [
  { id: 'details', title: 'Your details', subtitle: 'Tell us who you are' },
  { id: 'message', title: 'Your message', subtitle: 'What would you like to say?' },
  { id: 'review', title: 'Review & send', subtitle: 'Everything look good?' },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 220 : -220, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -220 : 220, opacity: 0, scale: 0.96 }),
};

const shapes = [
  { size: 220, x: '8%', y: '15%', delay: 0, duration: 22 },
  { size: 160, x: '82%', y: '8%', delay: 2, duration: 16 },
  { size: 120, x: '72%', y: '55%', delay: 4, duration: 18 },
  { size: 200, x: '3%', y: '68%', delay: 1, duration: 24 },
  { size: 100, x: '45%', y: '78%', delay: 3, duration: 14 },
];

const contactMethods = [
  { label: 'Email', value: 'hello@wanderluxe.com', icon: FiMail },
  { label: 'Phone', value: '+1 (555) 123-4567', icon: FiPhone },
  { label: 'Location', value: 'San Francisco, CA', icon: FiMapPin },
];

const Contact = () => {
  const { darkMode } = useTheme();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (step === 0 && nameRef.current) nameRef.current.focus();
    if (step === 1 && messageRef.current) messageRef.current.focus();
  }, [step]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canProceed = useCallback(() => {
    if (step === 0) return formData.name.trim() && formData.email.trim();
    if (step === 1) return formData.message.trim();
    return true;
  }, [step, formData]);

  const goNext = () => {
    if (canProceed() && step < FORM_STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && step < 2 && canProceed()) {
      e.preventDefault();
      goNext();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
      setStep(0);
    }, 4000);
  };

  const inputClass = (field) =>
    `w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none ${
      darkMode
        ? 'bg-gray-900/50 text-white border-gray-700 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 placeholder-gray-600'
        : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 placeholder-gray-400'
    }`;

  const iconClass = (field) =>
    `absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
      focusedField === field
        ? darkMode ? 'text-sky-400' : 'text-sky-500'
        : darkMode ? 'text-gray-600' : 'text-gray-400'
    }`;

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <MouseGlow darkMode={darkMode} />

      {/* Subtle background grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="contact-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-grid)" />
      </svg>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {shapes.map((s, i) => (
          <FloatingShape key={i} darkMode={darkMode} {...s} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---- Hero ---- */}
        <section className="pt-32 sm:pt-40 pb-16 sm:pb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-3xl">
            <motion.div
              className={`w-16 h-0.5 mb-8 ${darkMode ? 'bg-sky-400' : 'bg-sky-500'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{ transformOrigin: 'left' }}
            />

            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              <StaggerWords text="Let's start a" />
              <br />
              <span className="relative inline-block">
                <StaggerWords text="conversation." />
                <motion.div
                  className={`absolute -bottom-2 left-0 h-1 rounded-full ${
                    darkMode
                      ? 'bg-gradient-to-r from-sky-400 to-cyan-300'
                      : 'bg-gradient-to-r from-sky-500 to-cyan-400'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h1>

            <motion.p
              className={`text-lg sm:text-xl leading-relaxed max-w-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Have an idea, a question, or just want to say hello? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </section>

        {/* ---- Contact methods ---- */}
        <motion.section
          className="pb-16 sm:pb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {contactMethods.map((item, i) => (
              <motion.div
                key={item.label}
                className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-500 cursor-default overflow-hidden ${
                  darkMode
                    ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10'
                    : 'bg-white border-gray-200 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-500/5'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      darkMode ? 'bg-sky-400/10 text-sky-400' : 'bg-sky-50 text-sky-600'
                    }`}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <div className="min-w-0">
                    <p
                      className={`text-[11px] font-semibold tracking-wider uppercase mb-0.5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className={`text-sm font-medium truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
                {/* hover accent bar */}
                <motion.div
                  className={`absolute bottom-0 left-6 right-6 h-px ${darkMode ? 'bg-sky-400/50' : 'bg-sky-500/40'}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---- Multi-step form ---- */}
        <motion.section
          className="pb-28 sm:pb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`rounded-3xl border overflow-hidden ${
              darkMode
                ? 'bg-white/[0.02] border-white/[0.06]'
                : 'bg-white border-gray-200 shadow-xl shadow-gray-200/50'
            }`}
          >
            {/* Progress header */}
            <div className={`px-6 sm:px-8 pt-8 pb-6 border-b ${darkMode ? 'border-white/[0.06]' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between">
                {FORM_STEPS.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (i < step) {
                          setDirection(-1);
                          setStep(i);
                        }
                      }}
                      className={`flex items-center gap-2 sm:gap-3 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                          i < step
                            ? darkMode
                              ? 'bg-sky-400 text-gray-950'
                              : 'bg-sky-500 text-white'
                            : i === step
                              ? darkMode
                                ? 'bg-sky-400/15 text-sky-400 ring-2 ring-sky-400/40'
                                : 'bg-sky-50 text-sky-600 ring-2 ring-sky-500/30'
                              : darkMode
                                ? 'bg-gray-800 text-gray-600'
                                : 'bg-gray-100 text-gray-400'
                        }`}
                        layout
                      >
                        {i < step ? <FiCheck className="w-4 h-4" /> : i + 1}
                      </motion.div>
                      <span
                        className={`hidden sm:block text-sm font-medium transition-colors ${
                          i <= step
                            ? darkMode ? 'text-white' : 'text-gray-900'
                            : darkMode ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                    {i < FORM_STEPS.length - 1 && (
                      <div className={`flex-1 mx-3 sm:mx-5 h-px relative ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <motion.div
                          className={`absolute inset-y-0 left-0 ${darkMode ? 'bg-sky-400' : 'bg-sky-500'}`}
                          initial={false}
                          animate={{ width: i < step ? '100%' : '0%' }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form body */}
            <div className="px-6 sm:px-8 py-10 sm:py-14 min-h-[380px] sm:min-h-[420px] flex items-center">
              <div className="w-full max-w-lg mx-auto">
                <AnimatePresence mode="wait" custom={direction}>
                  {!submitted ? (
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-8">
                        <h2
                          className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                        >
                          {FORM_STEPS[step].title}
                        </h2>
                        <p className={`text-base ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {FORM_STEPS[step].subtitle}
                        </p>
                      </div>

                      {/* Step 0 — name + email */}
                      {step === 0 && (
                        <div className="space-y-5">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Name
                            </label>
                            <div className="relative">
                              <FiUser className={iconClass('name')} />
                              <input
                                ref={nameRef}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                onKeyDown={handleKeyDown}
                                placeholder="Your name"
                                className={inputClass('name')}
                              />
                            </div>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Email
                            </label>
                            <div className="relative">
                              <FiMail className={iconClass('email')} />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                onKeyDown={handleKeyDown}
                                placeholder="Your email"
                                className={inputClass('email')}
                              />
                            </div>
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            Press <kbd className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Enter</kbd> to continue
                          </p>
                        </div>
                      )}

                      {/* Step 1 — message */}
                      {step === 1 && (
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Message
                          </label>
                          <div className="relative">
                            <FiMessageSquare
                              className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-200 ${
                                focusedField === 'message'
                                  ? darkMode ? 'text-sky-400' : 'text-sky-500'
                                  : darkMode ? 'text-gray-600' : 'text-gray-400'
                              }`}
                            />
                            <textarea
                              ref={messageRef}
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('message')}
                              onBlur={() => setFocusedField(null)}
                              rows="6"
                              placeholder="What's on your mind?"
                              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none resize-none ${
                                darkMode
                                  ? 'bg-gray-900/50 text-white border-gray-700 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 placeholder-gray-600'
                                  : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 placeholder-gray-400'
                              }`}
                            />
                          </div>
                          <p className={`mt-2 text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            {formData.message.length > 0
                              ? `${formData.message.length} characters`
                              : 'Write your message, then continue'}
                          </p>
                        </div>
                      )}

                      {/* Step 2 — review */}
                      {step === 2 && (
                        <div className="space-y-3">
                          {[
                            { label: 'Name', value: formData.name, icon: FiUser },
                            { label: 'Email', value: formData.email, icon: FiMail },
                            { label: 'Message', value: formData.message, icon: FiMessageSquare },
                          ].map((item, i) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className={`flex gap-4 p-4 rounded-xl ${
                                darkMode
                                  ? 'bg-gray-900/50 border border-white/[0.05]'
                                  : 'bg-gray-50 border border-gray-100'
                              }`}
                            >
                              <item.icon
                                className={`w-4 h-4 shrink-0 mt-0.5 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}
                              />
                              <div className="min-w-0 flex-1">
                                <p
                                  className={`text-[11px] font-semibold tracking-wider uppercase mb-1 ${
                                    darkMode ? 'text-gray-500' : 'text-gray-400'
                                  }`}
                                >
                                  {item.label}
                                </p>
                                <p
                                  className={`text-sm leading-relaxed break-words ${
                                    darkMode ? 'text-gray-200' : 'text-gray-800'
                                  } ${item.label === 'Message' ? 'whitespace-pre-wrap' : ''}`}
                                >
                                  {item.value}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* ---- Success state ---- */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="text-center py-6"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-8">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className={`absolute inset-0 rounded-full border-2 ${
                              darkMode ? 'border-sky-400/30' : 'border-sky-500/30'
                            }`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.5, 2.5], opacity: [0.6, 0] }}
                            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
                          />
                        ))}
                        <motion.div
                          className={`absolute inset-0 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-sky-400' : 'bg-sky-500'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                        >
                          <FiCheck className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>
                      <motion.h3
                        className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Message sent
                      </motion.h3>
                      <motion.p
                        className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        We'll get back to you within 24 hours.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation footer */}
            {!submitted && (
              <div
                className={`px-6 sm:px-8 py-5 border-t flex items-center justify-between ${
                  darkMode ? 'border-white/[0.06]' : 'border-gray-100'
                }`}
              >
                <motion.button
                  type="button"
                  onClick={goPrev}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    step === 0
                      ? 'opacity-0 pointer-events-none'
                      : darkMode
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </motion.button>

                {step < 2 ? (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      canProceed()
                        ? darkMode
                          ? 'bg-sky-500 text-white hover:bg-sky-400'
                          : 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20'
                        : darkMode
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={canProceed() ? { x: 2 } : {}}
                    whileTap={canProceed() ? { scale: 0.97 } : {}}
                  >
                    Continue
                    <FiArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      darkMode
                        ? 'bg-sky-500 text-white hover:bg-sky-400'
                        : 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20'
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Response time badge */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-3">
              <PulsingDot darkMode={darkMode} />
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Average response time:{' '}
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>under 2 hours</span>
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
