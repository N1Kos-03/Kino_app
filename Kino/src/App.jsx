import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Movie from './pages/Movie/Movie.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { loadUser, logout } from './store/user.slice';
import { setFavorites } from './store/favorites.slice';

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.userName);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

   useEffect(() => {
    if (userName) {
      const data = localStorage.getItem(`favorites_${userName}`);
      dispatch(setFavorites(data ? JSON.parse(data) : []));
    }
  }, [userName]);

  return (
    <>
      <Header user={userName} onLogout={() => dispatch(logout())} />

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

export default App;
