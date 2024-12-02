import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${host}/api/auth/account/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const parsedData = await response.json();

      if (parsedData.success) {
        localStorage.setItem("taskUserName", parsedData.name);
        localStorage.setItem("taskUserEmail", email);
        alert("Email Verified Successfully!");
        navigate("/account/reset-password", { state: { email } });
      } else {
        alert("Email doesn't exist!");
        setEmail("");
      }
    } catch (error) {
      console.error("Verification failed:", error.message);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Find Your Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Please enter your email address to search for your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              name="email"
              onChange={handleOnChange}
              placeholder="Email Address"
              value={email}
              autoComplete="email"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md shadow hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              onClick={() => navigate("/login")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
