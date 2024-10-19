import { useState, useEffect } from 'react';

export const useFetchCurrentPageCharacters = (currentPage) => {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [error, setError] = useState(null);

  const fetchedCurrentPageCharacters = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters. Please try again later.");
      });
  };

  useEffect(() => {
    setCharacters([]);
    fetchedCurrentPageCharacters(currentPage);
  }, [currentPage]);

  return { characters, nextPage, prevPage, error };
};
