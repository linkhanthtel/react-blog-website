import React from 'react'
import Article from './article'
import SinglePost from '../pages/singlepost'

function Post() {
  return (
    <div className='my-2 mx-2'>
      <h1 className='text-center text-3xl my-3'>Posts</h1>
      <div>
        <Article title={"Top 10 Trips for 2024"} />
        <Article title={"Things you should know before 30"} />
        <Article title={"Tips to buy hats"} />
        <Article title={"Popular places in Africa"} />
        <Article title={"How to plan a budget trip"} />
      </div>
    </div>
  )
}

export default Post
