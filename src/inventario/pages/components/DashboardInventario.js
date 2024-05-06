import React from 'react'
import Navbar_dashboard from '../../../pages/components/Navbar_dashboard'

export default function DashboardInventario({children}) {
  return (
    <div>
    <Navbar_dashboard />
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-30 flex-shrink-0">
            <div className="p-3">
                <h1 className=" font-bold"><a href='/acreditacion/landing'>Inventario </a></h1>
                <h1 className=" font-bold"><a href='/acreditacion/landing'>ISTVIF </a></h1>
            </div>
            <ul>
                <li className="p-4 hover:bg-gray-700 cursor-pointer  text-sm"><a href="/inventario/register" >Registro</a></li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer text-sm"><a href="/inventario/list" >Todo</a></li>
        
                
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
