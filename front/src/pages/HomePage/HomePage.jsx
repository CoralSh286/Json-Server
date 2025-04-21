import React from 'react'
import {  useNavigate } from 'react-router-dom'
export default function HomePage() {
  const nav = useNavigate()
  const LogoutHandler = () => {
    localStorage.removeItem('user')
    nav('/login')
  }
  return (
    <div>

      <button onClick={LogoutHandler}>Logout</button>
    </div>
  )
}
