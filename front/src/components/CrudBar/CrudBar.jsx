import React from 'react'
import { IoAddOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import "./style.css"
import { usePopup } from '../../helper/UsePopUp/usePopUp';
import EditorPopUp from '../EditorPopUp/EditorPopUp';
import DeletePopUp from '../DeletePopUp/DeletePopUp';

// This component is used to display a CRUD bar with add, delete, and edit buttons
// It is used in the Post, Album, and Todo components



export default function CrudBar({editingFor, selected, onDelete , inputsValue}) {
  const { openPopup, closePopup } = usePopup();
 
  const openPopupForEdit = () => {
    openPopup({
      content: <EditorPopUp isNew={false} inputsValue={inputsValue}  onClose={closePopup} editingFor={editingFor} title={editingFor}/>, // אפשר להעביר כל קומפוננטה
    });
  
  };
  const openPopupForCreate = () => {
    openPopup({
      content: <EditorPopUp isNew={true}  onClose={closePopup} title={editingFor} editingFor={editingFor}/>, // אפשר להעביר כל קומפוננטה
    });
  
  };
  const openPopupForDelete = () => {

    openPopup({
      content: <DeletePopUp onDelete={onDelete} onClose={closePopup}/>, // אפשר להעביר כל קומפוננטה
      title: 'Delete',
    });
  };
  return (
    <div className='hover-crud-bar'>
      <button 
        className='crud-button add-button' 
        title={`Add new ${editingFor}`}
        onClick={() => openPopupForCreate()}
      >
        <IoAddOutline />
      </button>
      
      <button 
        className='crud-button delete-button' 
        title={`Delete ${editingFor}`}
        onClick={() => openPopupForDelete()}
        disabled={!selected}
      >
        <AiFillDelete />
      </button>
      
      <button 
        className='crud-button edit-button' 
        title={`Edit ${editingFor}`}
        onClick={() =>openPopupForEdit()}
        disabled={!selected}
      >
        <MdModeEditOutline />
      </button>
    </div>
  )
}