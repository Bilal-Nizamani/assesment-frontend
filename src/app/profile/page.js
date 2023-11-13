"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAuthToken } from "@/utils/handleCookies";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";

const getUserData = async (token, userId) => {
  try {
    const response = await axios.get("http://localhost:5000/user-data", {
      params: { userId: userId },
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const MyProfile = () => {
  const token = getAuthToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!token) redirect("/login");

  useEffect(() => {
    const token = getAuthToken();
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const response = await getUserData(token, userId);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error (e.g., show an error message to the user)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        // Show a loading indicator while data is being fetched
        <div className="h-[100vh] w-full">Loading...</div>
      ) : user ? (
        // Render the Profile component if user data is available
        <Profile user={user} />
      ) : (
        // Handle the case where user data is not available
        <div>User data not found</div>
      )}
      <Footer />
    </div>
  );
};

export default MyProfile;
