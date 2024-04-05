import React, { useState } from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import FormRegistroAutores from '../components/FormRegistroAutores'



const AutoresObra = () => {
    return (
        <DashboardBibliotecaAdmin>
            AUTORES
            <FormRegistroAutores/>
        </DashboardBibliotecaAdmin>
    )
}
export default AutoresObra