import axios from "axios";
import { useEffect, useState } from "react";

// Custom hooks     
function usePokemonList(){
    // type argument will tell if we quering about the type or not
    const [pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon?limit=20',
        nextUrl:'',
        prevUrl:'',
        type:''
    })

    async function downloadPokemons(){
        // setIsLoading(true)
      
        // iteratiing over the array of pokemons and using their url to create array of promises
        // that will download that  20 pokemons
      
            setPokemonListState((state)=>({...state,isLoading:true}))

            // const response=await axios.get(pokedexUrl) //download the list of 20 pokemon
            const response=await axios.get(pokemonListState.pokedexUrl)
            const pokemonResults=response.data.results  //get the arraay of pokemons from result
    
            // setPrevUrl(response.data.previous)
            // setNextUrl(response.data.next)
            setPokemonListState((state)=>({
                ...state,
                prevUrl:response.data.previous,
                nextUrl:response.data.next
            }))
            const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url))

            //passing that array to axios.all
            // console.log('pokemon result promise',pokemonResultPromise);
            const pokemonData=await axios.all(pokemonResultPromise) //array of 20 pokemon detailed data
        
        
            

            // iterating on the data of each pokemon and extrat the information
            const res=pokemonData.map((pokedata)=>{
                const pokemon=pokedata.data
                // console.log('pokemon details',pokemon);
                return  {name:pokemon.name,
                    id:pokemon.id,
                    image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                    types:pokemon.types
                }
            })
            // console.log(res);
            // setPokemonlist(res)
            // setIsLoading(false)

            setPokemonListState((state)=>({
                ...state,
                pokemonList:res,
                isLoading:false
            }))
        

        // setPokemon({
        //     name:response.data.name,
        //     image:response.data.sprites.other.dream_world.front_default,
        //     weight:response.data.weight,
        //     height:response.data.height,
        //     types:response.data.types.map((t)=>t.type.name)
        // })
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl])
    console.log('debugging',pokemonListState);

     return {pokemonListState,setPokemonListState}
}



export default usePokemonList;