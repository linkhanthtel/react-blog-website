import React, { useState } from 'react'
import { FiUser, FiTag, FiFileText, FiSend } from 'react-icons/fi'
import image1 from "../images/image1.jpg"

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    article: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', category: '', article: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-64 bg-blue-600 overflow-hidden">
        <img 
          src={image1}
          alt="Community Banner" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Join our community</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Our Community</h2>
          <p className="text-gray-600 leading-relaxed">
            Join our vibrant community of writers, thinkers, and creators. Share your ideas, experiences, and expertise with a global audience. Whether you're passionate about technology, travel, lifestyle, or any other topic, there's a place for you here. Start your journey today by creating your first post and connecting with like-minded individuals from around the world.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Your Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-3 pl-10 pr-4 text-gray-700 bg-gray-50 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  required
                />
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="relative">
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Article category"
                  className="w-full p-3 pl-10 pr-4 text-gray-700 bg-gray-50 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  required
                />
                <FiTag className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="article" className="block text-sm font-medium text-gray-700 mb-1">Your Article</label>
              <div className="relative">
                <textarea
                  id="article"
                  name="article"
                  value={formData.article}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Write your article here..."
                  className="w-full p-3 pl-10 pr-4 text-gray-700 bg-gray-50 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  required
                ></textarea>
                <FiFileText className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              <FiSend className="mr-2" />
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Join