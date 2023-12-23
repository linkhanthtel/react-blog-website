import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import image4 from '../images/image4.jpg'

function SinglePost() {
  return (
    <div className='my-5'>
      <div className='flex justify-center items-center'>
        <img src={image4} alt="Image" className='w-[80%] h-90' />
      </div>
      <h1 className='my-5 text-3xl font-bold text-center'>Title</h1>
      <div className='my-5 flex justify-around'>
        <p>Lin, 1 hr ago</p>
        <div className='flex'>
            <FaRegEdit className='mr-5 text-xl'/>
            <MdDelete className='text-xl' />
        </div>
      </div>
      <div className='px-5 flex justify-center'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti inventore placeat incidunt facere animi! Perspiciatis omnis veniam porro eligendi vitae provident obcaecati, velit dicta quae. Eum quaerat fugit reiciendis similique! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam molestiae repellat delectus, et unde fugiat? Corrupti, enim sunt nostrum aspernatur quo placeat ipsa labore eligendi neque, provident minus quod aperiam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, tenetur. Ex asperiores, illo dolorem est ipsam quasi culpa omnis voluptate esse quidem deleniti doloribus suscipit iusto, dolores corporis quis at.</p>
      </div>
    </div>
  )
}

export default SinglePost
