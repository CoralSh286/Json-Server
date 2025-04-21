import React from 'react'
import { IoAddOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import "./style.css"

// This component is used to display a CRUD bar with add, delete, and edit buttons
// It is used in the Post, Album, and Todo components

export default function CrudBar({editingFor, itemIdSelected, onAdd, onDelete, onEdit}) {
  return (
    <div className='hover-crud-bar'>
      <button 
        className='crud-button add-button' 
        title={`Add new ${editingFor}`}
        onClick={() => onAdd && onAdd()}
      >
        <IoAddOutline />
      </button>
      
      <button 
        className='crud-button delete-button' 
        title={`Delete ${editingFor}`}
        onClick={() => onDelete && onDelete(itemIdSelected)}
        disabled={!itemIdSelected}
      >
        <AiFillDelete />
      </button>
      
      <button 
        className='crud-button edit-button' 
        title={`Edit ${editingFor}`}
        onClick={() => onEdit && onEdit(itemIdSelected)}
        disabled={!itemIdSelected}
      >
        <MdModeEditOutline />
      </button>
    </div>
  )
}