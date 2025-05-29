import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // user logged-in status
  user: null, // user info
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true; // set logged in
      state.user = action.payload;  // save user data
    },
    logout: (state) => {
      state.isAuthenticated = false; // clear login status
      state.user = null; // clear user data
      // clear localStorage only in browser environment
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('isAuthenticated');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
