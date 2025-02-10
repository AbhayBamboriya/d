import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import Preloader from '../PreLoader/PreLoader'
import './Search.css'
import Loader from '../PreLoader/Loader'
function Search({updateSearchTerm,placeholder}){
    const [loading, setLoading] = useState(false);
    const debouncedCallback=useDebounce((e)=>{
        
        updateSearchTerm(e.target.value.toLowerCase())
        setLoading(false);  
    })
    const handleChange = (e) => {
        setLoading(true); 
      
    //    console.log(e.target.value.toLowerCase());
       
        
        debouncedCallback(e);
        // Set loading state when user types
        
    };
    
    return (
        <div className='search-wrapper'>
            <input 
                id='pokemon-name-search'
                type="text"
                placeholder={`${placeholder}`}
                onChange={handleChange}
               
            />
        </div>
    )
}

export default Search