import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (userName) => {
  if (!userName) return [];
  const data = localStorage.getItem(`favorites_${userName}`);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (userName, items) => {
  localStorage.setItem(`favorites_${userName}`, JSON.stringify(items));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: []
  },
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
    },

  toggleFavorite(state, action) {
  const movie = action.payload;

  const normalized = {
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    rank: movie.rank
  };

  const exists = state.items.find(m => m.id === normalized.id);

  if (exists) {
    state.items = state.items.filter(m => m.id !== normalized.id);
  } else {
    state.items.push(normalized);
  }
},

    saveFavorites(state, action) {
      const userName = action.payload;
      saveToStorage(userName, state.items);
    }
  }
});

export const { toggleFavorite, saveFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
