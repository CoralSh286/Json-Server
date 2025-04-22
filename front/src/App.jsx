import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import UseAuth from './helper/UseAuth/UseAuth';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';
import WelcomeBack from './pages/WelcomeBack/WelcomeBack';
import InfoPage from './pages/InfoPage/InfoPage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import PostsPage from './pages/PostsPage/PostsPage';
import TodosPage from './pages/TodosPage/TodosPage';
import { PopupProvider } from './helper/UsePopUp/usePopUp';

function App() {
  return (
    <PopupProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}>
        <Route path="user-details" element={<UserDetailsPage />} />
      </Route>
      <Route path="/home" element={<HomePage />}>
        <Route path="" element={<WelcomeBack />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="info" element={<InfoPage />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </PopupProvider>
  );
}

export default App;