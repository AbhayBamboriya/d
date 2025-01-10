import { useState } from "react"
import PokemonList from "../Pokemonlist/PokemonList"
import Search from "../Search/Search"
// CSS
import './Pokedex.css'
import PokemonDetails from "../PokemonDetails/PokemonDetails"
import { useNavigate } from "react-router-dom"
function Pokedex(){
    const navigate=useNavigate()
    const [searchTerm,setSearchTerm]=useState('')
  
    return (    
        <div className="pokedex-wrapper">  
            
            <div className="search ">
            <Search updateSearchTerm={setSearchTerm} placeholder={'Enter Name of Pokemon'} className="input"/>
            <button onClick={()=>navigate('/types')} className="btn"><span>Search By Type</span></button>
            </div>
            {/* {searchTerm} */}
            {/* whenever the key in pokemonDeetails changs then rerendering will take place
                so for rerendering only key prop is used */}
                {/* console.log(searchTerm); */}
            {!searchTerm?<PokemonList/>:<PokemonDetails key={searchTerm} pokemonName={searchTerm} 
            />}
        </div>
    )
}
export default Pokedex