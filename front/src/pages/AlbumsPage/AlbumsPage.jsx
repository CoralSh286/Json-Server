import React, { useEffect, useState } from 'react'
import { getAlbums } from '../../service/requests'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  useEffect(() => { getData()}, [])
  const getData = async () => {
    const data = await getAlbums()
    setAlbums(data)
  }
  return (
    <div>
<h1>albums</h1>
<div>
    {albums.map(album => {
   return   <div key={album.id}>
        <h2>{album.title}</h2>
        <h2>{album.id}</h2>
      </div>
})}
  
    </div>
    </div>
  )
}
