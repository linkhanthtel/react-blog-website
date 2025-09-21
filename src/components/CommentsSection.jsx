import React, { useState, useEffect } from 'react';
import { FaComment, FaUser, FaTrash, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useComments } from '../context/commentsContext';
import { useAuth } from '../context/authContext';
import { useTheme } from '../context/themeContext';

const CommentsSection = ({ postId, postAuthor }) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { 
    comments, 
    loading, 
    error, 
    getComments, 
    createComment, 
    deleteComment 
  } = useComments();
  const { isAuthenticated, user } = useAuth();
  const { darkMode } = useTheme();

  const postComments = comments[postId] || [];

  useEffect(() => {
    if (showComments && postComments.length === 0) {
      getComments(postId);
    }
  }, [showComments, postId, getComments, postComments.length]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      await createComment(postId, {
        content: newComment.trim(),
        author: user?.username || 'Anonymous'
      });
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(postId, commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`mt-8 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Comments Toggle Button */}
      <motion.button
        onClick={() => setShowComments(!showComments)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
          ${darkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }
        `}
      >
        <FaComment className="w-4 h-4" />
        <span className="font-medium">
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
        }`}>
          {postComments.length}
        </span>
      </motion.button>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            {/* Add Comment Form */}
            {isAuthenticated ? (
              <motion.form
                onSubmit={handleSubmitComment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      rows={3}
                      className={`
                        w-full px-3 py-2 rounded-lg border resize-none
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      `}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!newComment.trim() || loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-300
                      ${!newComment.trim() || loading
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }
                    `}
                  >
                    <FaPaperPlane className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg text-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Please login to comment
                </p>
              </motion.div>
            )}

            {/* Comments List */}
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : error ? (
                <div className={`text-center py-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  Error loading comments: {error}
                </div>
              ) : postComments.length === 0 ? (
                <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                postComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaUser className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {comment.author}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {comment.content}
                        </p>
                      </div>
                      {isAuthenticated && user?.username === comment.author && (
                        <motion.button
                          onClick={() => handleDeleteComment(comment.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            darkMode 
                              ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                              : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <FaTrash className="w-3 h-3" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentsSection;
