import React, { useEffect, useState, useContext, createContext } from 'react';
import DetailCharacterInfo from './DetailCharacterInfo';
import {CharacterContext} from "../../App" 

function Cards() {

  const [error, setError] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState("https://swapi.dev/api/people/");
const {filteredCharacters,characters, setCharacters,selectedCharacter, setSelectedCharacter}=useContext( CharacterContext);
  // Fetch characters function
  const fetchedCharacters = (url) => {
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
        console.log(characters)
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setError("Failed to fetch characters. Please try again later.");
      });
  };
  let charactersToDisplay;
  if (filteredCharacters === null) {
    charactersToDisplay = characters; // Case 1: No search performed, show all characters
  } else if (filteredCharacters.length === 0) {
    charactersToDisplay = []; // Case 3: Search performed, no results, show "No characters found"
  } else {
    charactersToDisplay = filteredCharacters; // Case 2: Show filtered characters
  }


  useEffect(() => {
    fetchedCharacters(currentPage);
  }, [currentPage ]);

  const handleShowModal = (character) => {
    setSelectedCharacter(character); 
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null); 
  };


  return (

      <div className="p-2" >
        {/* Characters List */}
        <h2 className="m-2 text-[20px] font-bold">Characters</h2>

        <div className="flex flex-wrap justify-center items-center gap-5">
          {/* Error Message */}
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : charactersToDisplay.length > 0 ? (
            charactersToDisplay.map((character, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 w-[200px] bg-white shadow-md hover:shadow-2xl transition-shadow duration-200 ease-in-out"
              >
                <h3 className="text-lg font-bold">{character.name}</h3>
                <div className="text-end">
                  {/* Pass the specific character to the modal */}
                  <button onClick={() => handleShowModal(character)}>Details</button>
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
     

        <div className="flex gap-3">
          {/* Previous Button */}
          {prevPage && (
            <button onClick={() => setCurrentPage(prevPage)} className="border p-3">
              Previous
            </button>
          )}
          {/* Next Button */}
          {nextPage && (
            <button onClick={() => setCurrentPage(nextPage)} className="border p-3">
              Next
            </button>
          )}
        </div>
      </div>

  );
}

export default Cards;
