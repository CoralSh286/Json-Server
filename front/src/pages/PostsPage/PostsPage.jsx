import React, { useEffect, useState } from 'react'
import { getPosts } from '../../service/requests'
import Post from '../../components/Post/Post'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { 
    getData()
  }, [])
  
  const getData = async () => {
    try {
      setLoading(true)
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="posts-container">
      <h1 className="posts-title">Posts</h1>
      <CrudBar editingFor={"posts"}/>
      {loading ? (
        <div className="posts-loading">
          <div className="posts-loading-spinner"></div>
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            <div className="posts-grid">
              {posts.map(post => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="posts-empty">
              No posts found. Check back later.
            </div>
          )}
        </>
      )}
    </div>
  )
}