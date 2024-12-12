import React, { useState } from 'react'
import { FiUser, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi'
import image2 from '../images/image2.jpg'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', phone: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                Welcome to WanderLuxe Ventures, where luxury meets adventure. We are passionate about curating extraordinary travel experiences that blend opulence with authenticity. Our team of seasoned travel experts is dedicated to crafting bespoke journeys that cater to the discerning tastes of modern explorers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From secluded island retreats to vibrant cultural expeditions, we pride ourselves on uncovering hidden gems and delivering unparalleled service. At WanderLuxe Ventures, we believe that travel should not only be a feast for the senses but also a transformative experience that enriches the soul. Join us as we redefine luxury travel, one extraordinary adventure at a time.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={image2}
                alt="Luxury Travel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    required
                  />
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    required
                  />
                  <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your message"
                    className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    required
                  ></textarea>
                  <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
              >
                <FiSend className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact