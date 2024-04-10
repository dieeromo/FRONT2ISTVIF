import React, { useState } from 'react'

import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'

import FormRegistroObras from '../components/FormRegistroObras'
import { useLocation } from 'react-router-dom';



const RegistroObras = () => {

    const location = useLocation();
    const { data } = location.state;
  


    return (
        <DashboardBibliotecaAdmin>
                        
                <FormRegistroObras autores={data}/>


        </DashboardBibliotecaAdmin>

    

    )
}
export default RegistroObras