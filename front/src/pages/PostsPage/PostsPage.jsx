import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { apiRequest, useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'
import PageHeader from '../../components/PageHeader/PageHeader'
import SearchBar from '../../components/SearchBar/SearchBar'
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
  const searchQuery = async (form)=>{
    console.log(form)
    const urlQuery =  `/posts?userId=${userId}${form.title ? "&title=" + form.title : ""}${form.id ? "&id=" + form.id : ""}`
    const data = await apiRequest({url: urlQuery})
    setPosts(data)
  } 
  return (
    <div className="posts-container">
     <PageHeader title={"Posts"} />
      <CrudBar editingFor={"posts"} />
      <SearchBar onSubmit={searchQuery} />
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