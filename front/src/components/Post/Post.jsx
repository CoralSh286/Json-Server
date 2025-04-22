import React, { useState } from 'react'
import "./style.css"

export default function Post({id, title, body , selected, setSelected}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onSelectPost = () => {
    if(selected?.id == id) setSelected(null); // אם כבר נבחר, אל תעשה כלום
    else
    setSelected({id , title , body});
  }

  return (
    <div  className={`post-card${selected?.id == id ? ' selected' : ''}`} onClick={onSelectPost}>
      <div className="post-card__header">
        <h2 className="post-card__title">{title}</h2>
        <span className="post-card__id">#{id}</span>
      </div>
      
      <button 
        className={`post-card__toggle ${isExpanded ? 'expanded' : ''}`} 
        onClick={toggleExpand}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
      
      <div className={`post-card__body ${isExpanded ? 'expanded' : ''}`}>
        <p>{body}</p>
      </div>
    </div>
  )
}