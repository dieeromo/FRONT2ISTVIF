import React, { useState } from 'react'
import DashboardPedi from './components/DashboardPedi'
import { useGetPoaDataQuery } from '../services/pediApi'

import TablaSeguimientoPoa from './components/TablaSeguimientoPoa'
import LoadingSpinner from './components/LoadingSpinner'



export default function SeguimientoPoadata() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const [entidadResponsable, SetEntidadResponsable] = useState('')


    const { data: dataPoa, isLoading, isFetching } = useGetPoaDataQuery({ access: user.access, entidadResponsable: entidadResponsable })

    const handleSearch = (e) => {
        SetEntidadResponsable(e.target.value);
    };




    return (
        <DashboardPedi>
            <div className="mb-4 mr-10">
                <input
                    type="text"
                    placeholder="Buscar por reposnable-sigla"
                    className="px-4 py-1 border rounded w-full text-xs"
                    value={entidadResponsable}
                    onChange={handleSearch}
                />
            </div>

            {(isLoading || isFetching) ?
            <LoadingSpinner/>
            :

                <TablaSeguimientoPoa
                dataPoa={dataPoa}
                />
            }


        </DashboardPedi>

    )
}
