'use client'; // Enables client-side features like hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Wait until auth is hydrated from localStorage before redirecting
    if (!isHydrated) return;

    // In React V1, routing was handled using React Router.
    // In Next.js V2, we use useRouter from 'next/navigation' for client-side redirects.
    if (isAuthenticated) {
      router.replace('/dashboard'); // redirect to dashboard if logged in
    } else {
      router.replace('/login'); // redirect to login if not logged in
    }
  }, [isAuthenticated, isHydrated, router]);

  return null; // No UI on root route, only redirect logic
}
