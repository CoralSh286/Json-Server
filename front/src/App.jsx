import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import UseAuth from './helper/UseAuth/UseAuth';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}>
      <Route path="user-details" element={<UserDetailsPage  />} />
      </Route>
      <Route path="/" element={
        <UseAuth>
          <HomePage />
        </UseAuth>
      } />
      <Route path="/home" element={
        <UseAuth>
          <HomePage />
        </UseAuth>
      } />
      <Route path="/settings" element={
          <h1>Settings</h1>
      } />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;