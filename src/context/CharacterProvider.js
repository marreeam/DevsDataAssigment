import React, { createContext, useState } from "react";
export const CharacterContext = createContext();


export const CharacterProvider = ({ children }) => {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [Allcharacters, setAllCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isSearching, SetIsSearching] = useState(false);

  return (
    <CharacterContext.Provider
      value={{
        filteredCharacters,
        setFilteredCharacters,
        characters,
        setCharacters,
        selectedCharacter,
        setSelectedCharacter,
        Allcharacters,
        setAllCharacters,
        isSearching,
        SetIsSearching,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
