import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ArticleCard from '../components/articlecard'
import Sidebar from '../components/sidebar'

const blogPosts = [
  { id: 1, title: "Popular Destinations" },
  { id: 2, title: "Healthy Diet for Vegetarians" },
  { id: 3, title: "Tips for Purchasing Smartphones" },
  { id: 4, title: "Famous Places in Asia" },
  { id: 5, title: "How to Make a Delicious Curry" },
  { id: 6, title: "Things You Should Know Before 30" },
]

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Blog</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} title={post.title} />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No articles found matching your search.</p>
          )}
        </div>
        <div className="lg:w-1/4 space-y-6">
          <Sidebar title="Popular Destinations" />
          <Sidebar title="Shopping" />
        </div>
      </div>
    </div>
  )
}

export default Blogs