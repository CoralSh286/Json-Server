import React, { useEffect, useState } from 'react'
import Todo from '../../components/Todo/Todo'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'
import PageHeader from '../../components/PageHeader/PageHeader'

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const userId = getUserId()
  const { data, loading, error } = useApiRequest({
    url: `/todos?userId=${userId}`, // הנתיב לקבלת משימות מה-API
    initialData: []
  });
  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);
  return (
    <div className="todos-container">
      <CrudBar editingFor={"todos"} />
      <PageHeader title={"Todo List"} />
      <DisplayData error={error} loading={loading} data={todos}>
        <div className="todos-list">
          {todos.map(todo => (
            <Todo key={todo.id} {...todo} />
          ))}
        </div>
      </DisplayData>
    </div>
  )
}