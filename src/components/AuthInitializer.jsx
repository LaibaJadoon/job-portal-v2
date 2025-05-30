// This client component restores auth and user-specific Redux state from localStorage on app load
// It's only needed in Next.js App Router, not used in React V1

'use client'; // Marks this as a client component (needed for useEffect and localStorage)

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
import { setCurrentUserEmail as setBookmarksEmail } from '@/redux/slices/bookmarksSlice';
import { setCurrentUserEmail as setAppliedJobsEmail } from '@/redux/slices/appliedJobsSlice';
import { setHydrated } from '@/redux/slices/authSlice';


export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth state from localStorage
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('currentUserEmail');
    if (isAuth && email) {
      const user = { email };
      dispatch(login(user));
      dispatch(setBookmarksEmail(email));
      dispatch(setAppliedJobsEmail(email));
    }
    dispatch(setHydrated(true));
  }, [dispatch]);

  return null; // No UI, only logic
}