import React from 'react'
import image4 from '../images/image4.jpg'
import Sidebar from '../components/sidebar'
import Post from '../components/post'

function Home() {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='absolute top-30 font-serif text-center text-white text-xl md:text-3xl hover:animate-bounce'>Welcome to WanderLuxe Ventures</h1>
        <img src={image4} alt="Image" className='h-72 w-[100%] object-cover' />
      </div>
      <div className='flex justify-around'>
        <div className='w-100 md:w-3/4'>
          <Post />
        </div>
        <div className='w-1/4'>
          <Sidebar title={"Trending"} />
          <Sidebar title={"Best places to chill"} />
        </div>
      </div>
    </div>
  )
}

export default Home
