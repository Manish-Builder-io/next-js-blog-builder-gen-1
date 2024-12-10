import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">Builder Blog</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/builder-demo" className="text-gray-600 hover:text-gray-900">
            Trends
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
              🔍
            </span>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
