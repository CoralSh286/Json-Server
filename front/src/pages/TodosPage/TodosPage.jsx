import React, { useEffect, useState } from 'react'
import { getTodos } from '../../service/requests'
import Todo from '../../components/Todo/Todo'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const userId = getUserId()
  const { data, loading, error, fetchData } = useApiRequest({
    url: `/todos?userId=${userId}`, // הנתיב לקבלת משימות מה-API
    initialData: []
  });

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  if (error) {
    return <div>שגיאה בטעינת נתונים: {error.message}</div>;
  }

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Get stats for summary
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="todos-container">
      <CrudBar editingFor={"todos"} />
      <header className="todos-header">
        <h1 className="todos-title">Todo List</h1>

        <div className="todos-filters">
          <button
            className={`todos-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`todos-filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`todos-filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </header>

      <div className="todos-summary">
        <span>{completedCount} of {totalCount} tasks completed</span>
        <div className="todos-progress">
          <div
            className="todos-progress-bar"
            style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      <DisplayData error={error} loading={loading} data={todos}>
        <div className="todos-list">
          {filteredTodos.map(todo => (
            <Todo key={todo.id} {...todo} />
          ))}
        </div>
      </DisplayData>
    </div>
  )
}