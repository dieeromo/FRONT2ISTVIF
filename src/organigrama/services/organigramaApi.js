import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const organigramaApi = createApi({
    reducerPath: 'evaluacionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////

        ////////
        ////////
        getDependencias: builder.query({
            query: ({ access, id}) => {
                let url1=`/general/be/dependencias/`
                if (id) url1 += `${id}/`
                return {
                    url: url1,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getDependencias']

        }),
        ////////
        getTipoDependencias: builder.query({
            query: ({ access}) => {
                return {
                    url: `/general/be/tipo_dependencias`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getTipoDependencias']

        }),
        ////
        getDependenciaIDhistorial: builder.query({
            query: ({ access, id}) => {
                return {
                    url: `/general/be/historial_dependencia/${id}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getDependenciaIDhistorial']

        }),
       ////////
       postDependencia: builder.mutation({
        query: ({ access, rest }) => {

            return {
                url: '/general/be/dependencias/',
                method: 'POST',
                body: rest,
                headers: { Authorization: `JWT ${access}` },
            }
        },
        invalidatesTags: ['getDependencias']
    }),
    ////////

    putDependencia: builder.mutation({
        query: ({ access, id, rest }) => {
            return {
                url: `/general/be/dependencias/${id}/`,
                method: 'PUT',
                headers: { Authorization: `JWT ${access}` },
                body: rest,
            }
        },
        invalidatesTags: ['getDependencias']

    }),


        ////


    })

})



export const {
    useGetDependenciasQuery,
    usePostDependenciaMutation,
    useGetTipoDependenciasQuery,
    useGetDependenciaIDhistorialQuery,
    usePutDependenciaMutation,


} = organigramaApi