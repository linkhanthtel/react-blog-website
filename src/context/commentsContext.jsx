import React, { createContext, useContext, useState, useCallback } from 'react';
import apiService from '../services/api';

const CommentsContext = createContext();

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get comments for a post
  const getComments = useCallback(async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getComments(postId);
      setComments(prev => ({
        ...prev,
        [postId]: response.comments
      }));
      return response.comments;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new comment
  const createComment = useCallback(async (postId, commentData) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await apiService.createComment(postId, commentData);
      
      // Add the new comment to the state
      setComments(prev => ({
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])]
      }));
      
      return newComment;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a comment
  const deleteComment = useCallback(async (postId, commentId) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteComment(postId, commentId);
      
      // Remove the comment from the state
      setComments(prev => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(comment => comment.id !== commentId)
      }));
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Like a post
  const likePost = useCallback(async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await apiService.likePost(postId);
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    comments,
    loading,
    error,
    getComments,
    createComment,
    deleteComment,
    likePost,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
