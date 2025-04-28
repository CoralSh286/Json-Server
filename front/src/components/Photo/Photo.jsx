import React from 'react'
import "./style.css"

export default function Photo({title, url, thumbnailUrl}) {
  return (
    <div className="photo-card">
      <div className="photo-info">  
        <h3 className="photo-title">{title}</h3>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="photo-link"
        >
          View Full Image
        </a>
      </div>
    </div>
  )
}