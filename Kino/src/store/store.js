import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites.slice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});
