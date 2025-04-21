import React, { useEffect, useState } from 'react'
import { getAlbums } from '../../service/requests'
import Album from '../../components/Album/Album'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    try {
      setLoading(true)
      const data = await getAlbums()
      setAlbums(data)
    } catch (error) {
      console.error("Error fetching albums:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter albums based on search term
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="albums-container">
      <header className="albums-header">
        <h1 className="albums-title">Albums</h1>
           <CrudBar editingFor={"albums"}/>
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
      
      {loading ? (
        <div className="albums-loading">
          <div className="albums-loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="albums-count">
            {filteredAlbums.length === 0 ? (
              <p>No albums found matching "{searchTerm}"</p>
            ) : searchTerm ? (
              <p>Found {filteredAlbums.length} album{filteredAlbums.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
            ) : (
              <p>Showing all {filteredAlbums.length} album{filteredAlbums.length !== 1 ? 's' : ''}</p>
            )}
          </div>
          
          {filteredAlbums.length > 0 ? (
            <div className="albums-grid">
              {filteredAlbums.map(album => (
                <Album key={album.id} {...album} />
              ))}
            </div>
          ) : (
            <div className="albums-empty">
              {searchTerm ? (
                <p>No albums found. Try a different search term.</p>
              ) : (
                <p>No albums available. Check back later.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}