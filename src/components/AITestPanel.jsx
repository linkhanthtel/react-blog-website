import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import apiService from '../services/api';

const AITestPanel = () => {
  const { darkMode } = useTheme();
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const testAIFeatures = async () => {
    setTesting(true);
    setError(null);
    setResults(null);

    try {
      // Test AI health endpoint
      const healthResponse = await apiService.getAIHealth();
      
      // Test AI description generation
      const descriptionResponse = await apiService.generateDescription(
        "I visited the beautiful beaches of Bali and had an amazing time exploring the local culture and cuisine.",
        "Bali Adventure"
      );

      // Test AI title suggestion
      const titleResponse = await apiService.suggestTitle(
        "I visited the beautiful beaches of Bali and had an amazing time exploring the local culture and cuisine.",
        "My Trip"
      );

      // Test AI tags generation
      const tagsResponse = await apiService.generateTags(
        "I visited the beautiful beaches of Bali and had an amazing time exploring the local culture and cuisine.",
        "Bali Adventure"
      );

      setResults({
        health: healthResponse,
        description: descriptionResponse,
        title: titleResponse,
        tags: tagsResponse
      });
    } catch (err) {
      setError(`AI Test Failed: ${err.message}`);
      console.error('AI Test Error:', err);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
      <div className="flex items-center gap-2 mb-6">
        <FaBrain className={`text-2xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          AI Features Test Panel
        </h3>
      </div>

      <div className="space-y-4">
        <button
          onClick={testAIFeatures}
          disabled={testing}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            darkMode 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {testing ? (
            <div className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Testing AI Features...
            </div>
          ) : (
            'Test AI Features'
          )}
        </button>

        {error && (
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              <FaExclamationTriangle />
              <span className="font-medium">Error:</span>
            </div>
            <p className="mt-1 text-sm">{error}</p>
            <p className="mt-2 text-xs opacity-75">
              Make sure the backend is running with AI dependencies installed.
            </p>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle />
                <span className="font-medium">AI Features Working!</span>
              </div>
              <p className="text-sm">All AI endpoints are responding correctly.</p>
            </div>

            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Health Status:
                </h4>
                <pre className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {JSON.stringify(results.health, null, 2)}
                </pre>
              </div>

              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Generated Description:
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.description.description}
                </p>
              </div>

              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Suggested Title:
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.title.title}
                </p>
              </div>

              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Generated Tags:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.tags.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITestPanel;
