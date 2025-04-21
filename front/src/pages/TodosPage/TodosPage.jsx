import React, { useEffect, useState } from 'react'
import { getTodos } from '../../service/requests'

export default function TodosPage() {
  const [todos, setTodos] = useState([])
  useEffect(() => { getData()}, [])
  const getData = async () => {
    const data = await getTodos()
    setTodos(data)
  }
  return (
    <>
    <div>
      <h1>todos</h1>
    {todos.map(todo => {
   return   <div key={todo.id}>
        <h2>{todo.title}</h2>
        <h2>{todo.id}</h2>
        <input type='checkbox' checked={todo.completed}/>
      </div>
})}
  
    </div>

    </>
  )
}
