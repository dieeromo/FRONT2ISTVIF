import React from 'react'
import DashboardPedi from './components/DashboardPedi'
import {useGetPediVersionQuery,} from '../services/pediApi'
import Select from 'react-select'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"



export default function RegistroPedi2() {
  const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const [pedi_id, SetPedi_id] = useState('')
    const [pediNombre, SetPediNombre] = useState('')
  
    const { data, isSuccess, isLoading, isError, error } = useGetPediVersionQuery(user.access)

    const handleSubmit = (e) => {
      navigate(`/pedi/registro/objetivos/${pedi_id}`,{state:{data_pedi:{pediNombre:pediNombre}}})
    }

  return (
    <DashboardPedi>
         <h1>Selecione el Plan Estratégico de Desarrollo Institucional</h1>
         <div className="mt-2">
          <Select
            options={data}
            onChange={(selectedOption) => {
              SetPedi_id(selectedOption.value)
              SetPediNombre(selectedOption.label)
 
            }}

            className='text-xs w-1/2'
          />
        </div>
        <button onClick={handleSubmit} className='bg-blue-900 text-white mt-10 p-2 rounded hover:text-gray-300'>Siguiente</button>

    </DashboardPedi>
   
  )
}

