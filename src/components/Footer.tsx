import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand/Logo */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white">FashionBlog</h1>
          </div>

          {/* Navigation Links */}
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white">
                  Categories
                </a>
              </li>
              <li>
                <a href="/trends" className="hover:text-white">
                  Trends
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} FashionBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
