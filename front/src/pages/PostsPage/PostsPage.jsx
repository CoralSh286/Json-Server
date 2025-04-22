import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'
import PageHeader from '../../components/PageHeader/PageHeader'
export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  
  const userId = getUserId()
  const { data, loading, error } = useApiRequest({
    url: `/posts?userId=${userId}`, // הנתיב לקבלת פוסטים מה-API
    initialData: []
  });

  // עדכון הסטייט בכל פעם שה-data משתנה
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <div className="posts-container">
     <PageHeader title={"Posts"} />
      <CrudBar editingFor={"posts"} />
        <DisplayData error={error} loading={loading} data={posts}>
          <div className="posts-grid">
            {posts.map(post => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </DisplayData>
    </div>
  )
}