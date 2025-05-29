import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import appliedJobsReducer from './slices/appliedJobsSlice';

// Setting up Redux store (same as React V1)
export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarksReducer,
    appliedJobs: appliedJobsReducer,
  },
});