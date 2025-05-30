import './globals.css';
import { Providers } from '@/redux/provider'; // Wrap app with Redux store
import AuthInitializer from '@/components/AuthInitializer'; // Sync auth state from localStorage on client

export const metadata = {
  title: 'Job Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 
          Next.js V2 RootLayout wraps entire app with Redux Providers.
          AuthInitializer restores Redux auth state from localStorage on client-side.
        */}
        <Providers>
          <AuthInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
