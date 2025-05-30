"use client"; // Required for useState, useRouter, etc.

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Redux logout will now also clear cookie
    dispatch(logout());

    // Also redirect to login
    router.push("/");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "How to Apply", id: "how-to-apply" },
    { name: "Categories", id: "categories" },
    { name: "Jobs", path: "/jobs" },
    { name: "Contact Us", id: "contact" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#030342] text-[#ebebf2] py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        {/* Logo scrolls to home section */}
        <img
          src="/logo.png"
          alt="Logo"
          width={56}
          height={56}
          className="cursor-pointer"
          onClick={() => scrollToSection("home")}
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-base">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.name}
                href={item.path}
                className="hover:font-semibold hover:scale-[1.05] transition"
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="hover:font-semibold hover:scale-[1.05] transition"
              >
                {item.name}
              </button>
            )
          )}
        </nav>

        {/* Profile Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-3xl" />
            <span>{user?.name}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link href="/bookmarks" className="block px-4 py-2 hover:bg-gray-100">
                Bookmarks
              </Link>
              <Link href="/applied-jobs" className="block px-4 py-2 hover:bg-gray-100">
                Applied Jobs
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030342] text-[#ebebf2] px-6 py-4 space-y-4 shadow-md">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium hover:text-[#ccc]"
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="block text-left w-full text-base font-medium hover:text-[#ccc]"
              >
                {item.name}
              </button>
            )
          )}
          <hr className="border-[#ebebf2]/30" />
          <div className="space-y-2">
            <p className="font-semibold">{user?.name}</p>
            <Link href="/bookmarks" onClick={() => setMobileMenuOpen(false)} className="block">
              Bookmarks
            </Link>
            <Link href="/applied-jobs" onClick={() => setMobileMenuOpen(false)} className="block">
              Applied Jobs
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block text-left w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
