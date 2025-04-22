// usePopup.jsx
import React, { createContext, useState, useContext } from 'react';
import "./style.css"
// יצירת קונטקסט
const PopupContext = createContext(null);

// פרובידר הקונטקסט
export const PopupProvider = ({ children }) => {
  // האם הפופאפ מוצג
  const [isOpen, setIsOpen] = useState(false);
  
  // תוכן הפופאפ - יכול להיות כל קומפוננטה
  const [content, setContent] = useState(null);
  
  // כותרת הפופאפ (אופציונלי)
  const [title, setTitle] = useState('');
  
  // האם לסגור בלחיצה מחוץ לפופאפ
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(true);
  
  
  // גודל הפופאפ
  const [size, setSize] = useState('medium'); // 'small', 'medium', 'large', 'fullscreen'

  // פתיחת פופאפ
  const openPopup = ({
    content,
    title = '',

    closeOnOutsideClick = true,

  }) => {
    setContent(content);
    setTitle(title);
    setCloseOnOutsideClick(closeOnOutsideClick);
    setIsOpen(true);
  };

  // סגירת פופאפ
  const closePopup = () => {
    setIsOpen(false);
    // ניקוי התוכן לאחר סגירת הפופאפ ואנימציית הסגירה
    setTimeout(() => {
      setContent(null);
    }, 300);
  };

  // טיפול בלחיצה מחוץ לפופאפ
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  // הערך שיסופק למשתמשים בקונטקסט
  const value = {
    isOpen,
    content,
    title,
    openPopup,
    closePopup
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
      {isOpen && (
        <div 
          className={`popup-overlay center`} 
          onClick={handleOutsideClick}
        >
          <div 
            className={`popup-container`}>
            <div className="popup-content">
              {content}
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

// הוק מותאם לשימוש בקונטקסט
export const usePopup = () => {
  const context = useContext(PopupContext);
  
  if (!context) {
    throw new Error('usePopup חייב להיות בתוך PopupProvider');
  }
  
  return context;
};