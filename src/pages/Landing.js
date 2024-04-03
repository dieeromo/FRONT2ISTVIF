import React, { useState } from 'react'
import Navbar_dashboard from './components/Navbar_dashboard'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useGetUserQuery} from '../services/authDatosApi'
import { setUserDatos } from '../features/authDatosSlice'

import { useDispatch } from 'react-redux'

const Landing = () => {
 



  



    
    return (
        <div>
             <Navbar_dashboard/>
            
            landing
            
        </div>
    )
}
export default Landing