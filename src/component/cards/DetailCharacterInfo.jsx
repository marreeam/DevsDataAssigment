import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { useFetchCharacterDetails } from '../../hooks/useFetchCharacterDetails';
function DetailCharacterInfo({ character, closeModal }) {
 
  const [isClicked, setIsClicked] = useState(false);
  const {HandleShowData,characterData,loading}= useFetchCharacterDetails()

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(1px)' }}></div>

      {/* Modal content */}
      <div className="relative border border-black w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[90%] bg-white rounded-[10px] p-6 sm:p-8 z-50 shadow-lg overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Detailed Information About {character.name}</h2>
          <FaTimes onClick={closeModal} className="cursor-pointer text-2xl hover:text-red-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-lg">
          <p className="font-bold">Height:</p>
          <p>{character.height}</p>

          <p className="font-bold">Mass:</p>
          <p>{character.mass}</p>

          <p className="font-bold">Hair Color:</p>
          <p>{character.hair_color}</p>

          <p className="font-bold">Skin Color:</p>
          <p>{character.skin_color}</p>

          <p className="font-bold">Birth Year:</p>
          <p>{character.birth_year}</p>

          <p className="font-bold">Gender:</p>
          <p>{character.gender}</p>
        </div>

        {loading ? (
          <p className="text-center mt-4 text-lg">Loading data...</p>
        ) : isClicked ? (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 text-lg">
              <p className="font-bold">Films:</p>
              <p>{characterData.films.length > 0 ? characterData.films.join(", ") : "No films available"}</p>

              <p className="font-bold">Species:</p>
              <p>{characterData.species.length > 0 ? characterData.species.join(", ") : "No species available"}</p>

              <p className="font-bold">Starships:</p>
              <p>{characterData.starships.length > 0 ? characterData.starships.join(", ") : "No starships available"}</p>

              <p className="font-bold">Vehicles:</p>
              <p>{characterData.vehicles.length > 0 ? characterData.vehicles.join(", ") : "No vehicles available"}</p>

              <p className="font-bold">Home World:</p>
              <p>{characterData.homeworld.length > 0 ? characterData.homeworld.join(", ") : "No homeworld available"}</p>
            </div>
          </div>
        ) : null}

        {!isClicked && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                if (!isClicked) {
                  HandleShowData([
                    character.films,
                    character.species,
                    character.starships,
                    character.vehicles,
                    character.homeworld,
                  ]);
                  setIsClicked(true);
                }
              }}
              className="bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailCharacterInfo;


