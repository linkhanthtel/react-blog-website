import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className='relative bg-blue-500 text-white flex flex-col'>
        <div className='py-10 pl-20 grid grid-cols-1 md:grid-cols-3'>
        <div className='flex flex-col'>
            <Link to="/join" className='py-2'>Learn More</Link>
            <Link to="/blogs" className='py-2'>Blogs</Link>
            <Link to="/join" className='py-2'>Join the Community</Link>
        </div>
        <div className='flex flex-col'>
            <Link to="/" className='py-2'>Popular Destinations</Link>
            <Link to="/contact" className='py-2'>Contact</Link>
            <Link to="/contact" className='py-2'>Support</Link>
        </div>
        <div className='flex flex-col'>
            <h1 className='pb-5'>Follow Us</h1>
            <div className='flex'>
                <FaFacebook className='mx-4 text-3xl' />
                <AiFillInstagram className='mx-4 text-3xl' />
                <FaYoutube className='mx-4 text-3xl' />
            </div>
        </div>
        </div>
        <div className='text-center p-4'>
            <p>© Copyrights 2024 | All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer
