import React, { useState } from 'react'
import "./style.css"

export default function Todo({ title, id, completed }) {
  const [isChecked, setIsChecked] = useState(completed);
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
    // Here you could add API call to update the todo status
  };

  return (
    <div className={`todo-card ${isChecked ? 'completed' : ''}`}>
      <div className="todo-card__content">
        <div className="todo-card__checkbox-container">
          <input 
            type="checkbox" 
            id={`todo-${id}`} 
            className="todo-card__checkbox"
            checked={isChecked}
            onChange={handleToggle}
          />
          <label htmlFor={`todo-${id}`} className="todo-card__checkbox-label"></label>
        </div>
        
        <div className="todo-card__details">
          <h3 className="todo-card__title">{title}</h3>
          <span className="todo-card__id">#{id}</span>
        </div>
      </div>
    </div>
  )
}