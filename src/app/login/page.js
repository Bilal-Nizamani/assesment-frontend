"use client";
import axios from "axios";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { setAuthToken } from "../../utils/handleCookies";
import { getAuthToken } from "../../utils/handleCookies";
import { useRouter } from "next/navigation";
const loginHandler = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      // Successful login
      return response;
    }
  } catch (err) {
    // Network error or other issues
    console.log(err);
    return null; // or handle it accordingly
  }
};

const Login = () => {
  const router = useRouter();
  const token = getAuthToken();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false); // Corrected variable name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };
  const loginUser = async () => {
    try {
      setLoading(true);
      const { username, password } = formData;
      // Trim spaces from username
      const trimmedUsername = username.trim();
      // Chck username length
      if (trimmedUsername.length < 5) {
        setError("Username must be at least 5 characters long.");
        setLoading(false);
        return;
      }
      // Check for spaces in username
      if (trimmedUsername.includes(" ")) {
        setError("Username cannot contain spaces.");
        setLoading(false);
        return;
      }
      // Check password length
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        setLoading(false);
        return;
      }

      // Perform registration logic (e.g., make an API request)
      let apiResponse = await loginHandler({ username, password });

      if (!apiResponse.data.success) {
        setError(apiResponse.data.error);
        setLoading(false);
        return;
      }
      setAuthToken(apiResponse.data.token, apiResponse.data.expiresIn);

      localStorage.setItem("username", apiResponse.data.user.username);
      localStorage.setItem("userId", apiResponse.data.user._id);
      localStorage.setItem("email", apiResponse.data.user.email);

      setFormData({ username: "", password: "", showPassword: false });
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (token) router.push("/");

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto  p-8 rounded-md tracking-wide  text-gray-300 ">
        <h1 className="text-4xl text-center text-green-700 pb-4  tracking-widest font-bold">
          LOGIN
        </h1>
        <div className="text-red-700 min-h-8 text-center pb-2 text-lg">
          {error}
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
          <label
            htmlFor="password"
            className="block  mt-4 text-sm font-medium "
          >
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
              Checking login credential
            </div>
          ) : (
            <button
              type="sbumit"
              className="mt-6 p-3 w-full bg-gray-700 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-300"
              onClick={loginUser}
            >
              Submit
            </button>
          )}
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Login;
