import React from 'react'
import "./style.css"
import { apiRequest } from '../../service/api';
import FormInputs from '../FormInputs/FormInputs';
export default function EditorPopUp({ title, isNew, methodUrl, onClose, inputsValue , editingFor }) {
  const subTitle = isNew ? "Create" : "Edit"

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemId = inputsValue?.id ? `/${inputsValue.id}` : ''
    console.log("editingFor", editingFor);
    const formData = new FormData(e.target);

    apiRequest({
      url: editingFor + itemId,
      method: isNew ? "POST" : "PUT",
      data: Object.fromEntries(formData.entries())
    }).then((res) => {
      console.log("Response:", res);
    })
    onClose();
  };
  console.log("inputsValue", inputsValue);
  
  return (
    <div className="editor-popup-overlay">
      <div className="editor-popup">
        <div className="editor-popup-header">
          <h2 className="editor-popup-title">{subTitle + " " + title}</h2>
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
