import React, { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTimes, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';
import apiService from '../services/api';

const ImageUpload = ({ 
  value, 
  onChange, 
  placeholder = "Click to upload image or drag and drop",
  className = "",
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = "image/*"
}) => {
  const { darkMode } = useTheme();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Upload file to backend
      const response = await apiService.uploadImage(file);
      
      // Update parent component
      onChange(response.url);
      setPreview(response.url);
    } catch (err) {
      setError('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    onChange('');
    setPreview('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's a relative URL, prepend the API base URL
    if (url.startsWith('/uploads/')) {
      return `http://127.0.0.1:8000${url}`;
    }
    return url;
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative">
          <img
            src={getImageUrl(preview)}
            alt="Preview"
            className={`w-full h-48 object-cover rounded-lg border-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
            onError={(e) => {
              e.target.src = 'http://127.0.0.1:8000/api/placeholder/400/300';
            }}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            disabled={uploading}
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${darkMode 
              ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-700' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <FaSpinner className="w-8 h-8 text-blue-500 animate-spin mb-2" />
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Uploading image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaUpload className={`w-8 h-8 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{placeholder}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                PNG, JPG, GIF up to {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className={`mt-2 p-2 rounded text-sm border ${darkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'}`}>
          {error}
        </div>
      )}

      {preview && !uploading && (
        <div className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <FaImage className="inline mr-1" />
          Image uploaded successfully
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
