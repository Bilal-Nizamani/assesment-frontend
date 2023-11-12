"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { removeAuthToken, getAuthToken } from "@/utils/handleCookies";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const token = getAuthToken();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleLogout = () => {
    removeAuthToken();
    router.refresh();
  };

  return (
    <nav className="bg-gray-800 p-4 px-10">
      <div className=" mx-auto max-w-[1263px] flex justify-between items-center">
        <div className="text-white text-2xl font-bold cursor-pointer">
          <Link href="/">Logo</Link>
        </div>
        <div className="hidden sm:flex  items-center space-x-4">
          <Link href="/profile">
            <div className="text-white hover:text-gray-500">Profile</div>
          </Link>
          <Link href="/">
            <div className="text-white hover:text-gray-500">Home</div>
          </Link>

          {token ? (
            <div
              className="block cursor-pointer text-black p-2 rounded-full bg-white hover:text-red-500"
              onClick={handleLogout}
            >
              Logout
            </div>
          ) : (
            <>
              <Link href="/login">
                <div className="text-white hover:text-gray-500">Login</div>
              </Link>
              <Link href="/sign-up">
                <div className="text-white hover:text-gray-500">Sign-Up</div>
              </Link>
            </>
          )}
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {mobileMenuOpen && (
            <div className="absolute w-72 text-center top-16 right-4 bg-gray-800 p-4 ">
              <Link href="/about">
                <div
                  className="block text-white hover:text-gray-500 mb-2"
                  onClick={toggleMobileMenu}
                >
                  About
                </div>
              </Link>
              <Link href="/profile">
                <div
                  className="block text-white hover:text-gray-500 mb-2"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </div>
              </Link>
              <Link href="/login">
                <div className="block text-white hover:text-gray-500 mb-2">
                  Login
                </div>
              </Link>
              <Link href="/sign-up">
                <div className="block text-white hover:text-gray-500 mb-2">
                  Sign-Up
                </div>
              </Link>

              <Link href="/">
                <div
                  className="block text-white hover:text-gray-500"
                  onClick={toggleMobileMenu}
                >
                  Home
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
