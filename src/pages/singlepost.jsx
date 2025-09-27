import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegEdit, FaBookmark, FaShare, FaHeart, FaComment, FaArrowLeft, FaUser, FaClock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import { usePosts } from '../context/postsContext';
import apiService from '../services/api';
import { getImageAlt } from '../utils/imageUtils';
import ImageWithFallback from '../components/ImageWithFallback';
import LikeButton from '../components/LikeButton';
import CommentsSection from '../components/CommentsSection';
import AIRecommendations from '../components/AIRecommendations';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { posts } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Custom Recommended Posts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/4 order-2 lg:order-1"
          >
            <div className={`sticky top-24 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
              {/* Header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-500'
                  }`}
                >
                  <FaHeart className="text-white text-xl" />
                </motion.div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Recommended
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Discover more amazing content
                </p>
              </div>

              {/* AI-Powered Recommendations */}
              <AIRecommendations 
                postId={parseInt(id)} 
                currentPost={post}
                limit={4}
              />

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="pt-4"
              >
                <Link
                  to="/blogs"
                  className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  View All Posts
                </Link>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {posts.length}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Posts
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {posts.reduce((sum, post) => sum + post.likes, 0)}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Likes
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-3/4 order-1 lg:order-2"
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
                <ImageWithFallback
                  src={post.image}
                  alt={getImageAlt(post.image, post.title)}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/800/400"
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
                  <LikeButton 
                    postId={post.id} 
                    initialLikes={post.likes} 
                    size="md" 
                    showCount={true}
                  />
                  
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FaComment />
                    <span>{post.comments}</span>
                        </div>
                      </div>
              </div>

              {/* Comments Section */}
              <CommentsSection postId={post.id} postAuthor={post.author} />
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;