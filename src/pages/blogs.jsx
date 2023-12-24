import React from 'react'
import Sidebar from '../components/sidebar'
import ArticleCard from '../components/articlecard'

const Blogs = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='w-100 md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
          <ArticleCard title={"Popular Destination"} />
          <ArticleCard title={"Healthy Diet for Vegetarian"} />
          <ArticleCard title={"Tips for purchasing smartphones"} />
          <ArticleCard title={"Famous places in Asia"} />
          <ArticleCard title={"How to make a delicious curry"} />
          <ArticleCard title={"Things you should know before 30"} />
        </div>
        <div className='w-1/4'>
          <Sidebar title={"Popular Destinations"} />
          <Sidebar title={"Shopping"} />
        </div>
      </div>
    </div>
  )
}

export default Blogs
