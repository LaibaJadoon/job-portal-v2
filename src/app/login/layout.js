// Import cookies and redirect helpers
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Make layout async to use cookies()
export default async function LoginLayout({ children }) {
const cookieStore = await cookies();// Get cookie store
  const isAuthenticated = cookieStore.get('isAuthenticated'); // Read auth cookie

  //  If already authenticated, redirect to dashboard
  if (isAuthenticated?.value === 'true') {
    redirect('/dashboard');
  }

  return <>{children}</>; // Render login/signup content
}
