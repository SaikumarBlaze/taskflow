import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { FaTasks, FaPlus, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside className="bg-white dark:bg-gray-800 w-64 min-h-screen p-4 transition-colors duration-300 hidden md:block">
        <nav className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Task Manager
            </h2>
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive("/")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FaTasks />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/create-task"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive("/create-task")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FaPlus />
              <span>Create Task</span>
            </Link>
          </div>
        </nav>
        <div className="absolute bottom-4 left-4 space-y-3">
          <button
            onClick={toggleDarkMode}
            className="ml-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 hover:scale-110"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
