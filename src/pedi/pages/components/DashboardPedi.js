import Navbar_dashboard from '../../../pages/components/Navbar_dashboard'

const DashboardPedi = ({children}) => {



    return (
        <div>
            <Navbar_dashboard />
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="bg-gray-800 text-white w-30 flex-shrink-0">
                    <div className="p-3">
                        <h1 className=" font-bold"><a href='/pedi/pedidata'>PEDI </a></h1>
                    </div>
                    <ul>
                      
                   
                        {/* <li className="p-4 hover:bg-gray-700 cursor-pointer  text-sm"><a href="/pedi/registro2" >Registro PEDI</a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/pedi/pedidata" >Pedi data</a></li> */}
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/pedi/poadata" >Poa data</a></li>
                        <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/pedi/poadata/seguimiento" >Seg. Poa data</a></li>

                        
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
export default DashboardPedi