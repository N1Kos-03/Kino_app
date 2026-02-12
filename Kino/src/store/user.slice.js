import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userName: '',
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser(state) {
      const saved = JSON.parse(localStorage.getItem('user'));
      if (saved) {
        state.userId = saved.userId;
        state.userName = saved.userName;
      }
      state.isLoading = false;
    },
    login(state, action) {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.userId = null;
      state.userName = '';
      localStorage.removeItem('user');
    }
  }
});

export const { loadUser, login, logout } = userSlice.actions;
export default userSlice.reducer;
