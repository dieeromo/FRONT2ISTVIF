import React, { useState } from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import FormRegistroAutores from '../components/FormRegistroAutores'
import TableAutores from '../components/TableAutores'



const AutoresObra = () => {
  
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    console.log(userDatos)

    return (
        <DashboardBibliotecaAdmin>
            {userDatos.is_adminBiblioteca ? 
     
            <FormRegistroAutores/>
            :
            <p className='text-xs bg-red-100 w-1/4'>No esta autorizado para realizar registros</p>

        }
            
            <TableAutores/>
        </DashboardBibliotecaAdmin>
    )
}
export default AutoresObra