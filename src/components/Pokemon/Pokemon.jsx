import { Link } from 'react-router-dom'
import './Pokemon.css'
import Loader from '../PreLoader/Loader'

function Pokemon({name,image,id}){  
    
    return (
        <div className='pokemon'>
            <Link to={`/pokemonName/${name}`} onClick={<Loader/>}>
                <div className='pokemon-name'> {name}</div>
                <div><img className="pokemon-image" src={image}/></div>
            </Link>
        </div>
    )
}
export default Pokemon