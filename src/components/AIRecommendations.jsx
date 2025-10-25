import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/themeContext';
import apiService from '../services/api';
import ImageWithFallback from './ImageWithFallback';
import { getImageAlt } from '../utils/imageUtils';

const AIRecommendations = ({ postId, currentPost, limit = 5 }) => {
  const { darkMode } = useTheme();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiScore, setAiScore] = useState(null);

  useEffect(() => {
    if (postId) {
      fetchRecommendations();
    }
  }, [postId]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.getPostRecommendations(postId, limit);
      setRecommendations(result.recommendations || []);
      
      // Calculate AI score for current post
      if (currentPost) {
        const score = calculateAIScore(currentPost);
        setAiScore(score);
      }
    } catch (err) {
      setError('Failed to load AI recommendations');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAIScore = (post) => {
    let score = 0;
    
    // Engagement score
    score += (post.likes || 0) * 2;
    score += (post.comments || 0) * 3;
    
    // Content quality
    const contentLength = post.content?.length || 0;
    if (contentLength > 500) score += 10;
    if (contentLength > 1000) score += 20;
    
    // Title quality
    const titleLength = post.title?.length || 0;
    if (titleLength >= 30 && titleLength <= 60) score += 5;
    
    // Has description
    if (post.description) score += 5;
    
    // Has image
    if (post.image) score += 3;
    
    return score;
  };

  const getScoreColor = (score) => {
    if (score >= 50) return 'text-green-500';
    if (score >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 50) return 'Excellent';
    if (score >= 30) return 'Good';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-center py-8">
          <FaSpinner className="animate-spin text-2xl text-blue-500 mr-3" />
          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            AI is analyzing content...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="text-center py-4">
          <p className={`${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {error}
          </p>
          <button
            onClick={fetchRecommendations}
            className={`mt-2 px-4 py-2 rounded ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white text-sm`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FaBrain className={`text-2xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          AI-Powered Recommendations
        </h3>
      </div>

      {/* Current Post AI Score */}
      {aiScore !== null && (
        <div className={`mb-6 p-4 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Content Quality Score:
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(aiScore)}`}>
                {aiScore}
              </span>
              <span className={`text-sm ${getScoreColor(aiScore)}`}>
                {getScoreLabel(aiScore)}
              </span>
            </div>
          </div>
          <div className={`mt-2 w-full h-2 rounded-full ${
            darkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <div
              className={`h-2 rounded-full ${
                aiScore >= 50 ? 'bg-green-500' : aiScore >= 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((aiScore / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Similar Posts You Might Like:
          </h4>
          
          {recommendations.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-lg ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              } transition-all duration-300`}
            >
              <Link to={`/blogs/singlepost/${post.id}`} className="block">
                <div className="flex gap-4 p-4">
                  {/* Post Image */}
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={getImageAlt(post.image, post.title)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      fallbackSrc="https://wanderluxe-ventures.onrender.com/api/placeholder/80/80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 ${
                      darkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      {post.title}
                    </h3>
                    
                    {post.description && (
                      <p className={`text-xs mb-2 line-clamp-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {post.description}
                      </p>
                    )}

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {post.author}
                        </span>
                        <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          •
                        </span>
                        <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(post.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.likes} likes
                        </span>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.comments} comments
                        </span>
                      </div>
                    </div>

                    {/* AI Similarity Indicator */}
                    <div className="mt-2 flex items-center gap-1">
                      <FaBrain className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        AI Recommended
                      </span>
                    </div>
                  </div>

                  {/* External Link Icon */}
                  <div className="flex-shrink-0 self-center">
                    <FaExternalLinkAlt className={`text-xs ${
                      darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                    } transition-colors duration-300`} />
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 ${
                  darkMode ? 'bg-purple-500' : 'bg-purple-600'
                }`} />
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FaBrain className={`text-4xl mx-auto mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No similar posts found. AI is still learning!
          </p>
        </div>
      )}

      {/* AI Info */}
      <div className={`mt-6 pt-4 border-t ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          💡 Recommendations powered by AI content similarity analysis
        </p>
      </div>
    </div>
  );
};

export default AIRecommendations;
