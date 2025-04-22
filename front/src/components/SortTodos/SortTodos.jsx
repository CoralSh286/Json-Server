import React, { useState } from 'react'
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import "./style.css"

export default function SortTodos({ setTodos, todos }) {
  const [activeSort, setActiveSort] = useState(null);
  const [alphaSortAsc, setAlphaSortAsc] = useState(true);
  const [numericSortAsc, setNumericSortAsc] = useState(true);

  const handleAlphaSort = () => {
    // אם כבר פעיל, החלף את הכיוון
    if (activeSort === 'alpha') {
      setAlphaSortAsc(!alphaSortAsc);
    } else {
      setActiveSort('alpha');
      setAlphaSortAsc(true);
    }

    // מיון לפי כותרת
    const sortedTodos = [...todos].sort((a, b) => {
      const direction = alphaSortAsc ? 1 : -1;
      return direction * a.title.localeCompare(b.title);
    });

    setTodos(sortedTodos);
  };

  const handleNumericSort = () => {
    // אם כבר פעיל, החלף את הכיוון
    if (activeSort === 'numeric') {
      setNumericSortAsc(!numericSortAsc);
    } else {
      setActiveSort('numeric');
      setNumericSortAsc(true);
    }

    // מיון לפי מזהה
    const sortedTodos = [...todos].sort((a, b) => {
      const direction = numericSortAsc ? 1 : -1;
      return direction * (a.id - b.id);
    });

    setTodos(sortedTodos);
  };

  const handleCompletionSort = () => {
    setActiveSort('completion');

    // מיון לפי סטטוס השלמה (המשימות המושלמות קודם)
    const sortedTodos = [...todos].sort((a, b) => {
      return b.completed - a.completed;
    });

    setTodos(sortedTodos);
  };

  return (
    <div className="sort-todos-container">
      <button 
        className={`sort-button ${activeSort === 'alpha' ? 'active' : ''}`} 
        onClick={handleAlphaSort}
        aria-label="מיון אלפביתי"
      >
        {alphaSortAsc ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
      </button>
      
      <button 
        className={`sort-button ${activeSort === 'numeric' ? 'active' : ''}`} 
        onClick={handleNumericSort}
        aria-label="מיון מספרי"
      >
        {numericSortAsc ? <FaSortNumericDown /> : <FaSortNumericUp />}
      </button>
      
      <button 
        className={`sort-button ${activeSort === 'completion' ? 'active' : ''}`} 
        onClick={handleCompletionSort}
        aria-label="מיון לפי מצב השלמה"
      >
        <IoMdDoneAll />
      </button>
    </div>
  );
}