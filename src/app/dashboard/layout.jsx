import { redirect } from 'next/navigation';
import { headers } from 'next/headers'; //  Use headers instead of cookies
import React from 'react';

export default function DashboardLayout({ children }) {
  //  SSR-safe way to check cookie
  const headersList = headers();
  const cookieHeader = headersList.get('cookie') || '';

  // Detect if authenticated
  const isAuthenticated = cookieHeader.includes('isAuthenticated=true');

  //  Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
}