import React from 'react'
import "./style.css"

export default function Photo({title, url, thumbnailUrl}) {
  return (
    <div className="photo-card">
      <div className="photo-info">  
        <h3 className="photo-title">{title}</h3>
        <img src={thumbnailUrl} alt="" />
      </div>
    </div>
  )
}