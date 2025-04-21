import React, { useState } from 'react';
import './style.css';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    // Username validation
    if (!formData.username.trim()) {
      tempErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      tempErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Invalid email format';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (validateForm()) {
      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success - in a real app, this would be your API registration call
        setIsRegistered(true);
        
      } catch (err) {
        setGeneralError('Registration failed. Please try again.');
        console.error('Registration error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoginRedirect = () => {
    // In a real app, this would redirect to login page
    alert('Redirecting to login page...');
  };

  if (isRegistered) {
    return (
      <div className="register-success">
        <h2>Registration Successful!</h2>
        <p>Your account has been created.</p>
        <button onClick={handleLoginRedirect} className="login-redirect-button">
          Proceed to Login
        </button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h1>Create Account</h1>
      {generalError && <div className="error-message">{generalError}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <Input
          name="username"
          label="Username"
          typeProp="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.username}
        />
        
        <Input
          name="email"
          label="Email"
          typeProp="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.email}
        />
        
        <Input
          name="password"
          label="Password"
          typeProp="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.password}
        />
        
        <Input
          name="confirmPassword"
          label="Confirm Password"
          typeProp="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          isDisabled={isLoading}
          error={errors.confirmPassword}
        />
        
        <button
          type="submit"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <div className="login-link">
        Already have an account? <Link to={"/"}>Login</Link>
      </div>
    </div>
  );
}