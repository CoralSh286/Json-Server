import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import jsonLogo from '../../assets/images/json-image.png'; // Update with correct path to logo
import './style.css'

export default function Header() {
    const nav = useNavigate()
    const LogoutHandler = () => {
      localStorage.removeItem('user')
      nav('/login')
    }

    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : 'Guest'
    
    return (
        <header className="header">
            <div className="header__logo">
                <img src={jsonLogo} alt="JSON Placeholder Logo" />
            </div>
            
            <div className="header__user-info">
                <FaUserAlt />
                <span className="header__user-name">{username}</span>    
            </div>
            
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item"><Link to="/home">Home</Link></li> 
                    <li className="header__nav-item"><Link to="albums">Albums</Link></li>
                    <li className="header__nav-item"><Link to="posts">Posts</Link></li>
                    <li className="header__nav-item"><Link to="todos">Todos</Link></li>
                    <li className="header__nav-item"><Link to="info">Info</Link></li>
                </ul>
                <button className="header__logout-btn" onClick={LogoutHandler}>Logout</button>
            </nav>
        </header>
    )
}