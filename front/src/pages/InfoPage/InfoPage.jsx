import React, { useEffect, useState } from 'react'
import InfoCard from '../../components/InfoCard/InfoCard'
import "./style.css"

export default function InfoPage() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="info-page loading">Loading user information...</div>
  }

  if (!userData) {
    return <div className="info-page error">No user information available. Please log in.</div>
  }

  // Get initials for avatar
  const getInitials = () => {
    if (!userData.name) return '?';
    return userData.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Define sections for display
  const sections = [
    {
      title: 'Personal Information',
      data: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        website: userData.website,
      }
    },
    {
      title: 'Address',
      data: userData.address || {}
    },
    {
      title: 'Company',
      data: userData.company || {}
    }
  ];

  return (
    <div className="info-page">
      <h1 className="info-page__title">User Information</h1>
      
      <div className="info-card">
        <div className="info-card__header">
          <div className="info-card__avatar">
            {getInitials()}
          </div>
          <h2 className="info-card__name">{userData.name}</h2>
          <span className="info-card__username">@{userData.username}</span>
        </div>
        
        {/* Use a loop to render the sections */}
        {sections.map((section, index) => (
          <InfoCard 
            key={index}
            title={section.title}
            data={section.data}
          />
        ))}
      </div>
    </div>
  )
}