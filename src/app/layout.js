import './globals.css';
import { Providers } from '@/redux/provider'; // Wraps app with Redux store
import AuthInitializer from '@/components/AuthInitializer'; // Syncs auth state from localStorage

export const metadata = {
  title: 'Job Portal', // Used by Next.js for <title> in HTML head
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* In React V1, Redux provider was added in app.jsx.
            In Next.js V2, we wrap all children here inside layout.js */}
        <Providers>
          {/* This runs once on app load to restore auth state */}
          <AuthInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}