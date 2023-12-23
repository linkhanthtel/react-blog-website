import React from 'react'
import image6 from '../images/image6.jpg'
import { Link } from 'react-router-dom'

function ArticleCard() {
  return (
    <div>
        <div className='p-2 my-5 mx-3 bg-white shadow-lg rounded-lg shadow-gray-400 hover:shadow-gray-600 flex items-center flex-col'>
            <img src={image6} alt="Image" className='w-80 h-72' />
            <h1 className='text-3xl my-3'>Title</h1>
            <p className='my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, id! Rem perferendis ipsam harum. Autem animi porro cupiditate inventore minima, odit facere adipisci alias doloremque consectetur velit provident iste. Sunt? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore enim ut odit molestias doloribus ratione dolorum possimus ipsum dolor sed, amet minus iste odio doloremque quaerat cumque deserunt facere quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quos soluta consequatur corporis eveniet veritatis, minima est temporibus vel optio, doloremque fugit! Est, harum nihil autem minima deleniti porro ea.</p>
            <Link to="/blogs/singlepost">Read More</Link>
          </div>
    </div>
  )
}

export default ArticleCard
