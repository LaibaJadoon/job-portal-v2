'use client'; // Mark this file as a client component (needed for Redux Provider)

import { Provider } from 'react-redux';
import { store } from './store';

// Wrap app with Redux Provider (Next.js uses this in root layout)
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}