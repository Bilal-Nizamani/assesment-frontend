"use client";
import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAuthToken } from "@/utils/handleCookies";
import { redirect } from "next/navigation";

const Profile = () => {
  const token = getAuthToken();
  console.log(token);
  if (!token) redirect("/login");
  return (
    <div>
      <Navbar />
      Profile
      <Footer />
    </div>
  );
};

export default Profile;
