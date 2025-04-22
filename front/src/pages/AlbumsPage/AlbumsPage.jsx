import React, { useEffect, useState } from 'react'
import Album from '../../components/Album/Album'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'
import PageHeader from '../../components/PageHeader/PageHeader'

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

  return (
    <div className="albums-container">
      <PageHeader title={"Albums"} />
      <CrudBar editingFor={"albums"} />
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