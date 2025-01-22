import React from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useParams } from 'react-router-dom';
import {useGetDependenciaIDhistorialQuery} from '../services/organigramaApi'
export default function DependenciaDetalle() {
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data, isLoading, isFetching } = useGetDependenciaIDhistorialQuery({ access: user.access, id:id })
    console.log(data)
  return (
   <>
   <Navbar_dashboard/>
   Detalle dependencia
   </>
  )
}
