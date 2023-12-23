import React from 'react'
import Article from './article'
import SinglePost from '../pages/singlepost'

function Post() {
  return (
    <div className='border-2 w-[100%] md:w-[75%] my-2 mx-2'>
      <h1 className='text-center text-3xl my-3'>Posts</h1>
      <div>
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  )
}

export default Post
