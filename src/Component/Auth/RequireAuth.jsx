import { useSelector } from 'react-redux'
import { useLocation , Navigate , Outlet} from 'react-router-dom'
function RequireAuth({ allowedRoles }){
    // use selector is used to take out data from state
    const { isLoggedIn, role} = useSelector((state)=>state.auth)
    const location = useLocation()

    return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
        <Outlet/>
    ) : isLoggedIn ? ( <Navigate to="/denied" />) : (<Navigate to="/login"/>)
}
export default RequireAuth