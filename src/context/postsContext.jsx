import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/api';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Fetch posts from API
  const fetchPosts = async (skip = 0, limit = 10, search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getPosts(skip, limit, search);
      setPosts(response.posts || []);
      setTotalPosts(response.total || 0);
      setHasMore(response.has_more || false);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    try {
      const newPost = await apiService.createPost(postData);
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setTotalPosts(prev => prev + 1);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update a post
  const updatePost = async (postId, postData) => {
    try {
      const updatedPost = await apiService.updatePost(postId, postData);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await apiService.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      setTotalPosts(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Like a post
  const likePost = async (postId) => {
    try {
      const updatedPost = await apiService.likePost(postId);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    loading,
    error,
    totalPosts,
    hasMore,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    clearError,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
