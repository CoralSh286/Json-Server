import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

export default function Album({title, id}) {
  // Generate a random pastel color for the album thumbnail
  const getBackgroundColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  // Get first letter of the title for the thumbnail
  const getThumbnailLetter = () => {
    return title && title.length > 0 ? title[0].toUpperCase() : 'A';
  };

  return (
    <div className="album-card">
      <div 
        className="album-card__thumbnail" 
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <span className="album-card__thumbnail-letter">{getThumbnailLetter()}</span>
      </div>
      
      <div className="album-card__content">
        <h2 className="album-card__title">{title}</h2>
        <span className="album-card__id">Album #{id}</span>
        
        <Link to={`${id}/photos`} className="album-card__link">
          View Album
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}