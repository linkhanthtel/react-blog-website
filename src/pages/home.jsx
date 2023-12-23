import React from 'react'
import image4 from '../images/image4.jpg'
import Sidebar from '../components/sidebar'
import Post from '../components/post'

function Home() {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='absolute top-30 font-serif text-center text-white text-xl md:text-3xl hover:animate-bounce'>React Blog Website</h1>
        <img src={image4} alt="Image" className='h-72 w-[100%] object-cover' />
      </div>
      <div className='flex justify-between'>
        <Post />
        <Sidebar title={"Trending"} />
      </div>
    </div>
  )
}

export default Home
