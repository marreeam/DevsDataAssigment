import React from "react";
import Search from "./component/search/search";
import Cards from "./component/cards/cards";
import { CharacterProvider } from "./context/CharacterProvider";


function App() {
 
  return (
    <CharacterProvider>



    <div>
    <h1 className="text-[40px] md:text-[50px] lg:text-[60px] m-5 text-center"  style={{ fontFamily: 'Orbitron, sans-serif' }}>Galaxy Explorer</h1>
    <div className="flex justify-center"><Search /></div>
    <Cards/>
    
    </div>
    </CharacterProvider>
  );
}

export default App;
