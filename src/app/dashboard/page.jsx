'use client'; // Required for useRouter, useEffect, Redux hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import Header from '@/components/Header';
import Home from '@/components/Home';
// import AboutUs from '@/components/AboutUs';
// import HowToApply from '@/components/HowToApply';
// import Categories from '@/components/Categories';
// import ContactUs from '@/components/ContactUs';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    //  Client-side redirect fallback (extra protection)
    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="relative">
      <Header />
      <main className="pt-[80px]">
        <section id="home">
          <Home />
        </section>
        {/* <AboutUs />
        <HowToApply />
        <Categories />
        <ContactUs /> */}
      </main>
    </div>
  );
}