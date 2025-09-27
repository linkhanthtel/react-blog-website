import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useTheme } from '../context/themeContext';
import apiService from '../services/api';
import ImageUpload from '../components/ImageUpload';
import AIEnhancementPanel from '../components/AIEnhancementPanel';

const BlogManagement = () => {
  const { user, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    image: '',
    author: '',
    tags: ''
  });
  const [showAI, setShowAI] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/join';
    }
  }, [isAuthenticated]);

  // Load user's posts
  useEffect(() => {
    if (isAuthenticated) {
      loadUserPosts();
    }
  }, [isAuthenticated]);

  const loadUserPosts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPosts(0, 100); // Get all posts for management
      setPosts(response.posts || []);
    } catch (err) {
      setError('Failed to load posts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAITitleChange = (title) => {
    setFormData(prev => ({ ...prev, title }));
  };

  const handleAIDescriptionChange = (description) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const handleAITagsChange = (tags) => {
    setFormData(prev => ({ ...prev, tags }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      description: '',
      image: '',
      author: user?.username || '',
      tags: ''
    });
    setEditingPost(null);
    setShowCreateForm(false);
    setShowAI(false);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const postData = {
        ...formData,
        author: user?.username || formData.author
      };
      
      await apiService.createPost(postData);
      await loadUserPosts();
      resetForm();
    } catch (err) {
      setError('Failed to create post: ' + err.message);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      description: post.description || '',
      image: post.image || '',
      author: post.author,
      tags: post.tags || ''
    });
    setShowCreateForm(true);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const updateData = {
        ...formData,
        author: user?.username || formData.author
      };
      
      await apiService.updatePost(editingPost.id, updateData);
      await loadUserPosts();
      resetForm();
    } catch (err) {
      setError('Failed to update post: ' + err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setError(null);
        await apiService.deletePost(postId);
        await loadUserPosts();
      } catch (err) {
        setError('Failed to delete post: ' + err.message);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Please log in to manage your blogs</h1>
          <a href="/join" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} hover:underline`}>Go to Login</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`text-xl ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-40 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Blogs</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage your blog posts - create, edit, and delete</p>
        </div>

        {error && (
          <div className={`px-4 py-3 rounded mb-4 ${darkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'} border`}>
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={`px-4 py-2 rounded transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {showCreateForm ? 'Cancel' : 'Create New Post'}
          </button>
          {showCreateForm && (
            <button
              onClick={() => setShowAI(!showAI)}
              className={`px-4 py-2 rounded transition-colors ${darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
            >
              {showAI ? 'Hide AI Assistant' : 'Show AI Assistant'}
            </button>
          )}
        </div>

        {showCreateForm && (
          <div className={`rounded-lg shadow-md p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="2"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="travel, adventure, destination..."
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Post Image
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  placeholder="Click to upload image or drag and drop"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="8"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded transition-colors ${darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className={`px-4 py-2 rounded transition-colors ${darkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AI Enhancement Panel */}
        {showAI && showCreateForm && (
          <div className="mb-8">
            <AIEnhancementPanel
              content={formData.content}
              title={formData.title}
              description={formData.description}
              destination={formData.title.split(' ').slice(0, 2).join(' ')} // Extract destination from title
              onTitleChange={handleAITitleChange}
              onDescriptionChange={handleAIDescriptionChange}
              onTagsChange={handleAITagsChange}
            />
          </div>
        )}

        <div className={`rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Your Posts ({posts.length})</h2>
          </div>
          
          {posts.length === 0 ? (
            <div className={`p-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>No posts found. Create your first post!</p>
            </div>
          ) : (
            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {posts.map((post) => (
                <div key={post.id} className={`p-6 ${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.description}</p>
                      )}
                      <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>Author: {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>Likes: {post.likes}</span>
                        <span className="mx-2">•</span>
                        <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {post.content.length > 200 
                          ? `${post.content.substring(0, 200)}...` 
                          : post.content
                        }
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditPost(post)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default BlogManagement;
