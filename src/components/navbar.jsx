import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

function Navbar() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className='fixed w-full py-4 bg-blue-500 text-white flex justify-around'>
      <div>
        <Link to="/">WanderLuxe Ventures</Link>
      </div>

      <div className='hidden md:flex'>
        <Link to="/" className='px-3 hover:bg-white hover:text-blue-500'>Home</Link>
        <Link to="/blogs" className='px-3 hover:bg-white hover:text-blue-500'>Blogs</Link>
        <Link to="/join" className='px-3 hover:bg-white hover:text-blue-500'>Join</Link>
        <Link to="/contact" className='px-3 hover:bg-white hover:text-blue-500'>Contact</Link>
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

      <div className='flex md:hidden'>
        <button onClick={() => setDropDown(prev => !prev)}>Button</button>
      </div>

      {dropDown ? (
          <div className='z-10 absolute mt-20 w-full h-full flex flex-col px-7 py-7 bg-green-400 text-center'>
            <button onClick={() => setDropDown(prev => !prev)}>Button</button>
            <Link>Home</Link>
            <Link>Blogs</Link>
            <Link>Join</Link>
            <Link>Contact</Link>
          </div>
      ) : (<span></span>)
      }


    </div>
  )
}

export default Navbar
