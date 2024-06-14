import Navbar_dashboard from '../../../pages/components/Navbar_dashboard'

const DashboardPea = ({children}) => {



    return (
        <div>
            <Navbar_dashboard />
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="bg-gray-800 text-white w-30 flex-shrink-0">
                    <div className="p-3">
                        <h1 className=" font-bold"><a href='/acreditacion/landing'>PEA </a></h1>
                    </div>
                    <ul>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer  text-sm"><a href="/pea/generalidades" >Generalidades</a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer  text-sm"><a href="/pea/asignatura" >Asignatura</a></li>
                   
                        <li className="p-4 hover:bg-gray-700 cursor-pointer  text-sm"><a href="/pea/curso" >Cursos</a></li>
                        
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/pedi/poa2" >POA</a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/pedi/seguimiento/poa" >Seg. POA</a></li>

                        
                        {/* Agrega más elementos de menú según sea necesario */}
                    </ul>
                </div>
                {/* Main Content */}
                <div className="flex-1">
                    <div className="p-4">
                        
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardPea