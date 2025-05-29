'use client'; // Enables client-side features like hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Next.js App Router navigation hook
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // In React V1, routing was handled using React Router.
    // In Next.js V2, we use useRouter from 'next/navigation' for client-side redirects.
    if (isAuthenticated) {
      router.replace('/dashboard'); // Redirect to dashboard if logged in
    } else {
      router.replace('/login'); // Redirect to login if not logged in
    }
  }, [isAuthenticated, router]);

  return null; // No UI on root route, only redirect logic
}