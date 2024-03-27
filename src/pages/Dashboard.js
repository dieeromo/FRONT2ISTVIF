import React from 'react'
import Navbar_dashboard from './comp/Navbar'
import { useEffect } from 'react'

import {useGetUserQuery} from '../services/authDatosApi'
import { setUserDatos } from '../features/authDatosSlice'

import { useDispatch } from 'react-redux'

const Dashboard = () => {
 

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    //console.log(user)

    const {data,isSuccess, isError,isLoading} = useGetUserQuery(user.access)
    
    useEffect(()=>{
        if(isSuccess){
            dispatch(setUserDatos({email:data.email, first_name:data.first_name, last_name:data.last_name}))
        }
    })

    
    return (
        <div>
            <Navbar_dashboard/>
            Dashboard


        </div>
    )
}
export default Dashboard