import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Retrieve email from location state

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=cpassword]");

    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(credentials.password)) {
      alert(
        "Invalid password. Must be at least 6 characters long, contain an uppercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/account/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: credentials.password,
        }),
      });

      const parsedData = await response.json();

      if (parsedData.success) {
        localStorage.setItem("taskToken", parsedData.authToken);
        props.setToken(true);
        alert("Password changed successfully!");
        navigate("/");
      } else {
        alert("Internal server error!");
        setCredentials({
          password: "",
          cpassword: "",
        });
      }
    } catch (error) {
      console.error("Password reset failed:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Reset Your Password
        </h2>
        <div className="flex flex-col items-center mb-6">
          <span className="text-3xl text-blue-600 mb-2">
            <i className="fa-solid fa-user"></i>
          </span>
          <span className="text-gray-700 dark:text-gray-200">{email}</span>
          <span className="text-gray-500 dark:text-gray-400">
            Skywrite User
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              value={credentials.password}
              minLength={6}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="cpassword"
              name="cpassword"
              onChange={handleOnChange}
              placeholder="Confirm Password"
              value={credentials.cpassword}
              minLength={6}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
