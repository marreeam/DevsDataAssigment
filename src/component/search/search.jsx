import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa"; 
import { CharacterContext } from "../../context/CharacterProvider";

function Search() {
  const [searchInput, setSearchInput] = useState("");

  const { setFilteredCharacters,Allcharacters,SetIsSearching} = useContext(CharacterContext); 

  function search() {
    //if nothing is in input, it should not display anything, trim function checks if it is empty
    const trimmedInput = searchInput.trim();

    if (!trimmedInput) {
  // If the input is empty, it set's the searching boolean to false, and the characters are displayed
      SetIsSearching(false); 
      setFilteredCharacters([]); 
      return;
    }
    
    SetIsSearching(true)
    //filter characters by input value
    const filtered = Allcharacters.filter(character =>
      character.name.toLowerCase().includes(searchInput.toLowerCase()) 

    );
    if (filtered.length > 0) {
      setFilteredCharacters(filtered); 
    } else {
      setFilteredCharacters([]); 
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Find desired characters"
        className="w-full pl-4 pr-10 py-2 m-3 border rounded-[10px] focus:outline-none focus:ring-1 focus:ring-gray-400"
        onChange={(event) => setSearchInput(event.target.value)} 
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            search(); 
          }
        }}
      />
      <FaSearch
        onClick={search} 
        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black"
        size={20}
      />
    </div>
  );
}

export default Search;

