import { Link, useNavigate, useParams } from "react-router-dom";
import usePokemonName from "../hooks/usePokemonName";
import { useEffect, useState } from "react";
import PokemonType from "./Types/PokemonType";
function PokemonIndividual(){
    const {name}=useParams()
    const [pokemon]= usePokemonName(name)
    const [showComponent, setShowComponent] = useState({
        check:false,
        type:''
    });
    function handle(t){
        console.log('res',showComponent.check ? false : true);
         console.log('called',showComponent);
         {console.log('before',showComponent.check,t)}
         setShowComponent({
            ...showComponent,
            check:(showComponent.check ? false : true),
            type:(t ? t :'')
         });
         {console.log('aferr',showComponent);}


        
    }
    useEffect(()=>{
        showComponent.check=false
    })
    const scrollToTop = () => {
        console.log('scroll');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    const navigate=useNavigate()
    return(
        <div className="pokemon-details-wrapper">
            <div className="pokemon-name" ><span>{pokemon.name}</span></div>
           { pokemon?.image ? <img className="image pokemon-name" src={pokemon.image} width={400} height={400}/> : ''}
            <div className="pokemon-name">Height:{pokemon.height}</div>
            <div className="pokemon-name">Weight:{pokemon.weight}</div>
            <div className="pokemon-types">
                {pokemon.types && pokemon.types.map((t) => 
                // {console.log()}
                <button key={t} onClick={()=>handle(t)}>{t}</button>
            
            )}
            </div>
            <br/>   
              {showComponent.check && <PokemonType pokemonType={showComponent.type} />} 
            {!showComponent.check &&
            
                pokemon.similarPokemonName  && 
                <div className="other">
                    <div className="message">More {pokemon.types[0]} type pokemons</div>
                 <ul>
                 {  pokemon.similarPokemonName.map((p) =><li key={p.p.pokemon.name}>
                        <Link to={`/pokemonName/${p.p.pokemon.name}`} onClick={scrollToTop}>{p.p.pokemon.name}</Link>
                     
                    </li>)}
                 </ul>
                    
                </div>
            }

           
        </div>
    )
}
export default PokemonIndividual