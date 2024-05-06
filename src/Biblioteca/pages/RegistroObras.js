import React, { useState } from 'react'

import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'

import FormRegistroObras from '../components/FormRegistroObras'
import { useLocation } from 'react-router-dom';



const RegistroObras = () => {

    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const location = useLocation();
    const { data } = location.state;
  


    return (
        <DashboardBibliotecaAdmin>
            {userDatos.is_adminBiblioteca ?
                        
                <FormRegistroObras autores={data}/>
                :
                <p className='bg-red-100 w-1/4'>No esta autorizado para hacer registros</p>
            }


        </DashboardBibliotecaAdmin>

    

    )
}
export default RegistroObras