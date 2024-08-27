// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSun } from 'react-icons/fi';
import ThemeToggler from '../theme/ThemeToggler';

const Navbar = () => {
  const [showThemeToggler, setShowThemeToggler] = useState(false);

  const handleThemeIconClick = () => {
    setShowThemeToggler((prev) => !prev);
  };

  return (
    <header className="body-font shadow-md border-b border-gray-300 relative">
      <div className="container mx-auto flex flex-wrap p-4 items-center justify-between">
        <a className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-base p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <Link
                  to="/"
                >
                 <span className="ml-3 text-xl text-base">Elixr</span>
          </Link>
        </a>
        <nav className="flex flex-wrap items-center text-base">
          <Link to="/" className="mr-5 text-base hover:text-gray-700">Home</Link>
          <Link to="/blogs" className="mr-5 text-base hover:text-gray-700">Blogs</Link>
          <Link to="/chat" className="mr-5 text-base hover:text-gray-700">Chat</Link>
        </nav>
        <div className="flex items-center">
          <button
            className="p-2 rounded-full relative"
            onClick={handleThemeIconClick}
          >
            <FiSun className="text-xl text-base" />
          </button>
          {showThemeToggler && (
            <div className="absolute top-full right-0 mt-2">
              <ThemeToggler />
            </div>
          )}
          <Link to="/login" className="ml-4 text-base hover:text-gray-700">Login</Link>
          <Link to="/register" className="ml-4 text-base hover:text-gray-700">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
