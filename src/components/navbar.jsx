import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

function Navbar() {
  return (
    <div className='p-4 bg-blue-500 text-white flex justify-around'>
      <div>
        <Link>Blog</Link>
      </div>
      <div className='hidden md:flex'>
        <Link to="/" className='px-3 hover:bg-white hover:text-blue-500'>Home</Link>
        <Link to="/about" className='px-3 hover:bg-white hover:text-blue-500'>About</Link>
        <Link to="/blogs" className='px-3 hover:bg-white hover:text-blue-500'>Blogs</Link>
        <Link to="/join" className='px-3 hover:bg-white hover:text-blue-500'>Join</Link>
        <Link to="/contact" className='px-3 hover:bg-white hover:text-blue-500'>Contact</Link>
        <Link to="/support" className='px-3 hover:bg-white hover:text-blue-500'>Support</Link>
      </div>
      <div className='hidden md:flex'>
        <div className='flex px-4'>
          <div className='text-xl px-2'>
            <FaFacebook />
          </div>
          <div className='text-xl px-2'>
            <AiFillInstagram />
          </div>
          <div className='text-xl px-2'>
            <FaYoutube />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
