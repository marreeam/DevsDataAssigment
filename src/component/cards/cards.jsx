import React, { useState, useContext } from 'react';
import DetailCharacterInfo from './DetailCharacterInfo';
import { CharacterContext } from "../../App";
import { useFetchAllCharacters } from '../hooks/useAllCharacterFetch'
import { useFetchCurrentPageCharacters } from '../hooks/useFetchCurrentPageCharacters';

function Cards() {
  const [currentPage, setCurrentPage] = useState("https://swapi.dev/api/people/");
  const { filteredCharacters, selectedCharacter, setSelectedCharacter, isSearching, setAllCharacters } = useContext(CharacterContext);
//we pass useFetchCurrentPageCharacters a current page and take the variables we need
  const { characters, nextPage, prevPage, error: currentPageError } = useFetchCurrentPageCharacters(currentPage);
  const { error: allCharactersError } = useFetchAllCharacters(setAllCharacters);
  //this checks if we have filter
  const charactersToDisplay = isSearching ? filteredCharacters : characters;

  const handleShowModal = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="p-2 gap-3 flex flex-col">
      <h2 className="m-2 text-[20px] font-bold">Characters</h2>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {(currentPageError || allCharactersError) ? (
          <p className="text-red-500">{currentPageError || allCharactersError}</p>
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
        {/* if we select character it should display modal */}
      {selectedCharacter && (
        <DetailCharacterInfo character={selectedCharacter} closeModal={handleCloseModal} />
      )}
      {/* this checks if we have next page or prev  avaliable  */}
      <div className="flex gap-5 justify-center ">
        {prevPage && (
          <button onClick={() => setCurrentPage(prevPage)} className="bg-black hover:bg-slate-600 text-white border p-2 rounded-lg hover:shadow-2xl transition-shadow duration-200 ease-in-out">
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
