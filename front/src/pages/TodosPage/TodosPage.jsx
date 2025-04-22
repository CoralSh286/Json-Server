import React, { useEffect, useState } from 'react'
import Todo from '../../components/Todo/Todo'
import './style.css'
import CrudBar from '../../components/CrudBar/CrudBar'
import { apiRequest, useApiRequest } from '../../service/api'
import DisplayData from '../../components/DisplayData/DisplayData'
import { getUserId } from '../../helper/localStorageHelper'
import PageHeader from '../../components/PageHeader/PageHeader'
import SearchBar from '../../components/SearchBar/SearchBar'
import SortTodos from '../../components/SortTodos/SortTodos'

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null); // הסטייט של המשימה הנבחרת
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

  const searchQuery = async (form)=>{
    const urlQuery =  `/todos?userId=${userId}${form.title ? "&title=" + form.title : ""}${form.id ? "&id=" + form.id : ""}${form.isCompleat ? "&completed=" + form.isCompleat : ""}`
    const data = await apiRequest({url: urlQuery})
    setTodos(data)
  } 
  return (
    <div className="todos-container">
      <CrudBar editingFor={"todos"} selected={selectedTodo} />
      <PageHeader title={"Todo List"}  />
      <SortTodos setTodos={setTodos} todos={todos} />
       <SearchBar onSubmit={searchQuery} addCompleat={true} />
      <DisplayData error={error} loading={loading} data={todos}>
        <div className="todos-list">
          {todos.map(todo => (
            <Todo key={todo.id} {...todo} selected={selectedTodo} setSelected={setSelectedTodo} />
          ))}
        </div>
      </DisplayData>
    </div>
  )
}