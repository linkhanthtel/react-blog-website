import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-lg font-semibold">WanderLuxe Ventures</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Home</Link>
              <Link to="/blogs" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Blogs</Link>
              <Link to="/join" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Join</Link>
              <Link to="/contact" className="text-white hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Contact</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <a href="#" className="text-white hover:text-blue-200 px-2 transition duration-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 px-2 transition duration-300">
                <AiFillInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 px-2 transition duration-300">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Home</Link>
            <Link to="/blogs" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Blogs</Link>
            <Link to="/join" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Join</Link>
            <Link to="/contact" className="text-white hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Contact</Link>
          </div>
          <div className="px-4 py-3">
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                <AiFillInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar