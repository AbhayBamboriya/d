import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';
import Loader from '../PreLoader/Loader';
function PokemonList(){
    const{pokemonListState,setPokemonListState}=usePokemonList(false);    
    console.log('pokemon list',pokemonListState);
    return(
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">{   
                        (pokemonListState.isLoading)?<Loader/> :
                        pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                        }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl==null} onClick={()=> {
                    const urlToSet=pokemonListState.prevUrl
                    setPokemonListState({
                        ...pokemonListState,
                        pokedexUrl:urlToSet
                    })}}> 
                    Previ
                </button>
                <button disabled={pokemonListState.nextUrl==null} onClick={()=> {
                    const urlToSet=pokemonListState.nextUrl
                    setPokemonListState({
                        ...pokemonListState,
                        pokedexUrl:urlToSet
                    })}}>
                    Next
                </button>
            </div> 
           
    </div>
    
    )
}
export default PokemonList