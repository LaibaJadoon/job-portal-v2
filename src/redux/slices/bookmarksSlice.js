import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserEmail: '', // email to manage user-specific bookmarks
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setCurrentUserEmail: (state, action) => {
      state.currentUserEmail = action.payload; // set current user email
    },
  },
});

export const { setCurrentUserEmail } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;