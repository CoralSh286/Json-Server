import React, { useEffect, useState } from 'react'
import { getPosts } from '../../service/requests'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  useEffect(() => { getData()}, [])
  const getData = async () => {
    const data = await getPosts()
    setPosts(data)
  }
  return (
    <div>
      <h1>posts</h1>
    {posts.map(post => {
   return   <div key={post.id}>
        <h2>{post.title}</h2>
        <h2>{post.id}</h2>
      </div>
})}
  
    </div>
  )
}
