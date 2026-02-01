import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/themeContext';

function Footer() {
    const { darkMode } = useTheme();

    const contactItems = [
        { label: 'Email', text: 'hello@wanderluxe.com' },
        { label: 'Phone', text: '+65 8762 5331' },
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
                    {/* Brand Section - no icons */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                            WanderLuxe Ventures
                        </h2>
                        <p className="text-white/70 text-sm font-light tracking-wide mb-6">
                            Explore. Dream. Discover.
                        </p>
                        <p className="text-white/80 leading-relaxed max-w-xl mx-auto mb-8 text-sm">
                            Embark on extraordinary journeys and create unforgettable memories with our curated travel experiences.
                        </p>

                        {/* Contact Info - text only */}
                        <div className="space-y-2 text-white/70 text-sm font-light tracking-wide">
                            {contactItems.map((item, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.text}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Row */}
                    <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12'>
                        {['Home', 'Blogs', 'About', 'Contact', 'Join'].map((item) => (
                            <motion.div
                                key={item}
                                whileHover={{ x: 2 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link 
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className='py-2 text-white/70 hover:text-white transition-colors duration-300 text-sm font-light tracking-wide'
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Copyright */}
                    <motion.div 
                        className='border-t border-white/20 pt-8 text-center'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-white/70 text-sm font-light tracking-wide">
                            &copy; {new Date().getFullYear()} WanderLuxe Ventures. All rights reserved.
                        </p>
                        <motion.p 
                            className="text-white/50 text-xs mt-2 font-light tracking-wide"
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
