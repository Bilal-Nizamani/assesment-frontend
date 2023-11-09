"use client";
import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";
import axios from "axios";

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);
  const counter = useRef(0);

  useEffect(() => {
    if (isMounted.current === true && page === 1) return;

    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/cards?page=${page}`
        );
        setCards((prevCards) => [...prevCards, ...response.data]);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Error fetching cards. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    counter.current++;

    isMounted.current = true;
    fetchCards();
  }, [page]);
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <SearchBar />
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {cards.length > 0 &&
            cards.map((cardData) => (
              <Card key={cardData.id} cardData={cardData} />
            ))}
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      {hasMore && !loading && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-300"
        >
          Load More
        </button>
      )}
    </>
  );
};

export default HomePage;
