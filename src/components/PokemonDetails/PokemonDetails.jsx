import {Link,  useNavigate,  useParams } from "react-router-dom"
import './PokemonDetails.css'
import usePokemonDetails from "../../hooks/usePokemonDetails";
import PokemonType from "../Types/PokemonType";
import { useEffect, useRef, useState } from "react";
function PokemonDetails({pokemonName}){
    const [showComponent, setShowComponent] = useState({
        check:false,
        type:''
    });
    function handle(t){
         setShowComponent(state=>({
            ...state,
            check:(showComponent.check ? false : true),
            type:t
         }));

        
    }
    const navigate=useNavigate()
    const {id}=useParams()
    const [pokemon]=usePokemonDetails(id,pokemonName);
    console.log('refresh',pokemon);
    const ref=useRef()
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    useEffect(()=>{
        showComponent.check=false
    })
    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-name" ><span>{pokemon.name}</span></div>
            <img className="image pokemon-name" src={pokemon.image}/>
            <div className="pokemon-name">Height:{pokemon.height}</div>
            <div className="pokemon-name">Weight:{pokemon.weight}</div>
            <div className="pokemon-types">
                {pokemon.types && pokemon.types.map((t) => <button key={t} onClick={()=>handle(t)}>{t}</button>)}
                
            </div>
            <br/>  
            {showComponent.check && console.log('output',showComponent)} 
            {showComponent.check && <PokemonType pokemonType={showComponent.type} />} 
            {!showComponent.check &&
            
                pokemon.types && pokemon.similarPokemon && 
                <div className="other">
                    <div className="message">More {pokemon.types[0]} type pokemons</div>
                    <div className="list">
                        <ul>
                            {pokemon.similarPokemon.map((p) =>
                                <li key={p.pokemon.url} >
                                    <Link to={`/pokemonName/${p.pokemon.name}`} onClick={scrollToTop}>{p.pokemon.name}</Link>
                                </li>
                                
                            )}
                            
                        </ul>
                    </div>
                    
                </div>
            }
        </div>
    )
    
} 

export default PokemonDetails