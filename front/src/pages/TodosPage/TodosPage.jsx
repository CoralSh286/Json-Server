import React, { useEffect, useState } from 'react'
import { getTodos } from '../../service/requests'
import Todo from '../../components/Todo/Todo'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'

export default function TodosPage() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  useEffect(() => { 
    getData()
  }, [])
  
  const getData = async () => {
    try {
      setLoading(true)
      const data = await getTodos()
      setTodos(data)
    } catch (error) {
      console.error("Error fetching todos:", error)
    } finally {
      setLoading(false)
    }
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
      <CrudBar editingFor={"todos"}/>
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
      
      {loading ? (
        <div className="todos-loading">
          <div className="todos-loading-spinner"></div>
        </div>
      ) : (
        <>
          {filteredTodos.length > 0 ? (
            <div className="todos-list">
              {filteredTodos.map(todo => (
                <Todo key={todo.id} {...todo} />
              ))}
            </div>
          ) : (
            <div className="todos-empty">
              {filter === 'all' 
                ? "No todos found. Add some tasks to get started!" 
                : filter === 'active' 
                  ? "No active tasks. Great job!" 
                  : "No completed tasks yet. Complete some tasks to see them here!"}
            </div>
          )}
        </>
      )}
    </div>
  )
}