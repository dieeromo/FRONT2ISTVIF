import React, { useState } from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import FormRegistroAutores from '../components/FormRegistroAutores'
import TableAutores from '../components/TableAutores'



const AutoresObra = () => {
    //REGISTRO DE AUTORES
    return (
        <DashboardBibliotecaAdmin>
            AUTORES
            <FormRegistroAutores/>
            <TableAutores/>
        </DashboardBibliotecaAdmin>
    )
}
export default AutoresObra