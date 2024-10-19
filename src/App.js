import React,{createContext, useContext,useState} from "react";
import Search from "./component/search/search";
import Cards from "./component/cards/cards";

export const CharacterContext = createContext();
function App() {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [Allcharacters, setAllCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null); 
  const [isSearching,SetIsSearching ] = useState(false);
  
  return (
    <CharacterContext.Provider value={{filteredCharacters, setFilteredCharacters,characters, setCharacters,selectedCharacter, setSelectedCharacter,Allcharacters, setAllCharacters,isSearching,SetIsSearching } }>



    <div  >
      <h1 className="text-[50px] m-5">Galaxy Explorer</h1>

      <Search  />
      <Cards/>
    
    </div>
    </CharacterContext.Provider>
  );
}

export default App;
