'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { login } from '@/redux/slices/authSlice';
import { setCurrentUserEmail as setBookmarksUserEmail } from '@/redux/slices/bookmarksSlice';
import { setCurrentUserEmail as setAppliedJobsUserEmail } from '@/redux/slices/appliedJobsSlice';

// Utility functions to interact with localStorage users
const getUsers = () => {
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  return [];
};

const saveUsers = (users) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect to dashboard if already authenticated (from cookie)
  useEffect(() => {
    const isAuthenticated = Cookies.get('isAuthenticated');
    if (isAuthenticated === 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  // Get users list from localStorage
  const getUsers = () => {
    const usersData = localStorage.getItem('jobPortalUsers');
    return usersData ? JSON.parse(usersData) : [];
  };

  // Save updated users list to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('jobPortalUsers', JSON.stringify(users));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Normalize email for case-insensitive comparison
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    // Check if user already exists
    const existingUser = users.find((user) => user.email === normalizedEmail);
    if (existingUser) {
      setError('User already exists. Please login.');
      return;
    }

    // Create and store new user
    const newUser = { name, email: normalizedEmail, password };
    users.push(newUser);
    saveUsers(users);

    // Dispatch login and user-specific data to Redux
    dispatch(login(newUser));
    dispatch(setBookmarksUserEmail(normalizedEmail));
    dispatch(setAppliedJobsUserEmail(normalizedEmail));

    // Store login info in cookies (for SSR checks) and localStorage
    Cookies.set('isAuthenticated', 'true', { expires: 7, path: '/' });
    Cookies.set('currentUserEmail', normalizedEmail, { expires: 7, path: '/' });

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUserEmail', normalizedEmail);

    // Redirect to dashboard
    router.push('/dashboard');
  };


  return (
    <div className="min-h-screen bg-[#030342] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#ebebf2] mb-6 text-center">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[#ebebf2] mb-1">Name</label>
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
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-300 text-center mt-4">{error}</p>}
        <p className="text-center text-sm text-[#ebebf2] mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-300 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
