// Navbar.js

"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { removeAuthToken, getAuthToken } from "@/utils/handleCookies";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const router = useRouter();
  const token = getAuthToken();

  useEffect(() => {
    setShouldRender(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    removeAuthToken();
    router.refresh();
  };

  if (!shouldRender) return null; // Render nothing on the server side

  return (
    <nav className="bg-gray-800 text-gray-300 tracking-wider p-4 px-10">
      <div className=" mx-auto max-w-[1263px] flex justify-between items-center">
        <div className=" text-2xl font-bold cursor-pointer">
          <Link href="/">LOGO</Link>
        </div>
        <div className="hidden sm:flex  items-center space-x-4">
          <Link href="/">
            <div className=" hover:text-green-600 ">HOME</div>
          </Link>
          <Link href="/profile">
            <div className=" hover:text-green-600 ">PROFILE</div>
          </Link>

          {token ? (
            <div
              className="block cursor-pointer text-black p-2 rounded-full bg-gray-300 hover:bg-green-600 hover:text-gray-300"
              onClick={handleLogout}
            >
              Logout
            </div>
          ) : (
            <>
              <Link href="/login">
                <div className=" hover:text-green-600 ">LOGIN</div>
              </Link>
              <Link href="/sign-up">
                <div className=" hover:text-green-600 ">SIGN-UP</div>
              </Link>
            </>
          )}
        </div>
        <div className="sm:hidden flex">
          <div
            className="block cursor-pointer mr-5 text-black p-2 rounded-full bg-gray-300 hover:bg-green-600 hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </div>
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
                  className="block  hover:text-green-600 mb-2"
                  onClick={toggleMobileMenu}
                >
                  ABOUT
                </div>
              </Link>
              <Link href="/profile">
                <div
                  className="block  hover:text-green-600 mb-2"
                  onClick={toggleMobileMenu}
                >
                  PROFILE
                </div>
              </Link>
              <Link href="/login">
                <div className="block  hover:text-green-600 mb-2">LOGIN</div>
              </Link>
              <Link href="/sign-up">
                <div className="block  hover:text-green-600 mb-2">SIGN-UP</div>
              </Link>

              <Link href="/">
                <div
                  className="block  hover:text-green-600"
                  onClick={toggleMobileMenu}
                >
                  HOME
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
