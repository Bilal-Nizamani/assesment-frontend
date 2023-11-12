// components/Footer.js

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white p-8">
      <div className=" mx-auto flex max-w-[1263px] m-auto  flex-col md:flex-row justify-around items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Explore</h2>
          <ul className="flex items-center justify-center gap-x-8">
            <li>
              <Link href="/profile">
                <span className="hover:text-gray-500">Cards</span>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <lispan className="hover:text-gray-500">Profile</lispan>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span className="hover:text-gray-500">Home</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-500">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
