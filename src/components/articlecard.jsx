import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import image6 from '../images/image6.jpg'

function ArticleCard({ title }) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-xl">
      <img 
        className="h-48 w-full object-cover" 
        src={image6} 
        alt={title} 
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Link 
          to="/blogs/singlepost" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
        >
          Read More
          <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  )
}

export default ArticleCard