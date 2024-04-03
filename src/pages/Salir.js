import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import Navbar_dashboard from './components/Navbar_dashboard'



export default function Salir() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <Navbar_dashboard />
            <button onClick={logoutHandler}> Salir</button>

        </>
    )
} 