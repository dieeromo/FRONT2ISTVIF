import { useDispatch } from "react-redux"
import { logout } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"



export default function Navbar_dashboard() {
  // traer el estado
  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="border p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            {userDatos.id ?
              <a href="/dashboard" className="flex items-center text-white font-bold text-xl">
                <img src="https://institutovicentefierro.edu.ec/wp-content/uploads/2024/01/cropped-Sin-titulo-1.png"
                  alt="Logo"
                  className="w-30 h-10" />
              </a>
              :
              <a href="/landing" className="flex items-center text-white font-bold text-xl">
                <img src="https://institutovicentefierro.edu.ec/wp-content/uploads/2024/01/cropped-Sin-titulo-1.png"
                  alt="Logo"
                  className="w-30 h-10" />
              </a>
            }

          </div>
          {/* Links de la navegación */}
          <div className="hidden md:block">
            <ul className="flex space-x-4">
            <li><a href="/pedi/poa2" className=" hover:text-gray-300">PEI</a></li>
              <li><a href="/general/admin/landing/servicios" className=" hover:text-gray-300">Servicios</a></li>
              <li><a href="/acreditacion/landing" className=" hover:text-gray-300">Acreditación</a></li>
              <li><a href="/biblioteca/seleccion/autores" className=" hover:text-gray-300">Gestión Biblioteca</a></li>
              <li><a href="/inventario/landing" className="hover:text-gray-300">Gestión Inventario</a></li>
              <li><a href="https://institutovicentefierro.edu.ec/" target="_blank" className=" hover:text-gray-300">Acerca de</a></li>
              {userDatos.first_name ?
                < >
                  <li><a href="#" className=" text-white pl-2 pr-2 py-1 bg-gray-800 rounded hover:text-gray-300">{userDatos.first_name} </a></li>
                  <li><a href="/salir" className=" hover:text-gray-300">Salir </a></li>
                </>
                :
                <li><a href="/auth" className=" text-white pl-2 pr-2 py-1 bg-gray-800 rounded hover:text-gray-300">Login </a></li>

              }

            </ul>
          </div>
        </div>
      </div>
    </nav>

  )
} 