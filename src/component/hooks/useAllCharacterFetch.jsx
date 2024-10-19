import { useState, useEffect } from 'react';

export const useFetchAllCharacters = (setAllCharacters) => {
  const [error, setError] = useState(null);

  const fetchedAllCharacters = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setAllCharacters((prev) => [...prev, ...data.results]);
        if (data.next) {
          fetchedAllCharacters(data.next);
        }
      })
      .catch((error) => {
        console.error("Error fetching all characters:", error);
        setError("Failed to fetch all characters. Please try again later.");
      });
  };

  useEffect(() => {
    setAllCharacters([]);
    fetchedAllCharacters("https://swapi.dev/api/people/");
  }, [setAllCharacters]);

  return { error };
};
