import React from 'react'
import Navbar_dashboard from './comp/Navbar'

import {useGetUserQuery} from '../services/authDatosApi'
import { setUserDatos } from '../features/authDatosSlice'
import { useAppDispatch } from '../app/hooks'
const Dashboard = () => {
 

    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    //console.log(user)

    const {data, isError,isLoading} = useGetUserQuery(user.access)
    console.log(data)
    if (isLoading == false && isError ==false){
        
       dispatch(setUserDatos({email:data.email, first_name:data.first_nam, last_name:data.last_name}))
    }
 
  
    const userDatos1 = JSON.parse(localStorage.getItem('userDatos') || "{}")
    console.log(userDatos1)




    

    return (
        <div>
            <Navbar_dashboard/>
            Dashboard


        </div>
    )
}
export default Dashboard