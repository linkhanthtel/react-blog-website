import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMagic, FaLightbulb, FaTags, FaShieldAlt, FaRocket, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import apiService from '../services/api';

const AIEnhancementPanel = ({ 
  content, 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange,
  onTagsChange,
  destination = ''
}) => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState({});
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);

  const handleAIAction = async (action, params = {}) => {
    setLoading(prev => ({ ...prev, [action]: true }));
    setError(null);

    try {
      let result;
      switch (action) {
        case 'description':
          result = await apiService.generateDescription(content, title);
          setResults(prev => ({ ...prev, description: result.description }));
          break;
        case 'title':
          result = await apiService.suggestTitle(content, title);
          setResults(prev => ({ ...prev, title: result.title }));
          break;
        case 'tags':
          result = await apiService.generateTags(content, title);
          setResults(prev => ({ ...prev, tags: result.tags }));
          break;
        case 'improve':
          result = await apiService.improveContent(content);
          setResults(prev => ({ ...prev, improvements: result }));
          break;
        case 'moderate':
          result = await apiService.moderateContent(content);
          setResults(prev => ({ ...prev, moderation: result }));
          break;
        case 'insights':
          result = await apiService.getTravelInsights(destination, content);
          setResults(prev => ({ ...prev, insights: result }));
          break;
        default:
          throw new Error('Unknown AI action');
      }
    } catch (err) {
      setError(`Failed to ${action}: ${err.message}`);
    } finally {
      setLoading(prev => ({ ...prev, [action]: false }));
    }
  };

  const applyResult = (type, value) => {
    switch (type) {
      case 'title':
        onTitleChange(value);
        break;
      case 'description':
        onDescriptionChange(value);
        break;
      case 'tags':
        onTagsChange(value);
        break;
    }
  };

  const AIButton = ({ action, icon: Icon, label, color = 'blue' }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleAIAction(action)}
      disabled={loading[action]}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        darkMode 
          ? `bg-${color}-600 hover:bg-${color}-700 text-white` 
          : `bg-${color}-500 hover:bg-${color}-600 text-white`
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading[action] ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <Icon />
      )}
      {label}
    </motion.button>
  );

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <div className="flex items-center gap-2 mb-6">
        <FaMagic className={`text-2xl ${darkMode ? 'text-purple-400' : 'text-sky-600'}`} />
        <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          AI Content Enhancement
        </h3>
      </div>

      {error && (
        <div className={`mb-4 p-3 rounded-lg ${
          darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
        }`}>
          {error}
        </div>
      )}

      {/* AI Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <AIButton
          action="title"
          icon={FaLightbulb}
          label="Suggest Title"
          color="yellow"
        />
        <AIButton
          action="description"
          icon={FaMagic}
          label="Generate Description"
          color="purple"
        />
        <AIButton
          action="tags"
          icon={FaTags}
          label="Generate Tags"
          color="green"
        />
        <AIButton
          action="improve"
          icon={FaRocket}
          label="Improve Content"
          color="blue"
        />
        <AIButton
          action="moderate"
          icon={FaShieldAlt}
          label="Content Check"
          color="red"
        />
        {destination && (
          <AIButton
            action="insights"
            icon={FaRocket}
            label="Travel Insights"
            color="indigo"
          />
        )}
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        {/* Title Suggestion */}
        {results.title && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Suggested Title:
            </h4>
            <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {results.title}
            </p>
            <button
              onClick={() => applyResult('title', results.title)}
              className={`px-3 py-1 rounded text-sm ${
                darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white`}
            >
              Use This Title
            </button>
          </div>
        )}

        {/* Description Suggestion */}
        {results.description && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Generated Description:
            </h4>
            <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {results.description}
            </p>
            <button
              onClick={() => applyResult('description', results.description)}
              className={`px-3 py-1 rounded text-sm ${
                darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-sky-500 hover:bg-sky-600'
              } text-white`}
            >
              Use This Description
            </button>
          </div>
        )}

        {/* Tags Suggestion */}
        {results.tags && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Suggested Tags:
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {results.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-sm ${
                    darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => applyResult('tags', results.tags.join(', '))}
              className={`px-3 py-1 rounded text-sm ${
                darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              Use These Tags
            </button>
          </div>
        )}

        {/* Content Improvements */}
        {results.improvements && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Content Analysis:
            </h4>
            <div className="space-y-3">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Readability Score: 
                </span>
                <span className={`ml-2 px-2 py-1 rounded ${
                  darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {results.improvements.readability_score}/10
                </span>
              </div>
              
              {results.improvements.suggestions && results.improvements.suggestions.length > 0 && (
                <div>
                  <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Suggestions:
                  </span>
                  <ul className={`mt-1 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {results.improvements.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.improvements.missing_elements && results.improvements.missing_elements.length > 0 && (
                <div>
                  <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Consider Adding:
                  </span>
                  <ul className={`mt-1 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {results.improvements.missing_elements.map((element, index) => (
                      <li key={index}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Moderation */}
        {results.moderation && (
          <div className={`p-4 rounded-lg ${
            results.moderation.is_safe 
              ? darkMode ? 'bg-green-900' : 'bg-green-50'
              : darkMode ? 'bg-red-900' : 'bg-red-50'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              results.moderation.is_safe 
                ? darkMode ? 'text-green-200' : 'text-green-800'
                : darkMode ? 'text-red-200' : 'text-red-800'
            }`}>
              Content Moderation:
            </h4>
            <div className="space-y-2">
              <div className={`flex items-center gap-2 ${
                results.moderation.is_safe 
                  ? darkMode ? 'text-green-300' : 'text-green-700'
                  : darkMode ? 'text-red-300' : 'text-red-700'
              }`}>
                <span className="font-medium">
                  Status: {results.moderation.is_safe ? 'Safe' : 'Needs Review'}
                </span>
                <span className="text-sm">
                  (Confidence: {Math.round(results.moderation.confidence * 100)}%)
                </span>
              </div>
              
              {results.moderation.issues && results.moderation.issues.length > 0 && (
                <div>
                  <span className={`font-medium ${
                    darkMode ? 'text-red-200' : 'text-red-700'
                  }`}>
                    Issues Found:
                  </span>
                  <ul className={`mt-1 list-disc list-inside ${
                    darkMode ? 'text-red-300' : 'text-red-600'
                  }`}>
                    {results.moderation.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Travel Insights */}
        {results.insights && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Travel Insights for {destination}:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Best Time to Visit:
                </span>
                <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.insights.best_time}
                </p>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Must-See Attractions:
                </span>
                <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.insights.attractions}
                </p>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Local Tips:
                </span>
                <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.insights.tips}
                </p>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Budget Considerations:
                </span>
                <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.insights.budget}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEnhancementPanel;
