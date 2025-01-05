import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaHotel, FaUmbrellaBeach, FaHiking, FaUtensils, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import image7 from '../images/image7.jpg';
import image8 from '../images/image8.jpg';
import image9 from '../images/image9.jpg';

const Destination = () => {
  const { darkMode } = useTheme();
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    image7, image8, image9
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredDestinations = [
    { name: 'Bali', image: 'https://source.unsplash.com/800x600/?bali' },
    { name: 'Paris', image: 'https://source.unsplash.com/800x600/?paris' },
    { name: 'New York', image: 'https://source.unsplash.com/800x600/?newyork' },
    { name: 'Tokyo', image: 'https://source.unsplash.com/800x600/?tokyo' },
  ];

  const categories = [
    { name: 'Beach', icon: FaUmbrellaBeach },
    { name: 'Mountains', icon: FaHiking },
    { name: 'Cities', icon: FaPlane },
    { name: 'Culinary', icon: FaUtensils },
  ];

  const popularTours = [
    { name: 'Romantic Paris Getaway', duration: '5 days', price: '$1299' },
    { name: 'Bali Beach Paradise', duration: '7 days', price: '$1599' },
    { name: 'New York City Explorer', duration: '4 days', price: '$999' },
    { name: 'Tokyo Tech & Tradition', duration: '6 days', price: '$1799' },
  ];

  const testimonials = [
    { name: 'John Doe', text: 'An unforgettable experience! The attention to detail was impeccable.' },
    { name: 'Jane Smith', text: 'WanderLuxe made our dream vacation a reality. Highly recommended!' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentBg}
            src={backgrounds[currentBg]}
            alt="Destination"
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the world's most luxurious destinations
          </motion.p>
          <motion.button
            className={`px-6 py-3 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full text-lg transition duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Destinations</h2>
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
                <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="text-xl font-semibold">{dest.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

        {/* Destination Categories */}
        <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <category.icon className="text-4xl mb-4 text-blue-500 mx-auto" />
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tours */}
        <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTours.map((tour, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                  <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tour.duration}</p>
                  <p className="text-lg font-bold text-blue-500">{tour.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Travelers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <FaQuoteLeft className="text-4xl mb-4 text-blue-500" />
                  <p className="text-lg mb-4">{testimonial.text}</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} shadow-lg`}>
              <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h2>
              <p className="text-center mb-6">Get the latest travel tips and exclusive offers straight to your inbox!</p>
              <form className="max-w-md mx-auto flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`flex-grow p-3 rounded-l-lg focus:outline-none ${
                    darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'
                  }`}
                />
                <motion.button
                  type="submit"
                  className={`px-6 py-3 ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white rounded-r-lg transition duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Destination;