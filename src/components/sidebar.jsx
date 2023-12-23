import React from 'react'
import image2 from '../images/image2.jpg'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

function Sidebar({title}) {
  return (
    <div className='w-[25%] h-fit mx-4 hidden md:flex flex-col border-2 p-3 my-4'>
      <h1 className='text-xl text-center border-b-2 border-black'>{title}</h1>
      <img src={image2} alt="Image" className='w-50 h-60 py-5 object-contain' />
      <div className='flex flex-col'>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ipsa ad alias accusantium delectus eum ducimus, minus harum tempore consectetur culpa numquam eligendi nam totam tempora natus eius, adipisci debitis.</p>
        <ul className='py-4'>
            <li>Lifestyle</li>
            <li>Travel</li>
            <li>Education</li>
        </ul>
        <p className='text-center'>Follow Us</p>
        <div className='flex justify-center'>
            <FaFacebook className='text-5xl px-2 text-blue-700' />
            <AiFillInstagram className='text-5xl px-2 text-purple-400' />
            <FaYoutube className='text-5xl px-2 text-red-500' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
