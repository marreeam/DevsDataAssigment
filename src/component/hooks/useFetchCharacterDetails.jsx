import  { useState } from 'react';

export const useFetchCharacterDetails=()=> {
  const [characterData, setCharacterData] = useState({
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    homeworld: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setCharacterData((prev) => ({
        ...prev,
        [key]: [...prev[key], data.title || data.name], 
      }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

const HandleShowData = async (lists) => {
    setLoading(true);
    const [films, species, starships, vehicles, homeworld] = lists;

    for (const filmUrl of films) {
      await fetchData(filmUrl, 'films');
    }

    for (const speciesUrl of species) {
      await fetchData(speciesUrl, 'species');
    }

    for (const starshipUrl of starships) {
      await fetchData(starshipUrl, 'starships');
    }

    for (const vehicleUrl of vehicles) {
      await fetchData(vehicleUrl, 'vehicles');
    }

    if (homeworld) {
      await fetchData(homeworld, 'homeworld');
    }

    setLoading(false);

  };
  return{HandleShowData,characterData,loading}
}