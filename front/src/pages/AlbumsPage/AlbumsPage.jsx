import React, { useEffect, useState } from 'react'
import { getAlbums } from '../../service/requests'
import Album from '../../components/Album/Album'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = getUserId()
  const { data, loading, error, fetchData } = useApiRequest({
    url: `/albums?userId=${userId}`, // הנתיב לקבלת אלבומים מה-API
    initialData: []
  });

  useEffect(() => {
    if (data) {
      setAlbums(data);
    }
  }, [data]);



  // פילטור אלבומים לפי מונח חיפוש
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="albums-container">
      <header className="albums-header">
        <h1 className="albums-title">Albums</h1>
        <CrudBar editingFor={"albums"} />
        <div className="albums-search">
          <input
            type="text"
            placeholder="Search albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="albums-search-input"
          />
          {searchTerm && (
            <button
              className="albums-search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </header>

      <DisplayData error={error} loading={loading} data={albums}>

        <div className="albums-grid">
          {filteredAlbums.map(album => (
            <Album key={album.id} {...album} />
          ))}
        </div>
      </DisplayData>
    </div>
  )
}