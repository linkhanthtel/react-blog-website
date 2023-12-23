import React from 'react'
import image5 from '../images/image5.jpg'

const Join = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={image5} alt="Image" className='hidden md:flex h-96 w-full' />
      <form className='flex flex-col p-5 w-screen md:w-[60%]'>
        <h1 className='text-3xl text-center'>Create Your Post</h1>
        <input type="text" placeholder='Name...' className='p-2 my-5 border-2 border-gray-500' />
        <input type="text" placeholder='Category' className='p-2 my-5 border-2 border-gray-500' />
        <textarea cols="30" rows="10" placeholder='Your Articles' className='p-2 my-5 border-2 border-gray-500'></textarea>
        <input type="submit" value="Publish" className='p-3 bg-gray-200 hover:bg-gray-300' />
      </form>
    </div>
  )
}

export default Join
