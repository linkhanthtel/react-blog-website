import React from 'react'
import Sidebar from '../components/sidebar'
import ArticleCard from '../components/articlecard'

const Blogs = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='w-100 md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
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
