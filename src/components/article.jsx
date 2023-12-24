import React from 'react'
import { Link } from 'react-router-dom'
import image3 from '../images/image3.jpg'

function Article({title}) {
  return (
    <div className='my-5 mx-3 flex flex-col md:flex-row p-5 bg-white shadow-lg shadow-gray-300 hover:shadow-gray-500'>
      <div className='flex justify-center items-center'>
        <img src={image3} alt="Image" className='w-56 h-48 md:w-[90%] md:h-84' />
      </div>
      <div>
        <h1 className='px-5 py-3 text-center text-xl md:px-2'>{title}</h1>
        <p className='px-5 py-3 md:px-2 text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque a amet atque quas alias et laboriosam quae minima rerum ipsum? Natus neque ex cumque recusandae pariatur possimus iste vero veritatis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, laborum architecto nostrum qui sequi dolor magni repellendus laboriosam? Culpa reprehenderit eos eum repellat. Laboriosam dolorem saepe provident eaque earum expedita.</p>
        <div className='flex justify-between px-5 py-3 mb-3 text-sm md:px-2'>
            <p>Lin</p>
            <p>1hr ago</p>
        </div>
        <Link to="/blogs/singlepost" className='px-5 py-3 text-blue-500 hover:text-blue-700 rounded-full text-sm md:px-2'>Read More</Link>
      </div>
    </div>
  )
}

export default Article
