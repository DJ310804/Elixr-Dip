// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import ThemeToggler from "../theme/ThemeToggler";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [showThemeToggler, setShowThemeToggler] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setLoginStatus } = useAuthContext(); // Access AuthContext
  const navigate = useNavigate(); // Navigation hook

  const handleThemeIconClick = () => {
    setShowThemeToggler((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear session and logout
    sessionStorage.removeItem("accessToken"); // Remove access token
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear refresh token cookie
    setIsLoggedIn(false); // Update auth context
    setLoginStatus("Login"); // Reset login status
    navigate("/"); // Redirect to home
  };

  return (
    <header className="body-font shadow-md border-b border-gray-300 relative">
      <div className="container mx-auto flex flex-wrap p-4 items-center justify-between">
        <div className="flex items-center">
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
          <Link to="/">
            <span className="ml-3 text-xl text-base">Elixr</span>
          </Link>
        </div>
        <nav className="flex flex-wrap items-center text-base">
          <Link to="/home" className="mr-5 text-base hover:text-gray-700">
            Home
          </Link>
          <Link to="/blogs" className="mr-5 text-base hover:text-gray-700">
            Blogs
          </Link>
          <Link to="/chat" className="mr-5 text-base hover:text-gray-700">
            Chat
          </Link>
          <Link to="/connection" className="mr-5 text-base hover:text-gray-700">
            Connect
          </Link>
          <Link to="/addBlog" className="mr-5 text-base hover:text-gray-700">
            New Blog
          </Link>
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
          {isLoggedIn ? (
            <button
              className="ml-4 text-base hover:text-gray-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="ml-4 text-base hover:text-gray-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
