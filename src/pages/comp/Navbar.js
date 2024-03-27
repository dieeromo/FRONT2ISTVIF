import { UseDispatch, useDispatch } from "react-redux"
import { logout } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"

export default function Navbar_dashboard({email}){
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const logoutHandler = ()=>{
        dispatch(logout())
        navigate('/')
    }

    return(
        <nav>
            Nav bar
            <div>
            {email}

            </div>
            <button onClick={logoutHandler}>
                Salir
            </button>
            

        </nav>
    )
} 