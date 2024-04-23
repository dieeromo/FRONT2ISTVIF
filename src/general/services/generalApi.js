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
        postBolsaEmpleo: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/general/be/bolsaEmpleo/`,
                    method: 'POST',
                    body: {
                        'digitador': parametros[1],
                        'institutcion': parametros[2],
                        'descripcion': parametros[3],
                        'fecha_limite': parametros[4],
                        'url': parametros[5],
                        'telefono': parametros[6],
                        'email': parametros[7],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getBolsaEmpleo']
        }),
        //
        getBolsaEmpleo_all: builder.query({
            query: (access) => {
                return {
                    url: `/general/be/bolsaEmpleo/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },

            providesTags: ['getBolsaEmpleo']
        }),
        //
        getBolsaEmpleo_all_public: builder.query({
            query: () => {
                return {
                    url: `/general/be/lista/public/`,
                    method: 'GET',
                    //headers: { Authorization: `JWT ${access}` },
                }
            },

        }),




    })
})


export const {
    useGetCarreraQuery,
    useGetCoordinacionesQuery,
    useGetOtrasComisionesQuery,
    //bolsa
    usePostBolsaEmpleoMutation,
    useGetBolsaEmpleo_allQuery,
    useGetBolsaEmpleo_all_publicQuery

} = generalApi
