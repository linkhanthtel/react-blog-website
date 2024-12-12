import React from 'react'
import image2 from '../images/image2.jpg'
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function Sidebar({title}) {
  return (
    <div className='h-fit mx-4 hidden md:flex flex-col bg-white shadow-md rounded-lg p-6 my-4'>
      <h1 className='text-2xl font-semibold text-center border-b-2 border-gray-200 pb-3 mb-4'>{title}</h1>
      <img src={image2} alt="Sidebar" className='w-full h-60 object-cover rounded-md mb-4' />
      <div className='flex flex-col space-y-4'>
        <p className='text-gray-600 text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ipsa ad alias accusantium delectus eum ducimus, minus harum tempore consectetur culpa numquam eligendi nam totam tempora natus eius, adipisci debitis.
        </p>
        <ul className='space-y-2'>
          {['Lifestyle', 'Travel', 'Education'].map((item, index) => (
            <li key={index} className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200'>
              {item}
            </li>
          ))}
        </ul>
        <p className='text-center font-semibold text-gray-700'>Follow Us</p>
        <div className='flex justify-center space-x-4'>
          <FaFacebook className='text-4xl text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer' />
          <AiFillInstagram className='text-4xl text-pink-500 hover:text-pink-600 transition-colors duration-200 cursor-pointer' />
          <FaYoutube className='text-4xl text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar