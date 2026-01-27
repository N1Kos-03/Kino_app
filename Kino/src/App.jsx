import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider, UserContext } from './context/user.context.jsx';
import { useContext } from 'react';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Movie, { movieLoader } from './pages/Movie/Movie.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

function AppContent() {
  const { userName, logout } = useContext(UserContext);

  return (
    <>
      <Header user={userName} onLogout={logout} />
      <main style={{ padding: '20px' }}>
        <Routes>
  <Route path="/login" element={<Login />} />

  <Route
    path="/"
    element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    }
  />

  <Route
    path="/movie/:id"
    element={
      <PrivateRoute>
        <Movie />
      </PrivateRoute>
    }
  />

  <Route
    path="/favorites"
    element={
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    }
  />
</Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}
  
export default App;