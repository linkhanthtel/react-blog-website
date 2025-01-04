import React from 'react'
import Article from './article'
import SinglePost from '../pages/singlepost'

function Post() {
  return (
    <div className='my-2 mx-2'>
      <h1 className='text-center text-3xl my-3'>Posts</h1>
      <div>
        <Article title={"Top 10 Trips for 2024"} author={"Lin"} publishedAt={"Dec 2024"} />
        <Article title={"Things you should know before 30"} author={"David"} publishedAt={"Dec 2024"} />
        <Article title={"Tips to buy hats"} author={"Khant"} publishedAt={"Dec 2024"} />
        <Article title={"Popular places in Africa"} author={"Lin"} publishedAt={"Dec 2024"} />
        <Article title={"How to plan a budget trip"} author={"David"} publishedAt={"Dec 2024"} />
      </div>
    </div>
  )
}

export default Post
