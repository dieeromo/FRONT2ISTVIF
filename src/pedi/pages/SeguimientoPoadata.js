import React, { useState } from 'react'
import DashboardPedi from './components/DashboardPedi'
import { useGetPoaDataQuery } from '../services/pediApi'
import Select from "react-select"
import TablaSeguimientoPoa from './components/TablaSeguimientoPoa'
import LoadingSpinner from './components/LoadingSpinner'



export default function SeguimientoPoadata() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const [entidadResponsable, SetEntidadResponsable] = useState('')


    const [anio, SetAnio] = useState(2024)

    const handleSearch = (e) => {
        SetEntidadResponsable(e.target.value);
    };
    const anios_poa = [
        { value: 2024, label: '2024' },
        { value: 2025, label: '2025' },
    ];


    const handleAnio = (selectedOption) => {
        SetAnio(selectedOption.value);
    };

    const { data: dataPoa, isLoading, isFetching } = useGetPoaDataQuery({ access: user.access, entidadResponsable: entidadResponsable, anio: anio })


    return (
        <DashboardPedi>
            <div className='grid grid-cols-2'>
                <div className="mb-4 mr-10">
                    <input
                        type="text"
                        placeholder="Buscar por reposnable-sigla"
                        className="px-4 py-1 border rounded w-full text-xs"
                        value={entidadResponsable}
                        onChange={handleSearch}
                    />
                </div>

                <div className="mb-4 mr-10">

                    <Select
                        options={anios_poa}
                        onChange={handleAnio}
                        defaultValue={{ value: 2024, label: '2024' }}
                        className='shadow-md'
                    />
                </div>

            </div>




            {(isLoading || isFetching) ?
                <LoadingSpinner />
                :

                <TablaSeguimientoPoa
                    dataPoa={dataPoa}
                />
            }


        </DashboardPedi>

    )
}
