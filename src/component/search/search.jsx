import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa"; // fa for Font Awesome
import { CharacterContext } from "../../App";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { characters, setFilteredCharacters ,setCharacters} = useContext(CharacterContext); // Use only the required values

  function search() {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchInput.toLowerCase()) // Filter case-insensitively
    );

    if (filtered.length > 0) {
      setFilteredCharacters(filtered); // Update filtered characters state
    } else {
      console.log("Character not found.");
      setFilteredCharacters([]); 

    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Find desired characters"
        className="w-full pl-4 pr-10 py-2 m-3 border rounded-[10px] focus:outline-none focus:ring-1 focus:ring-gray-400"
        onChange={(event) => setSearchInput(event.target.value)} // Update search input
      />
      <FaSearch
        onClick={search} // Trigger search on icon click
        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black"
        size={20}
      />
    </div>
  );
}

export default Search;

