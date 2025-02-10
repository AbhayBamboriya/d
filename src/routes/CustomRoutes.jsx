import { Routes ,Route} from "react-router-dom"
import Pokedex from "../components/Pokedex/Pokedex"
import PokemonDetails from "../components/PokemonDetails/PokemonDetails"
import PokemonIndividual from "../components/PokemonIndividual"
import Types from "../components/Types/Types"

    function CustomRoutes(){
        return(
            <Routes>
                <Route path="/" element={<Pokedex/>}/>
                <Route path={`/pokemon/:id`} element={<PokemonDetails/>}/>
                <Route path={`/pokemonName/:name`} element={<PokemonIndividual/>}/>
                <Route path="/types" element={<Types/>}/>
            </Routes>
        )
    }
    export default CustomRoutes