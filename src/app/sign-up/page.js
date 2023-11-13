"use client";
import axios from "axios";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useRouter, redirect } from "next/navigation";
import { getAuthToken } from "@/utils/handleCookies";
const register = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/register", data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      // Successful registration
      return response;
    }
  } catch (err) {
    // Network error or other issues
    console.log(err);
    return null; // or handle it accordingly
  }
};

const SignUp = () => {
  const router = useRouter();
  const token = getAuthToken();
  if (token) redirect("/");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false); // Corrected variable name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const registerUser = async () => {
    setLoading(true); // Corrected variable name

    const { username, email, password } = formData;
    // Trim spaces from username
    const trimmedUsername = username.trim();
    // Chck username length
    if (trimmedUsername.length < 5) {
      setErr("Username must be at least 5 characters long.");
      setLoading(false);
      return;
    }
    // Check for spaces in username
    if (trimmedUsername.includes(" ")) {
      setErr("Username cannot contain spaces.");
      setLoading(false);
      return;
    }
    // Validate Gmail address
    const isGmail = /[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    if (!isGmail) {
      setErr("Please enter a valid Gmail address.");
      setLoading(false);
      return;
    }

    // Check password length
    if (password.length < 8) {
      setErr("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    // Perform registration logic (e.g., make an API request)
    try {
      const apiResponse = await register({
        username: trimmedUsername,
        email,
        password,
      });
      if (!apiResponse.data.success) {
        setErr(apiResponse.data.error);
        return;
      }
      setFormData({
        username: "",
        email: "",
        password: "",
        showPassword: false,
      });
      router.push("./login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-8 rounded-md text-wide tracking-wide text-gray-300 ">
        <h1 className="text-4xl text-center text-green-700 pb-4  tracking-widest font-bold">
          SIGN UP
        </h1>
        <div className="text-red-700 min-h-8 text-center pb-2 text-lg">
          {err}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username" className="block text-sm font-medium ">
            Username (at least 5 characters):
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 border rounded-md border-green-700 focus:outline-none  focus:border-green-500   w-full bg-gray-700 text-white"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.username}
            autoComplete="username"
          />

          <label htmlFor="email" className="block mt-4 text-sm font-medium ">
            Email (Gmail only):
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="mt-1 p-2 border border-green-700 focus:outline-none focus:border-green-500  rounded-md w-full bg-gray-700 text-white"
            pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
            required
            onChange={handleChange}
            autoComplete="email"
          />
          <small className="text-gray-500">
            Only Gmail addresses are allowed.
          </small>

          <label htmlFor="password" className="block mt-4 text-sm font-medium ">
            Password (at least 8 characters):
          </label>
          <input
            type={formData.showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="mt-1 p-2 border border-green-700 focus:outline-none  focus:border-green-500  rounded-md w-full bg-gray-700 text-white"
            minLength="8"
            value={formData.password}
            required
            onChange={handleChange}
            autoComplete="current-password"
          />

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              onChange={handleCheckboxChange}
              checked={formData.showPassword}
              value={formData.password}
            />
            <label htmlFor="showPassword" className="text-sm ">
              Show Password
            </label>
          </div>

          {loading ? (
            <div className="mt-4 p-3  text-center w-full bg-gray-400 text-white rounded-md">
              Checking register credential
            </div>
          ) : (
            <button
              type="button"
              className="mt-6 p-3 w-full bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-300"
              onClick={registerUser}
            >
              Register
            </button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
