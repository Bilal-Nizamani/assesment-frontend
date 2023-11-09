"use client";
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Trigger the search with the current search term
    onSearch(searchTerm);
  };

  return (
    <div className="flex w-[50%] justify-center m-auto  items-center ">
      <input
        type="text"
        placeholder="Search for cards..."
        value={searchTerm}
        onChange={handleInputChange}
        className="p-3 border rounded-l-full border-gray-300  flex-1 focus:outline-none focus:border-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500  text-white px-2 py-3 rounded-r-full hover:bg-green-600 focus:outline-none transition-all duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
