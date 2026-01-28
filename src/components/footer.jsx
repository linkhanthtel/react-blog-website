import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedin, FaPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaRocket, FaGlobe, FaPaperPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useTheme } from '../context/themeContext';

function Footer() {
    const { darkMode } = useTheme();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setIsSubscribed(true);
        setTimeout(() => {
            setIsSubscribed(false);
            setEmail('');
        }, 3000);
    };

    const socialIcons = [
        { Icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-400', bgColor: 'from-blue-500 to-blue-600' },
        { Icon: AiFillInstagram, label: 'Instagram', color: 'hover:text-pink-400', bgColor: 'from-pink-500 to-sky-500' },
        { Icon: FaYoutube, label: 'YouTube', color: 'hover:text-red-400', bgColor: 'from-red-500 to-red-600' },
        { Icon: FaTwitter, label: 'Twitter', color: 'hover:text-sky-400', bgColor: 'from-sky-400 to-blue-500' },
        { Icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-400', bgColor: 'from-blue-600 to-blue-700' },
    ];

    return (
        <motion.footer 
            className={`relative overflow-hidden ${
                darkMode 
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500'
            } text-white`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-64 h-64 rounded-full ${
                            darkMode ? 'bg-blue-500/5' : 'bg-white/5'
                        } blur-3xl`}
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + (i % 2) * 50}%`,
                        }}
                        animate={{
                            y: [0, 30, 0],
                            x: [0, 20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Wave Divider */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full h-16" preserveAspectRatio="none">
                    <motion.path
                        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                        fill={darkMode ? '#1a202c' : '#2563eb'}
                        fillOpacity="0.3"
                        animate={{
                            d: [
                                "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                                "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                                "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                            ],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </svg>
            </div>

            {/* Main Content */}
            <div className='relative z-10 pt-20 pb-10 px-6 md:px-12 lg:px-20'>
                <div className="max-w-7xl mx-auto">
                    {/* Top Section: Logo & Newsletter */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Brand Section with 3D Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div 
                                className="flex items-center space-x-3 mb-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    className="p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl backdrop-blur-sm border border-white/20"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FaPlane className="text-3xl text-white" />
                                </motion.div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white">WanderLuxe Ventures</h2>
                                    <p className="text-white/70 text-sm">Explore. Dream. Discover.</p>
                                </div>
                            </motion.div>
                            
                            <p className="text-white/80 leading-relaxed mb-6">
                                Embark on extraordinary journeys and create unforgettable memories with our curated travel experiences. Your adventure awaits!
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                {[
                                    { icon: FaEnvelope, text: 'hello@wanderluxe.com' },
                                    { icon: FaPhone, text: '+1 (555) 123-4567' },
                                    { icon: FaMapMarkerAlt, text: 'San Francisco, CA' },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-3 text-white/70"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5, color: '#ffffff' }}
                                    >
                                        <item.icon className="text-lg" />
                                        <span>{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Newsletter Section with 3D Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div 
                                className={`p-8 rounded-3xl ${
                                    darkMode 
                                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                                        : 'bg-white/10 backdrop-blur-md border border-white/20'
                                } shadow-2xl`}
                                whileHover={{ scale: 1.02 }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <motion.div
                                        className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <FaRocket className="text-white text-xl" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
                                </div>
                                
                                <p className="text-white/80 mb-6">
                                    Subscribe to our newsletter for exclusive travel tips and destination guides!
                                </p>

                                {isSubscribed ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="text-center py-6"
                                    >
                                        <p className="text-white font-medium text-lg tracking-wide">
                                            Thank you for subscribing!
                                        </p>
                                        <p className="text-white/70 text-sm mt-1">
                                            You&apos;ll start receiving our latest updates soon.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                        <motion.input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className={`w-full px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${
                                                darkMode 
                                                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                                                    : 'bg-white text-gray-900 placeholder-gray-500'
                                            }`}
                                            whileFocus={{ scale: 1.02 }}
                                            required
                                        />
                                        <motion.button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-2xl font-semibold shadow-xl flex items-center justify-center space-x-2"
                                            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(251, 191, 36, 0.4)' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span>Subscribe Now</span>
                                            <FaPaperPlane className="text-lg" />
                                        </motion.button>
                                    </form>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Middle Section: Links Grid */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12'>
                        {/* Explore Column */}
                        <motion.div 
                            className='flex flex-col'
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className='text-xl font-bold mb-4 flex items-center space-x-2'>
                                <FaGlobe className="text-yellow-400" />
                                <span>Explore</span>
                            </h3>
                            {['Home', 'Blogs', 'About'].map((item, index) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link 
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className='py-2 text-white/70 hover:text-white transition-colors duration-300 flex items-center space-x-2 group'
                                    >
                                        <motion.span
                                            className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                        <span>{item}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Quick Links Column */}
                        <motion.div 
                            className='flex flex-col'
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
                            {['Contact', 'Join', 'Support', 'FAQ'].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link 
                                        to={`/${item.toLowerCase()}`}
                                        className='py-2 text-white/70 hover:text-white transition-colors duration-300'
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Resources Column */}
                        <motion.div 
                            className='flex flex-col'
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className='text-xl font-bold mb-4'>Resources</h3>
                            {['Travel Guide', 'Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link 
                                        to="#"
                                        className='py-2 text-white/70 hover:text-white transition-colors duration-300'
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Connect Column */}
                        <motion.div 
                            className='flex flex-col'
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3 className='text-xl font-bold mb-4'>Connect</h3>
                            <div className='flex flex-wrap gap-3'>
                                {socialIcons.map(({ Icon, label, color, bgColor }, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className={`group relative`}
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.6 }}
                                        title={label}
                                    >
                                        <motion.div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgColor} flex items-center justify-center shadow-lg`}
                                            whileHover={{ boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)' }}
                                        >
                                            <Icon className="text-white text-xl" />
                                        </motion.div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Section: Copyright */}
                    <motion.div 
                        className='border-t border-white/20 pt-8 text-center'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-white/70 flex items-center justify-center space-x-2 text-sm md:text-base">
                            <span>&copy; {new Date().getFullYear()} WanderLuxe Ventures. All rights reserved.</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <FaHeart className="text-red-400" />
                            </motion.span>
                        </p>
                        <motion.p 
                            className="text-white/50 text-xs mt-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                        >
                            Crafted with passion for travel enthusiasts worldwide
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
}

export default React.memo(Footer);