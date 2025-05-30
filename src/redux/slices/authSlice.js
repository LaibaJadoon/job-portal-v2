// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // user logged-in status
  user: null,             // user info
  isHydrated: false,      // true once localStorage has been synced
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;  // set logged in
      state.user = action.payload;   // save user data
    },
    logout: (state) => {
      state.isAuthenticated = false; // clear login status
      state.user = null;             // clear user data

      // Clear browser storage and cookie
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('isAuthenticated');
        document.cookie = "isAuthenticated=false; path=/; max-age=0";
      }
    },
    setHydrated: (state, action) => {
      state.isHydrated = action.payload; // set hydration status
    },
  },
});

export const { login, logout, setHydrated } = authSlice.actions;
export default authSlice.reducer;
