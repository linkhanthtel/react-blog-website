import React from 'react';
import { FaInfoCircle, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const ImageUrlGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            <FaInfoCircle className="inline mr-2" />
            Image URL Guide
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">❌ Don't use page URLs:</h4>
            <p className="text-sm bg-red-50 dark:bg-red-900 p-3 rounded">
              <code>https://pixabay.com/photos/yangon-yangon-river-myanmar-dawn-2862870/</code>
            </p>
            <p className="text-sm mt-1">This is a page URL, not a direct image URL.</p>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✅ Use direct image URLs:</h4>
            <p className="text-sm bg-green-50 dark:bg-green-900 p-3 rounded">
              <code>https://cdn.pixabay.com/photo/2017/11/15/13/27/yangon-2951834_1280.jpg</code>
            </p>
            <p className="text-sm mt-1">This is a direct image URL that will work properly.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">How to get the correct URL:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Go to the image on Pixabay</li>
              <li>Right-click on the image</li>
              <li>Select "Copy image address" or "Copy image URL"</li>
              <li>Paste that URL in the image field</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Alternative image sources:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Unsplash <FaExternalLinkAlt className="inline ml-1" />
                </a> - Free high-quality photos
              </li>
              <li>
                <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Lorem Picsum <FaExternalLinkAlt className="inline ml-1" />
                </a> - Random placeholder images
              </li>
              <li>
                <a href="https://placeholder.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Placeholder.com <FaExternalLinkAlt className="inline ml-1" />
                </a> - Custom placeholder images
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded">
            <p className="text-sm">
              <strong>Tip:</strong> Direct image URLs usually end with file extensions like .jpg, .png, .gif, or .webp
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUrlGuide;
