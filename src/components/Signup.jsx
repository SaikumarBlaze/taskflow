import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

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
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const parsedData = await response.json();

      if (parsedData.success) {
        localStorage.setItem("taskToken", parsedData.authToken);
        props.setToken(true);
        localStorage.setItem("taskUserName", credentials.name);
        localStorage.setItem("taskUserEmail", credentials.email);
        alert("Account created successfully!");
        navigate("/");
      } else {
        if (parsedData.message === "Email already exists!") {
          alert("Account already exists!");
        } else {
          alert("Internal server error!");
        }

        setCredentials({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <i className="fa-solid fa-file-lines text-4xl text-blue-600"></i>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
            Sign Up
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
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              name="name"
              onChange={handleOnChange}
              placeholder="Name"
              value={credentials.name}
              autoComplete="name"
              minLength={3}
              required
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6 text-center">
          <div className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
