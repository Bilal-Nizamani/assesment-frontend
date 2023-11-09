import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Clear the existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to trigger the search after a delay
    const newTimeout = setTimeout(() => {
      onSearch(newSearchTerm);
    }, 500); // Adjust the delay time as needed (e.g., 500 milliseconds)

    setSearchTimeout(newTimeout);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Trigger the search immediately when "Enter" is pressed
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex w-[50%] justify-center m-auto items-center">
      <input
        type="text"
        placeholder="Search for cards..."
        onKeyDown={handleKeyDown}
        value={searchTerm}
        onChange={handleInputChange}
        className="p-3 border rounded-l-full border-gray-300 flex-1 focus:outline-none focus:border-blue-500 transition-all duration-300"
      />
      <button
        onClick={() => onSearch(searchTerm)}
        className="bg-gray-800 text-white px-2 py-3 rounded-r-full hover:bg-gray-600 focus:outline-none transition-all duration-300"
        type="submit"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
