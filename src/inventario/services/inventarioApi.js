import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'


export const inventarioApi = createApi({
    reducerPath: 'inventarioApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getInventarioAll: builder.query({
            query: (access) => {
                return {
                    url: `/biblioteca/list/categoria_obra/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
 


    })
})


export const {
    useGetInventarioAllQuery

} = inventarioApi
