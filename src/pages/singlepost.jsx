import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegEdit, FaBookmark, FaShare, FaHeart, FaComment, FaArrowLeft, FaUser, FaClock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import apiService from '../services/api';
import Sidebar from '../components/sidebar';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [liked, setLiked] = useState(false);

  // Fetch the specific post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await apiService.getPost(id);
        setPost(postData);
      } catch (err) {
        setError('Failed to load post: ' + err.message);
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Fetch related posts
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await apiService.getPosts(0, 4);
        // Filter out the current post and get up to 3 related posts
        const related = response.posts.filter(p => p.id !== parseInt(id)).slice(0, 3);
        setRelatedPosts(related);
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    fetchRelatedPosts();
  }, [id]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const updatedPost = await apiService.likePost(post.id);
      setPost(updatedPost);
      setLiked(true);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleDelete = async () => {
    if (!post || !isAuthenticated || user?.id !== post.owner_id) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiService.deletePost(post.id);
        navigate('/blogs');
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const canEdit = isAuthenticated && user?.id === post?.owner_id;

  if (loading) {
    return (
      <div className={`pt-20 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg">Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`pt-20 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
              <p className="text-lg mb-6">{error || 'The post you are looking for does not exist.'}</p>
              <Link 
                to="/blogs" 
                className={`inline-block px-6 py-3 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
              >
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-20 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/4 mb-8 lg:mb-0"
          >
            <Sidebar title="Related Posts" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3"
          >
            <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-6"
              >
                <Link 
                  to="/blogs"
                  className={`inline-flex items-center text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Blogs
                </Link>
              </motion.div>

              {/* Post Image */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <img 
                  src={post.image || '/api/placeholder/800/400'} 
                  alt={post.title} 
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/800/400';
                  }}
                />
              </motion.div>

              {/* Post Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="my-5 text-3xl md:text-4xl font-bold text-center"
              >
                {post.title}
              </motion.h1>

              {/* Post Meta */}
              <div className="my-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{post.author || 'Unknown Author'}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {canEdit && (
                    <>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/manage-blogs?edit=${post.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Post"
                      >
                        <FaRegEdit className="text-xl" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Post"
                      >
                        <MdDelete className="text-xl" />
                      </motion.button>
                    </>
                  )}
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FaBookmark className="text-xl" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FaShare className="text-xl" />
                  </motion.button>
                </div>
              </div>

              {/* Post Description */}
              {post.description && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                  <p className="text-lg italic text-gray-600 dark:text-gray-300">
                    {post.description}
                  </p>
                </motion.div>
              )}

              {/* Post Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="px-2 text-justify leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />

              {/* Engagement Section */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      liked 
                        ? 'bg-red-500 text-white' 
                        : darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    } transition-colors duration-300`}
                  >
                    <FaHeart className={liked ? 'text-red-500' : ''} />
                    <span>{post.likes}</span>
                  </motion.button>
                  
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FaComment />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComments(!showComments)}
                  className={`px-4 py-2 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
                >
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </motion.button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {showComments && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <h3 className="text-xl font-semibold mb-4">Comments</h3>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className="text-sm text-gray-500 mb-2">Comments feature coming soon!</p>
                        <p className="text-sm">This is where comments will be displayed when the feature is implemented.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className={`mt-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <motion.div
                      key={relatedPost.id}
                      whileHover={{ scale: 1.03 }}
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
                    >
                      <Link 
                        to={`/blogs/singlepost/${relatedPost.id}`} 
                        className="font-semibold hover:underline block mb-2"
                      >
                        {relatedPost.title}
                      </Link>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By {relatedPost.author}</span>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <FaHeart className="mr-1" />
                            {relatedPost.likes}
                          </span>
                          <span className="flex items-center">
                            <FaComment className="mr-1" />
                            {relatedPost.comments}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;