import React from 'react'
import image5 from '../images/image5.jpg'
import image1 from "../images/image1.jpg"

const Join = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={image5} alt="Image" className='hidden md:flex h-96 w-full' />
      <div className='py-7 w-full border-b text-center'>
        <h1 className='text-3xl my-3'>Join our community</h1>
        <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta consectetur corrupti quas alias tenetur perspiciatis, inventore magni labore eum! Officia officiis velit dolores harum excepturi. Blanditiis esse voluptatem veniam similique! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, neque quas aspernatur provident sint repellendus repudiandae quasi eius, rerum dignissimos, itaque magnam laudantium voluptas sed illum recusandae perspiciatis? Mollitia, non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sapiente eum quasi assumenda molestiae dolores velit minima. Veniam iste consectetur, quas ipsum voluptatem pariatur repellat optio a repellendus repudiandae mollitia? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione delectus reiciendis exercitationem esse! Nostrum architecto dolores eveniet dicta beatae iste aliquid, adipisci iure perferendis quae libero! Nam laudantium vel adipisci?</p>
      </div>
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
