import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const usuariosApi = createApi({
    reducerPath: 'usuariosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({
        ////////
        getUsuarios: builder.query({
            query: (parametros) => {
                return {
                    url: `/account/list_usuarios/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                    transformResponse: (response) => {
                        return response.map((usuarios) => ({
                            value: usuarios.id,
                            label: 'eee'
                        }))
                    }
                }
            },
        }),

        ////////
        getUsuariosDocentes: builder.query({
            query: (access) => {
                return {
                    url: `/account/list_docentes/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),


    })
})

export const {
    useGetUsuariosQuery,
    useGetUsuariosDocentesQuery
} = usuariosApi
