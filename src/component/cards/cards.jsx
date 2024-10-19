import React, { useEffect, useState, useContext } from 'react';
import DetailCharacterInfo from './DetailCharacterInfo';
import { CharacterContext } from "../../App";


function Cards() {
  const [error, setError] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const [currentPage, setCurrentPage] = useState("https://swapi.dev/api/people/");
  
  const { filteredCharacters, characters, setCharacters, selectedCharacter, setSelectedCharacter, setAllCharacters,isSearching} = useContext(CharacterContext);
  //fetch all characters, so we will able to search 
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
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters. Please try again later.");
      });
  };
  

  // Fetch characters for the current page
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

  const charactersToDisplay = isSearching ? filteredCharacters : characters;
// useEffect for controlling current pages
  useEffect(() => {
    setCharacters([]); 
    fetchedCurrentPageCharacters(currentPage); 
  }, [currentPage]);
//useEffect for fetching all data
  useEffect(() => {
    setAllCharacters([]); 
    fetchedAllCharacters("https://swapi.dev/api/people/"); 
  }, []);
//we pass the character that was pressed to modal 
  const handleShowModal = (character) => {
    setSelectedCharacter(character); 
  };
//since selected character is null no characters detailed information will display
  const handleCloseModal = () => {
    setSelectedCharacter(null); 
  };

  return (

    <div className="p-2 gap-3 flex flex-col">
      <h2 className="m-2 text-[20px] font-bold">Characters</h2>

      <div className=" gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : charactersToDisplay.length > 0 ? (
          charactersToDisplay.map((character, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 sm:p-5 lg:p-6 w-full sm:w-auto bg-white shadow-md hover:shadow-2xl transition-shadow duration-200 ease-in-out"
            >
              <h3 className="text-lg sm:text-xl lg:text-1xl font-bold">{character.name}</h3>
              <div className="text-end">
                <button className="text-sm sm:text-base lg:text-lg" onClick={() => handleShowModal(character)}>Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>
  
      {selectedCharacter && (
        <DetailCharacterInfo character={selectedCharacter} closeModal={handleCloseModal} />
      )}

      <div className="flex gap-5 justify-center ">
        {prevPage && (
          <button onClick={() => setCurrentPage(prevPage)} className="bg-black hover:bg-slate-600 text-white  border p-2 rounded-lg hover:shadow-2xl transition-shadow duration-200 ease-in-out">
            Previous
          </button>
        )}
        {nextPage && (
          <button onClick={() => setCurrentPage(nextPage)} className="bg-black hover:bg-slate-600 text-white border p-2 rounded-lg hover:shadow-2xl transition-shadow duration-200 ease-in-out">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;
