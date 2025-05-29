'use client'; // Enables client-side rendering

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // App Router's navigation hook

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get auth state from Redux

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.replace('/login'); // Use replace to prevent back navigation
    }
  }, [isAuthenticated, router]);

  // Prevent flashing by showing nothing if not authenticated
  if (!isAuthenticated) return null;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-green-800">Job Portal V2 Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to the Job Portal V2 home page.</p>
      <div className="mt-4 text-blue-700">
        <p>Logged in as: {user?.email}</p> {/* Show user email */}
      </div>
    </main>
  );
}
