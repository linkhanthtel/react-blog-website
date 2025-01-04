import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useTheme } from '../context/themeContext';

function Footer() {
    const { darkMode } = useTheme();

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
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.footer 
            className={`relative ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-blue-600 text-white'} flex flex-col`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='py-10 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8'>
                <motion.div className='flex flex-col' variants={itemVariants}>
                    <h2 className='text-xl font-bold mb-4'>Explore</h2>
                    <Link to="/join" className='py-2 hover:underline'>Learn More</Link>
                    <Link to="/blogs" className='py-2 hover:underline'>Blogs</Link>
                    <Link to="/join" className='py-2 hover:underline'>Join the Community</Link>
                </motion.div>
                <motion.div className='flex flex-col' variants={itemVariants}>
                    <h2 className='text-xl font-bold mb-4'>Quick Links</h2>
                    <Link to="/" className='py-2 hover:underline'>Popular Destinations</Link>
                    <Link to="/contact" className='py-2 hover:underline'>Contact</Link>
                    <Link to="/contact" className='py-2 hover:underline'>Support</Link>
                </motion.div>
                <motion.div className='flex flex-col' variants={itemVariants}>
                    <h2 className='text-xl font-bold mb-4'>Connect With Us</h2>
                    <div className='flex space-x-4'>
                        {[FaFacebook, AiFillInstagram, FaYoutube, FaTwitter, FaLinkedin].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className={`text-2xl ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-200'} transition-colors duration-300`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
            <motion.div 
                className={`text-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-700'}`}
                variants={itemVariants}
            >
                <p>&copy; {new Date().getFullYear()} WanderLuxe Ventures | All rights reserved</p>
            </motion.div>
        </motion.footer>
    );
}

export default Footer;