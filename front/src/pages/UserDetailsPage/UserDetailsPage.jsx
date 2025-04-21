import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import './style.css' // Import the CSS file

export default function UserDetailsPage({ username , password }) {
  const [user, setUser] = useState({

    username: username,
    website: password,
    email: "",
    name:  '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: null,
        lng: null
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });

  const handleChange = (e, field, nestedField = null, deepNestedField = null) => {
    if (deepNestedField) {
      setUser({
        ...user,
        [field]: {
          ...user[field],
          [nestedField]: {
            ...user[field][nestedField],
            [deepNestedField]: e.target.value
          }
        }
      });
    } else if (nestedField) {
      setUser({
        ...user,
        [field]: {
          ...user[field],
          [nestedField]: e.target.value
        }
      });
    } else {
      setUser({
        ...user,
        [field]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await registerUser(user);
      console.log('User registered successfully:', res);
      // Add success handling here
    } catch (error) {
      console.error('Error registering user:', error);
      // Add error handling here
    }
  };

  return (
    <div className="user-details-container">
      <h1 className="user-details-title">User Details</h1>
      
      <form onSubmit={handleSubmit} className="user-details-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="name" 
                placeholder="Enter your name" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'name')}
                name="name"
              />
            </div>
            <div className="input-group">
              <Input 
                label="Phone" 
                placeholder="Enter your phone number" 
                typeProp="tel" 
                onChange={(e) => handleChange(e, 'phone')}
                name="phone"
              />
            </div>
            <div className="input-full">
              <Input 
                label="Email" 
                placeholder="Enter your email" 
                typeProp="tel" 
                onChange={(e) => handleChange(e, 'email')}
                name="email"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="form-section">
          <h2 className="section-title">Address Information</h2>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="Street" 
                placeholder="Enter street name" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'address', 'street')}
                name="street"
              />
            </div>
            <div className="input-group">
              <Input 
                label="Suite/Apt" 
                placeholder="Enter apartment or suite" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'address', 'suite')}
                name="suite"
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="City" 
                placeholder="Enter city" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'address', 'city')}
                name="city"
              />
            </div>
            <div className="input-group">
              <Input 
                label="Zipcode" 
                placeholder="Enter zipcode" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'address', 'zipcode')}
                name="zipcode"
              />
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="form-section">
          <h2 className="section-title">Company Information</h2>
          <div className="input-row">
            <div className="input-group">
              <Input 
                label="Company Name" 
                placeholder="Enter company name" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'company', 'name')}
                name="companyName"
              />
            </div>
            <div className="input-group">
              <Input 
                label="Catch Phrase" 
                placeholder="Enter company catch phrase" 
                typeProp="text" 
                onChange={(e) => handleChange(e, 'company', 'catchPhrase')}
                name="catchPhrase"
              />
            </div>
          </div>
  
        </div>

        {/* Submit Button */}
        <div className="form-footer">
          <button 
            type="submit" 
            className="submit-button"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}