import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMessageSquare, FiSend, FiMail } from 'react-icons/fi';
import { useTheme } from '../context/themeContext';
import image4 from '../images/image4.jpg';

const Contact = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl pt-28 mx-auto px-4 py-12">
        <motion.div 
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}
          variants={itemVariants}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <motion.h1 
                className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-6`}
                variants={itemVariants}
              >
                About Us
              </motion.h1>
              <motion.p 
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-6`}
                variants={itemVariants}
              >
                Welcome to WanderLuxe Ventures, where luxury meets adventure. We are passionate about curating extraordinary travel experiences that blend opulence with authenticity. Our team of seasoned travel experts is dedicated to crafting bespoke journeys that cater to the discerning tastes of modern explorers.
              </motion.p>
              <motion.p 
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
                variants={itemVariants}
              >
                From secluded island retreats to vibrant cultural expeditions, we pride ourselves on uncovering hidden gems and delivering unparalleled service. At WanderLuxe Ventures, we believe that travel should not only be a feast for the senses but also a transformative experience that enriches the soul. Join us as we redefine luxury travel, one extraordinary adventure at a time.
              </motion.p>
            </div>
            <motion.div 
              className="md:w-1/2"
              variants={itemVariants}
            >
              <img 
                src={image4}
                alt="Luxury Travel" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-8`}>
            <motion.h2 
              className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-6 text-center`}
              variants={itemVariants}
            >
              Contact Us
            </motion.h2>
            <motion.form 
              onSubmit={handleSubmit} 
              className="max-w-md mx-auto"
              variants={containerVariants}
            >
              {[
                { id: 'name', label: 'Name', type: 'text', icon: FiUser },
                { id: 'email', label: 'Email', type: 'email', icon: FiMail },
                { id: 'phone', label: 'Phone Number', type: 'tel', icon: FiPhone },
              ].map((field) => (
                <motion.div key={field.id} className="mb-4" variants={itemVariants}>
                  <label htmlFor={field.id} className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={`Your ${field.label.toLowerCase()}`}
                      className={`w-full p-3 pl-10 pr-4 ${
                        darkMode 
                          ? 'bg-gray-600 text-white border-gray-500 focus:border-blue-400' 
                          : 'bg-white text-gray-700 border-gray-300 focus:border-blue-400'
                      } border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                      required
                    />
                    <field.icon className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </motion.div>
              ))}
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Message</label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your message"
                    className={`w-full p-3 pl-10 pr-4 ${
                      darkMode 
                        ? 'bg-gray-600 text-white border-gray-500 focus:border-blue-400' 
                        : 'bg-white text-gray-700 border-gray-300 focus:border-blue-400'
                    } border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                    required
                  ></textarea>
                  <FiMessageSquare className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </motion.div>
              <motion.button
                type="submit"
                className={`w-full flex items-center justify-center px-4 py-3 ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend className="mr-2" />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;