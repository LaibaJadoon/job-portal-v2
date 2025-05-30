import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignupLayout({ children }) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated');

  console.log('SignupLayout isAuthenticated:', isAuthenticated?.value);

  // If user is logged in (cookie present and true), redirect to dashboard
  if (isAuthenticated?.value === 'true') {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
