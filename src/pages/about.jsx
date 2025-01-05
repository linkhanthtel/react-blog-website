import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaPen, FaCamera } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';

const About = () => {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section
      className={`py-32 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          variants={itemVariants}
        >
          About WanderLuxe Ventures
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          variants={itemVariants}
        >
          <p className="text-lg mb-4">
            Welcome to WanderLuxe Ventures, your gateway to extraordinary travel experiences and luxurious adventures around the globe.
          </p>
          <p className="text-lg">
            Founded in 2023, we're passionate about sharing our love for travel, culture, and the finer things in life.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          {[
            { icon: FaGlobe, title: "Explore", description: "Discover hidden gems and iconic destinations" },
            { icon: FaPen, title: "Share", description: "Read stories and tips from seasoned travelers" },
            { icon: FaCamera, title: "Capture", description: "Immerse yourself in stunning travel photography" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              variants={itemVariants}
            >
              <item.icon className="text-4xl mb-4 text-blue-500" />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            At WanderLuxe Ventures, we believe that travel is more than just visiting new places – it's about creating unforgettable memories, broadening horizons, and indulging in the world's finest experiences.
          </p>
          <p className="text-lg mb-4">
            Our mission is to inspire and guide luxury travelers, providing insider knowledge, expert recommendations, and curated content that elevates your journey from ordinary to extraordinary.
          </p>
          <p className="text-lg">
            Whether you're dreaming of a serene beach retreat, an adventurous safari, or a culturally rich city escape, WanderLuxe Ventures is your trusted companion in crafting the perfect luxury getaway.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;