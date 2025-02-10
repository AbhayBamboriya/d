import { Routes ,Route} from "react-router-dom"
import Pokedex from "../components/Pokedex/Pokedex"
import PokemonDetails from "../components/PokemonDetails/PokemonDetails"
import PokemonIndividual from "../components/PokemonIndividual"
import Types from "../components/Types/Types"
import PaginationExample from "../components/PaginationExample"

    // import PokemonList from "../components/Pokemonlist/PokemonList"
    function CustomRoutes(){
        return(
            <Routes>
                <Route path="/" element={<Pokedex/>}/>
                
                {/* <Route path={`/pokemon/:id`} element={<PokemonDetails/>}/> */}
                {/* <Route path="/pokemon/:pn" element={<PokemonDetails/>}/> */}
                <Route path={`/pokemonName/:name`} element={<PokemonIndividual/>}/>
                <Route path="/types" element={<Types/>}/>
            </Routes>
        )
    }
    export default CustomRoutes