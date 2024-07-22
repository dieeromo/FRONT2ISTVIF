import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'


export const inventarioApi = createApi({
    reducerPath: 'inventarioApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getTipoAsset: builder.query({
            query: (access) => {
                return {
                    url: `/inventario/list_tipo/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getEstadoAsset: builder.query({
            query: (access) => {
                return {
                    url: `/inventario/list_estado/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getUbicacionAsset: builder.query({
            query: (access) => {
                return {
                    url: `/inventario/list_ubicacion/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////

        createAsset: builder.mutation({
            query: (parametros) => {

                return {
                    //url: `/inventario/register_inventario/`,
                    url: `/inventario/ist/inventario/`,
                    method: 'POST',
                    body: {
                        //'cod_unico': parametros[1],
                        'cod_senescyt': parametros[2],
                        'cod_instituto': parametros[3],
                        'tipo': parametros[4],
                        'descripcion': parametros[5],
                        'materiales': parametros[6],
                        'marca': parametros[7],
                        'modelo': parametros[8],
                        'serie': parametros[9],
                        'color': parametros[10],

                        'estado': parseInt(parametros[11]),
                        'ubicacion': parseInt(parametros[12]),
                        'asignado': parseInt(parametros[13]),
                        'digitador': parseInt(parametros[14]),
                        'observacion': parametros[15],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getAssets'],

        }),
        /////
        getInventarioTodo: builder.query({
            query: (access) => {
                return {
                    url: `/inventario/ist/inventario/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getAssets']
        }),

        ////
        deleteAsset: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/inventario/ist/inventario/${parametros[1]}`,
                    method: 'DELETE',

                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getAssets'],

        }),
        /////
        getInventarioID: builder.query({
            query: ({access,inventarioID}) => {
                return {
                    url: `/inventario/ist/inventario/${inventarioID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getInventarioID']
        }),

        ////
        putInventario: builder.mutation({
            query: ({ access, inventarioID, rest }) => {
                return {
                    url: `/inventario/ist/inventario/${inventarioID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getAssets', 'getInventarioID']

        }),
        ///////
    })
})


export const {
    useGetTipoAssetQuery,
    useGetEstadoAssetQuery,
    useGetUbicacionAssetQuery,
    useCreateAssetMutation,
    useGetInventarioTodoQuery,
    useDeleteAssetMutation,
    useGetInventarioIDQuery,
    usePutInventarioMutation,

} = inventarioApi
