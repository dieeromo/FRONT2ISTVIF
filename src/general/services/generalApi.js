import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const generalApi = createApi({
    reducerPath: 'generalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),

    endpoints: (builder) => ({
        ////////

        ////////
        getCarrera: builder.query({
            query: (access) => {
                return {
                    url: `/general/coordinaciones_carrera/list/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                    
                }
            },
  
        }),
        //////
        getCoordinaciones: builder.query({
            query: (access) => {
                return {
                    url: `/general/coordinaciones_institucionales/list/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                    
                }
            },
         
        }),
        ////
        getOtrasComisiones: builder.query({
            query: (access) => {
                return {
                    url: `/general/otras_comisiones/list/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            
        }),
        /////


    })
})


export const { 
    useGetCarreraQuery,
    useGetCoordinacionesQuery,
    useGetOtrasComisionesQuery,
} = generalApi
