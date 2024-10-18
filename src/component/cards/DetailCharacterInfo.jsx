import React from 'react';

function DetailCharacterInfo({ character, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 " style={{ backdropFilter: 'blur(1px)' }}></div>

      {/* Modal content */}
      <div className="relative border border-black w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] h-auto max-h-[90%] bg-white rounded-[10px] p-6 z-50">
        
        <h2 className="text-2xl mb-4">Detailed information about  <span className="text-2xl font-bold"> {character.name}</span></h2>
        
        {/* Using CSS Grid to align labels and values */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xl">
          <p className="font-bold">Height:</p>
          <p>{character.height}</p>
          <p className="font-bold">Mass:</p>
          <p>{character.mass}</p>
          <p className="font-bold">Hair color:</p>
          <p>{character.hair_color}</p>
          <p className="font-bold">Skin color:</p>
          <p>{character.skin_color}</p>
          <p className="font-bold">Birth year:</p>
          <p>{character.birth_year}</p>
          <p className="font-bold">Gender:</p>
          <p>{character.gender}</p>

          

                

          
        </div>

        <button onClick={closeModal} className="border p-2 mt-4 rounded ">Close</button>
      </div>
    </div>
  );
}

export default DetailCharacterInfo;

