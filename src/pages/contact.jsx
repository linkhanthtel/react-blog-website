import React from 'react'
import image2 from '../images/image2.jpg'

const Contact = () => {
  return (
    <div className='flex flex-col'>
      <div className='bg-white p-10 border-b-2 border-black'>
        <h1 className='text-center text-3xl my-5'>About Us</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut distinctio ullam quae tempore totam illum dolorem in amet tempora officiis rerum tenetur voluptas at, id laboriosam. Cum expedita labore quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quos et, laborum iure provident quisquam architecto eaque sunt repellendus cumque explicabo perspiciatis possimus ut placeat distinctio temporibus corrupti id. Deleniti! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit tempora officia voluptatem eligendi aut recusandae voluptas, debitis id dolores molestias nesciunt nostrum saepe eveniet, eum doloribus laborum dolor? Officiis, ipsum! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto placeat unde harum aliquid, nam labore distinctio perferendis ducimus quam illum sint a enim fugit quidem officia minus sit qui ab!</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <form className='flex flex-col my-3 p-3'>
            <h1 className='my-4 text-xl text-center'>Contact Us</h1>
            <input type="text" placeholder='Name' className='my-3 p-2 border-2 border-black' />
            <input type="number" placeholder='Contact Number' className='my-3 p-2 border-2 border-black' />
            <textarea cols="30" rows="5" placeholder='Your Message' className='my-3 p-2 border-2 border-black'></textarea>
            <div className='flex justify-center items-center'>
              <input type="submit" value="Submit" className='p-3 bg-blue-600 text-white' />
            </div>
          </form>
        </div>
        <div className='p-2'>
            <img src={image2} alt="Image" />
        </div>
      </div>
    </div>
  )
}

export default Contact
