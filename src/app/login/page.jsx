'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'; // Proper client-side cookie management
import { login } from '@/redux/slices/authSlice';
import { setCurrentUserEmail as setBookmarksUserEmail } from '@/redux/slices/bookmarksSlice';
import { setCurrentUserEmail as setAppliedJobsUserEmail } from '@/redux/slices/appliedJobsSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, isHydrated } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Prevent UI flash during hydration or redirecting
  if (!isHydrated || isAuthenticated) {
    return null;
  }

  // Get users list from localStorage
  const getUsers = () => {
    const usersData = localStorage.getItem('jobPortalUsers');
    return usersData ? JSON.parse(usersData) : [];
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const savedUser = users.find(user => user.email === normalizedEmail);

    if (!savedUser) {
      setError("You don't have an account, create one first.");
      return;
    }

    if (password === savedUser.password) {
      setError('');
      dispatch(login(savedUser));
      dispatch(setBookmarksUserEmail(normalizedEmail));
      dispatch(setAppliedJobsUserEmail(normalizedEmail));

      // Set cookies using js-cookie for SSR detection
      Cookies.set('isAuthenticated', 'true', { expires: 7, path: '/' });
      Cookies.set('currentUserEmail', normalizedEmail, { expires: 7, path: '/' });

      // Also persist in localStorage for client persistence
      localStorage.setItem('currentUserEmail', normalizedEmail);
      localStorage.setItem('isAuthenticated', 'true');

      // Redirect to dashboard
      router.replace('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-[#030342] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#ebebf2] mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#ebebf2] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebebf2]"
              required
            />
          </div>
          <div>
            <label className="block text-[#ebebf2] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ebebf2]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ebebf2] hover:bg-[#dcdcec] text-black font-bold py-2 px-4 rounded-lg transition"
          >
            Log In
          </button>
        </form>
        {error && <p className="text-red-300 text-center mt-4">{error}</p>}
        <p className="text-center text-sm text-[#ebebf2] mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-300 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
