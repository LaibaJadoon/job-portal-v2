import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserEmail: '', // tracks current user for applied jobs data
};

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  reducers: {
    setCurrentUserEmail: (state, action) => {
      state.currentUserEmail = action.payload; // update current user email
    },
  },
});

export const { setCurrentUserEmail } = appliedJobsSlice.actions;
export default appliedJobsSlice.reducer;
