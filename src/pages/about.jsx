import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaGlobe, FaPen, FaCamera, FaRocket, FaHeart, FaAward, FaUsers, FaStar, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';

// 3D Scroll Reveal Wrapper
const ScrollReveal3D = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 100 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
};

// Floating 3D Card Component
const Floating3DCard = ({ icon: Icon, title, description, color, index, darkMode }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={{ 
        y: -15, 
        rotateY: 5,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
      className="h-full"
    >
      <div className={`relative h-full p-8 rounded-3xl shadow-2xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } overflow-hidden group cursor-pointer`}>
        {/* 3D Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
          animate={{ opacity: hovered ? 0.2 : 0 }}
        />
        
        {/* Icon with 3D rotation */}
        <motion.div
          className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="text-white text-2xl" />
        </motion.div>

        <h3 className={`text-2xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`text-lg leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>

        {/* Decorative element */}
        <motion.div
          className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-tl-full`}
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const { darkMode } = useTheme();
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 1000], [0, -150]);

  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  const features = [
    { 
      icon: FaGlobe, 
      title: "Explore", 
      description: "Discover hidden gems and iconic destinations around the world. Our curated guides help you find the most extraordinary places.",
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: FaPen, 
      title: "Share", 
      description: "Read inspiring stories and expert tips from seasoned travelers. Join our community and share your own adventures.",
      color: 'from-sky-500 to-blue-500'
    },
    { 
      icon: FaCamera, 
      title: "Capture", 
      description: "Immerse yourself in stunning travel photography. Experience destinations through the lens of passionate photographers.",
      color: 'from-cyan-500 to-sky-500'
    }
  ];

  const stats = [
    { icon: FaUsers, label: 'Travelers', value: '50K+', color: 'from-blue-500 to-cyan-500' },
    { icon: FaGlobe, label: 'Destinations', value: '200+', color: 'from-sky-500 to-blue-500' },
    { icon: FaStar, label: 'Reviews', value: '10K+', color: 'from-cyan-500 to-sky-500' },
    { icon: FaAward, label: 'Awards', value: '15+', color: 'from-blue-500 to-sky-500' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-sky-50 via-white to-sky-50'} scroll-smooth`}>
      {/* Hero Section with Parallax */}
      <motion.section
        className={`relative overflow-hidden pt-32 pb-20 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900 via-gray-900 to-gray-900' 
            : 'bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-400'
        }`}
        style={{ y: yTransform }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-32 h-32 rounded-full ${
                darkMode ? 'bg-blue-500/10' : 'bg-white/10'
              } blur-3xl`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal3D>
            <motion.div className="text-center max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6"
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <FaRocket className="text-yellow-300" />
                <span>About WanderLuxe</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  WanderLuxe
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your gateway to extraordinary travel experiences and luxurious adventures around the globe.
              </motion.p>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col items-center mt-12"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaChevronDown className="text-white/60 text-xl" />
                </motion.div>
                <span className="text-white/60 text-xs mt-3 font-light tracking-wide">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </ScrollReveal3D>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Features Section */}
        <ScrollReveal3D delay={0.2}>
          <div className="text-center mb-16">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className={`text-lg md:text-xl max-w-2xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Discover our core values and what makes WanderLuxe unique
            </motion.p>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <Floating3DCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Stats Section */}
        <ScrollReveal3D delay={0.4}>
          <div className={`rounded-3xl p-12 mb-24 ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
              : 'bg-gradient-to-r from-blue-500 to-sky-500'
          } text-white relative overflow-hidden`}>
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Impact
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="text-white text-2xl" />
                    </motion.div>
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal3D>

        {/* Mission Section */}
        <ScrollReveal3D delay={0.3}>
          <div className={`p-8 md:p-12 rounded-3xl shadow-2xl mb-24 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border relative overflow-hidden`}>
            {/* 3D Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 50%, transparent 50%, transparent 75%, rgba(59, 130, 246, 0.1) 75%)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10">
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center mr-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaHeart className="text-white text-xl" />
                </motion.div>
                <h2 className={`text-3xl md:text-4xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Our Mission
                </h2>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className={`text-lg md:text-xl leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  At WanderLuxe Ventures, we believe that travel is more than just visiting new places – it's about creating unforgettable memories, broadening horizons, and indulging in the world's finest experiences.
                </p>
                <p className={`text-lg md:text-xl leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Our mission is to inspire and guide luxury travelers, providing insider knowledge, expert recommendations, and curated content that elevates your journey from ordinary to extraordinary.
                </p>
                <p className={`text-lg md:text-xl leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Whether you're dreaming of a serene beach retreat, an adventurous safari, or a culturally rich city escape, WanderLuxe Ventures is your trusted companion in crafting the perfect luxury getaway.
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollReveal3D>

        {/* Values Section */}
        <ScrollReveal3D delay={0.5}>
          <div className="text-center mb-16">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              Our Values
            </motion.h2>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            {
              title: 'Excellence',
              description: 'We strive for perfection in every detail, ensuring that every travel experience exceeds expectations.',
              icon: FaStar,
              color: 'from-yellow-400 to-orange-500'
            },
            {
              title: 'Authenticity',
              description: 'We believe in genuine experiences that connect you with local cultures and traditions.',
              icon: FaGlobe,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Innovation',
              description: 'We continuously evolve our offerings to provide cutting-edge travel solutions and experiences.',
              icon: FaRocket,
              color: 'from-sky-500 to-blue-500'
            },
            {
              title: 'Community',
              description: 'We foster a vibrant community of travelers who share their passion for exploration and discovery.',
              icon: FaUsers,
              color: 'from-cyan-500 to-sky-500'
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`p-8 rounded-3xl shadow-xl border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <motion.div
                className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <value.icon className="text-white text-xl" />
              </motion.div>
              <h3 className={`text-2xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {value.title}
              </h3>
              <p className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
