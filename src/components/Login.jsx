import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const parsedData = await response.json();
      if (parsedData.success) {
        localStorage.setItem("taskToken", parsedData.authToken);
        props.setToken(true);
        localStorage.setItem("taskUserName", parsedData.name);
        localStorage.setItem("taskUserEmail", credentials.email);

        alert("Successfully logged in!");
        navigate("/");
      } else {
        alert("Invalid Credentials");
        setCredentials({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("danger", "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <i className="fa-solid fa-file-lines text-4xl text-blue-600"></i>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
            Sign In
          </h2>
        </div>

        {props.alert && (
          <p
            className={`mb-4 text-sm ${
              props.alert.type === "danger" ? "text-red-500" : "text-green-500"
            }`}
          >
            {props.alert.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              name="email"
              onChange={handleOnChange}
              placeholder="Email"
              value={credentials.email}
              autoComplete="email"
              required
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>

        <div className="my-6 text-center">
          <div className="text-gray-600 dark:text-gray-400">
            <button
              onClick={() => navigate("/account/verify-email")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Forgotten Password?
            </button>
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
