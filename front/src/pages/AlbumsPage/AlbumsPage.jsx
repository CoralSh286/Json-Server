import React, { useEffect, useState } from 'react'
import Album from '../../components/Album/Album'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { apiRequest, useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'
import PageHeader from '../../components/PageHeader/PageHeader'
import SearchBar from '../../components/SearchBar/SearchBar'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const userId = getUserId()
  const { data, loading, error } = useApiRequest({
    url: `/albums?userId=${userId}`, // הנתיב לקבלת אלבומים מה-API
    initialData: []
  });

  useEffect(() => {
    if (data) {
      setAlbums(data);
    }
  }, [data]);
  const searchQuery = async (form) => {
    const urlQuery = `/albums?userId=${userId}${form.title ? "&title=" + form.title : ""}${form.id ? "&id=" + form.id : ""}`
    const data = await apiRequest({ url: urlQuery })
    setAlbums(data)
  }
  return (
    <div className="albums-container">
      <PageHeader title={"Albums"} />
      <CrudBar editingFor={"albums"} />
      <SearchBar onSubmit={searchQuery} />
      <DisplayData error={error} loading={loading} data={albums}>
        <div className="albums-grid">
          {albums.map(album => (
            <Album key={album.id} {...album} />
          ))}
        </div>
      </DisplayData>
    </div>
  )
}