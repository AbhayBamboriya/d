import { Link, useNavigate } from "react-router-dom"
import Pokedex from "./components/Pokedex/Pokedex"
import CustomRoutes from "./routes/CustomRoutes"
import './App.css'




function App(){
  const navigate=useNavigate()
  // MyComponent()
  return(
    <div className="root">
        <div className="heading">
          <h1 id="pokedex-heading">
            <Link to='/'>
              Pokedex
            </Link>
          </h1> 
          <CustomRoutes/>
        </div>
    </div>
  )
}
export default App