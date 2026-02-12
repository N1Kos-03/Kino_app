import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites.slice';
import userReducer from './user.slice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer
  }
});
