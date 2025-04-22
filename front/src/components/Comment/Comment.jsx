import React from 'react' 
import "./style.css"

export default function Comment({name, body, email}) {
  return (
    <div className="comment">
      <div className="comment-header">
        <h3 className="comment-name">{name}</h3>
        <span className="comment-email">{email}</span>
      </div>
      <p className="comment-body">{body}</p>
    </div>
  )
}