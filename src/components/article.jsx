import React from 'react'
import { Link } from 'react-router-dom'
import image3 from '../images/image3.jpg'

function Article({title}) {
  return (
    <div className='my-8 mx-auto max-w-4xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex justify-center items-center md:w-2/5'>
          <img src={image3} alt="Article" className='w-full h-64 md:h-full object-cover' />
        </div>
        <div className='md:w-3/5 p-6'>
          <h1 className='text-2xl font-semibold mb-4 text-gray-800'>{title}</h1>
          <p className='text-gray-600 mb-4 line-clamp-3'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque a amet atque quas alias et laboriosam quae minima rerum ipsum? Natus neque ex cumque recusandae pariatur possimus iste vero veritatis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, laborum architecto nostrum qui sequi dolor magni repellendus laboriosam? Culpa reprehenderit eos eum repellat. Laboriosam dolorem saepe provident eaque earum expedita.
          </p>
          <div className='flex justify-between items-center text-sm text-gray-500 mb-4'>
            <p>Lin</p>
            <p>1hr ago</p>
          </div>
          <Link 
            to="/blogs/singlepost" 
            className='text-blue-600 hover:text-blue-800 transition-colors duration-300'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Article