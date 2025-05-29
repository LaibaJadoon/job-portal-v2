'use client'; // Required to use hooks like useEffect in Next.js components

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router hook
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
import { setCurrentUserEmail as setBookmarksUserEmail } from '@/redux/slices/bookmarksSlice';
import { setCurrentUserEmail as setAppliedJobsUserEmail } from '@/redux/slices/appliedJobsSlice';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Redirects to dashboard if already logged in (same as React V1)
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Get all registered users from localStorage
  const getUsers = () => {
    const usersData = localStorage.getItem('jobPortalUsers');
    return usersData ? JSON.parse(usersData) : [];
  };

  // Save updated user list to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('jobPortalUsers', JSON.stringify(users));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    // Password check (same as V1)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.');
      return;
    }

    const users = getUsers();
    const existingUser = users.find(user => user.email === normalizedEmail);
    if (existingUser) {
      setError('Account already exists. Please log in instead.');
      return;
    }

    // Create and store new user
    const newUser = { name, email: normalizedEmail, password };
    users.push(newUser);
    saveUsers(users);

    // Save session info to localStorage (same as V1)
    localStorage.setItem('currentUserEmail', normalizedEmail);
    localStorage.setItem('isAuthenticated', 'true');
    setError('');

    // Update Redux state
    dispatch(login(newUser));
    dispatch(setBookmarksUserEmail(normalizedEmail));
    dispatch(setAppliedJobsUserEmail(normalizedEmail));

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#030342] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebebf2]"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
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
            <label className="block text-white mb-1">Password</label>
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
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-300 text-center mt-4">{error}</p>}
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-300 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}