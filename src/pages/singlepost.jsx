import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRegEdit, FaBookmark, FaShare } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { Link } from 'react-router-dom'
import image4 from '../images/image4.jpg'
import Sidebar from '../components/sidebar'
import { useTheme } from '../context/themeContext'

function SinglePost() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [showComments, setShowComments] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState([
    { id: 1, title: "10 Budget Travel Tips", likes: 120 },
    { id: 2, title: "Best Street Food in Asia", likes: 95 },
    { id: 3, title: "Hidden Gems of Europe", likes: 78 },
  ])

  useEffect(() => {
    // Simulating a fetch of related posts
    setTimeout(() => {
      setRelatedPosts([
        { id: 1, title: "10 Budget Travel Tips", likes: 120 },
        { id: 2, title: "Best Street Food in Asia", likes: 95 },
        { id: 3, title: "Hidden Gems of Europe", likes: 78 },
        { id: 4, title: "Backpacking Essentials", likes: 62 },
      ])
    }, 2000)
  }, [])

  return (
    <div className={`pt-20 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row justify-between'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='lg:w-1/4 mb-8 lg:mb-0'
          >
            <Sidebar title={"Budget Trip"} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='lg:w-2/3'
          >
            <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className='mb-6'
              >
                <img src={image4} alt="Blog post image" className='w-full h-auto rounded-lg' />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='my-5 text-4xl font-bold text-center'
              >
                A Journey Through Time: Budget Travel in the 90s
              </motion.h1>
              <div className='my-5 flex justify-between items-center'>
                <p className='text-sm'>Lin, 1 hr ago</p>
                <div className='flex space-x-4'>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FaRegEdit className='text-xl' />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <MdDelete className='text-xl' />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FaBookmark className='text-xl' />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FaShare className='text-xl' />
                  </motion.button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='px-2 text-justify leading-relaxed'
              >
                <p>
                  Remember the days of paper maps, payphones, and disposable cameras? Let's take a nostalgic journey back to budget travel in the 90s. Before smartphones and instant bookings, we relied on guidebooks, local recommendations, and a sense of adventure.
                </p>
                <br />
                <p>
                  Hostels were the go-to accommodation, offering not just a place to sleep but a hub for meeting fellow travelers. We'd swap stories, share tips, and sometimes even continue our journeys together. The common rooms were filled with the sound of different languages and the excitement of new friendships.
                </p>
                <br />
                <p>
                  Transportation was an adventure in itself. We'd hop on local buses, navigating with broken language skills and hand gestures. Train journeys were long but rewarding, offering stunning views and chances to interact with locals. And who could forget the thrill of hitchhiking – a practice that seems almost unthinkable today?
                </p>
                <br />
                <p>
                  Food was all about local, street-side experiences. We'd point at menus we couldn't read, trying mysterious dishes that often became favorite memories. The joy of finding a hidden gem of a restaurant, recommended by a local or a fellow traveler, was unparalleled.
                </p>
                <br />
                <p>
                  While today's travel has its perks – easy bookings, GPS navigation, instant translations – there's something to be said for the unpredictability and raw experiences of 90s budget travel. It taught us patience, adaptability, and the art of human connection in a way that's harder to find in our digital age.
                </p>
                <br />
                <p>
                  So here's to the memories of budget travel in the 90s – a time of discovery, adventure, and connections made without a Wi-Fi password in sight. Those experiences shaped us as travelers and as individuals, leaving us with stories we'll cherish forever.
                </p>
              </motion.div>
              <div className='mt-8'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComments(!showComments)}
                  className={`px-4 py-2 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
                >
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </motion.button>
                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='mt-4'
                    >
                      <h3 className='text-xl font-semibold mb-2'>Comments</h3>
                      <div className='space-y-4'>
                        <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <p className='font-semibold'>John Doe</p>
                          <p>This brings back so many memories! I miss those days of true adventure.</p>
                        </div>
                        <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <p className='font-semibold'>Jane Smith</p>
                          <p>Great article! It reminds me of my backpacking days across Europe.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`mt-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className='text-2xl font-bold mb-4'>Trending Posts</h2>
              <div className='space-y-4'>
                {relatedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 1.03 }}
                    className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
                  >
                    <Link to="#" className='font-semibold hover:underline'>{post.title}</Link>
                    <p className='text-sm'>{post.likes} likes</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className='mt-8 text-center'
        >
          <Link to="/" className={`inline-block px-6 py-3 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}>
            Back to Home
          </Link>
        </motion.div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className={`fixed bottom-4 right-4 p-3 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
      >
        {darkMode ? '☀️' : '🌙'}
      </motion.button>
    </div>
  )
}

export default SinglePost