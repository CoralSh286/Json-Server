import React from 'react'
import "./style.css"
import { apiRequest } from '../../service/api';
import FormInputs from '../FormInputs/FormInputs';
export default function EditorPopUp({  isNew, onClose, inputsValue , editingFor,additionalData={} }) {
  const subTitle = isNew ? "Create" : "Edit"

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemId = inputsValue?.id ? `/${inputsValue.id}` : '';
    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      formEntries[checkbox.name] = checkbox.checked;
    });
    
    
    apiRequest({
      url: "/"+editingFor + itemId,
      method: isNew ? "post" : "put",
      body: {...formEntries, ...additionalData}
    }).then((res) => {
    });
    
    onClose();
  };
  
  return (
    <div className="editor-popup-overlay">
      <div className="editor-popup">
        <div className="editor-popup-header">
          <h2 className="editor-popup-title">{subTitle + " " + editingFor}</h2>
          <button
            type="button"
            className="editor-popup-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="editor-popup-content">
          <form onSubmit={handleSubmit}>
           <FormInputs editingFor={editingFor} isNew={isNew} inputsValue={inputsValue} />

            <div className="editor-popup-actions">
              <button
                type="button"
                className="editor-popup-button cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="editor-popup-button submit"
              >
                {subTitle}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
function editorValues({ editingFor, isNew, }) {
  switch (editingFor) {
    case "posts":
      return {
        children: <></>,
        methodUrl: "/posts",
      }
    case "albums":
      return {
        children: <></>,
        methodUrl: "/posts",
      }
    case "todos":
      return {
        children: <></>,
        methodUrl: "/posts",
      }
    default:
      return <></>
  }
}
