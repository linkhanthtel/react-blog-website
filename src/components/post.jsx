import React from 'react'
import Article from './article'
import { usePosts } from '../context/postsContext'
import { getImageUrl } from '../utils/imageUtils'

function Post() {
  const { posts, loading } = usePosts()

  // Show only first 5 posts for the home page
  const displayPosts = posts.slice(0, 5)

  return (
    <div className='my-2 mx-2'>
      <h1 className='text-center text-3xl my-3'>Latest Posts</h1>
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      ) : displayPosts.length > 0 ? (
        <div>
          {displayPosts.map((post) => (
            <Article 
              key={post.id}
              id={post.id}
              title={post.title} 
              author={post.author} 
              publishedAt={new Date(post.created_at).toLocaleDateString()}
              image={getImageUrl(post.image, 400, 300)}
              content={post.content}
              description={post.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}

export default Post
