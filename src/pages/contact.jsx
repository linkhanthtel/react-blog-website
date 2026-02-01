import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiUser, FiPhone, FiMessageSquare, FiSend, FiMail } from 'react-icons/fi';
import { FaRocket, FaChevronDown, FaPhone as FaPhoneSolid, FaEnvelope as FaEnvelopeSolid, FaMapMarkerAlt as FaMapMarkerAltSolid, FaGlobe as FaGlobeSolid, FaClock as FaClockSolid } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import ImageWithFallback from '../components/ImageWithFallback';
import image4 from '../images/image4.jpg';

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

// Floating Contact Card
const ContactCard = ({ icon: Icon, title, content, color, index, darkMode }) => {
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
      style={{ transformStyle: 'preserve-3d' }}
      className={`p-8 rounded-3xl shadow-2xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } h-full group cursor-pointer`}
    >
      {/* 3D Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
      />
      
      <motion.div
        className={`relative w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="text-white text-2xl" />
      </motion.div>

      <h3 className={`text-xl font-bold mb-3 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className={`text-lg ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {content}
      </p>
    </motion.div>
  );
};

const Contact = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 1000], [0, -150]);

  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FaPhoneSolid,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaEnvelopeSolid,
      title: 'Email',
      content: 'hello@wanderluxe.com',
      color: 'from-sky-500 to-blue-500'
    },
    {
      icon: FaMapMarkerAltSolid,
      title: 'Address',
      content: 'San Francisco, CA',
      color: 'from-cyan-500 to-sky-500'
    },
    {
      icon: FaClockSolid,
      title: 'Hours',
      content: 'Mon-Fri: 9AM-6PM',
      color: 'from-blue-500 to-sky-500'
    },
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
                <span>Get in Touch</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  Us
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
        {/* Contact Info Cards */}
        <ScrollReveal3D delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {contactInfo.map((info, index) => (
              <ContactCard
                key={index}
                icon={info.icon}
                title={info.title}
                content={info.content}
                color={info.color}
                index={index}
                darkMode={darkMode}
              />
            ))}
          </div>
        </ScrollReveal3D>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Form */}
          <ScrollReveal3D delay={0.3}>
            <motion.div
              className={`p-8 md:p-12 rounded-3xl shadow-2xl border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } relative overflow-hidden`}
              initial={{ opacity: 0, x: -50, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 50%, transparent 50%, transparent 75%, rgba(59, 130, 246, 0.1) 75%)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="relative z-10">
                <motion.div
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FiSend className="text-white text-xl" />
                  </motion.div>
                  <h2 className={`text-3xl md:text-4xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Send Message
                  </h2>
                </motion.div>

                {submitted ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <FiSend className="text-white text-3xl" />
                    </motion.div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Message Sent!
                    </h3>
                    <p className={`text-lg ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {[
                      { id: 'name', label: 'Name', type: 'text', icon: FiUser },
                      { id: 'email', label: 'Email', type: 'email', icon: FiMail },
                      { id: 'phone', label: 'Phone Number', type: 'tel', icon: FiPhone },
                    ].map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <label
                          htmlFor={field.id}
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {field.label}
                        </label>
                        <motion.div
                          className="relative"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formData[field.id]}
                            onChange={handleChange}
                            placeholder={`Your ${field.label.toLowerCase()}`}
                            className={`w-full p-4 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 ${
                              darkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
                                : 'bg-gray-50 text-gray-700 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
                            } focus:outline-none`}
                            required
                          />
                          <field.icon
                            className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          />
                        </motion.div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Message
                      </label>
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          placeholder="Your message"
                          className={`w-full p-4 pl-12 pr-4 rounded-xl border-2 transition-all duration-300 resize-none ${
                            darkMode
                              ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
                              : 'bg-gray-50 text-gray-700 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
                          } focus:outline-none`}
                          required
                        />
                        <FiMessageSquare
                          className={`absolute left-4 top-4 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        darkMode
                          ? 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </ScrollReveal3D>

          {/* Image Section */}
          <ScrollReveal3D delay={0.4}>
            <motion.div
              className="relative h-full min-h-[600px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: 50, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              <ImageWithFallback
                src={image4}
                alt="Contact Us"
                className="w-full h-full object-cover"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold mb-4">Let's Connect</h3>
                  <p className="text-lg mb-6 opacity-90">
                    We're here to help you plan your next adventure. Reach out and let's make your travel dreams come true.
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: FaPhoneSolid, text: '+1 (555) 123-4567' },
                      { icon: FaEnvelopeSolid, text: 'hello@wanderluxe.com' },
                      { icon: FaMapMarkerAltSolid, text: 'San Francisco, CA' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <item.icon className="text-xl" />
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal3D>
        </div>

        {/* Additional Info Section */}
        <ScrollReveal3D delay={0.5}>
          <div className={`p-8 md:p-12 rounded-3xl shadow-2xl border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <motion.h2
              className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              Why Choose Us?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '24/7 Support',
                  description: 'Our team is always available to assist you with any questions or concerns.',
                  icon: FaPhoneSolid,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Expert Advice',
                  description: 'Get personalized recommendations from our experienced travel consultants.',
                  icon: FaGlobeSolid,
                  color: 'from-sky-500 to-blue-500'
                },
                {
                  title: 'Best Deals',
                  description: 'Access exclusive offers and discounts on luxury travel experiences.',
                  icon: FaRocket,
                  color: 'from-cyan-500 to-sky-500'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -10, rotateY: 5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="text-white text-2xl" />
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal3D>
      </div>
    </div>
  );
};

export default Contact;
