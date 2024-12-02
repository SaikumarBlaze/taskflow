import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FaTasks, FaPlus, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Remove authentication data to log the user out
    localStorage.removeItem("taskToken");
    localStorage.removeItem("taskUserName");
    localStorage.removeItem("taskUserEmail");

    props.setToken(false); // Update the token state to false
    navigate("/login"); // Redirect to login page
    alert("success", "Successfully logged out!");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 fixed top-0 left-0 w-full p-4 shadow-md z-50 transition-colors duration-300 md:hidden">
      <nav className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Task Manager
        </h2>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-sm focus:outline-none"
          >
            Actions
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <li>
                <Link
                  to="/"
                  className={`flex items-center space-x-4 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                    isActive("/")
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <FaTasks />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/create-task"
                  className={`flex items-center space-x-4 px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ${
                    isActive("/create-task")
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <FaPlus />
                  <span>Create Task</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-4 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                  <span>
                    {darkMode ? "Enable Light Mode" : "Enable Dark Mode"}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-4 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
