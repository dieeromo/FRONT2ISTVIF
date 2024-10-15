import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const bibliotecaApi = createApi({
    reducerPath: 'bibliotecaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getCategoriaObra: builder.query({
            query: (access) => {
                return {
                    url: `/biblioteca/list/categoria_obra/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getTipoObra: builder.query({
            query: (access) => {
                return {
                    url: `/biblioteca/list/tipo_obras/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getMaterialObra: builder.query({
            query: (access) => {
                return {
                    url: `/biblioteca/list/tipo_material/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),
        ////////
        getEstadoObra: builder.query({
            query: (access) => {
                return {
                    url: `/biblioteca/list/estado_obra/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),
        ////////

        createObra: builder.mutation({
            query: (parametros) => {

                return {
                    url: `/biblioteca/register/obra/`,
                    method: 'POST',
                    body: {
                        'codigo': parametros[1],
                        'titulo': parametros[2],

                        'editorial': parametros[3],
                        'autor': parametros[4],

                        'anio_publicacion': parametros[5],

                        'tomo': parametros[6],
                        'ubicacion': parametros[7],
                        'categoria': parametros[8],
                        'tipo_obra': parametros[9],
                        'tipo_material': parametros[10],
                        'estado_obra': parametros[11],
                        'observacion': parametros[12],
                        'digitador': parametros[13],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getAutoresObras_all']

        }),

        ////////
        createAutor: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/biblioteca/register/autor/`,
                    method: 'POST',
                    body: {
                        'nombres': parametros[1],
                        'estado': parametros[2],
                        'observacion': parametros[3],
                        'digitador': parametros[4],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getTodosAutores'],
        }),
        /////
        getListAutores: builder.query({
            query: ({access, autor, page, page_size}) => {
                let tempo = `/biblioteca/list/autor/?`
                 if (autor) tempo += `autor=${autor}&`
                return {
                    url: tempo,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getTodosAutores']
        }),
        /////
        putAutoresObras: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/biblioteca/obras/autores/${parametros[1]}/`,
                    method: 'PUT',
                    body: {
                        'nombres': parametros[2],
                        'estado':parametros[3],
                        'observacion': parametros[4],
                        'digitador':parametros[5]
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getTodosAutores']
        }),

        ////////
        ////////
        createObraAutor: builder.mutation({
            query: (parametros) => {
                return {
                    url: '/biblioteca/register/obraautor/',
                    method: 'POST',
                    body: {
                        'autor_id': parametros[1],
                        'obra_id': parametros[2],
                        'digitador': parametros[3],
                        'observacion': parametros[4],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getAutoresObras_all']
        }),
        /////
        getListAutoresObras_todos: builder.query({
            query: (access) => {
                return {
                    url: '/biblioteca/list/obras_autores/todos/',
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getAutoresObras_all']  ///////////////////////
        }),

        ////
        getListAutoresObras_filter: builder.query({
            query: ({access,page, page_size,autor, obra}) => {
                let tempo = `/biblioteca/todas/obras/autores/?`
                if (page) tempo += `page=${page}&`
                if (autor) tempo += `autor=${autor}&`
                if (obra) tempo += `titulo=${obra}&`


                return {
                    url: tempo,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getAutoresObras_all']  ///////////////////////
        }),
        
        ///

        getListAutoresObras_filterAbierto: builder.query({
            query: ({page, page_size,autor, obra}) => {
                let tempo = `/biblioteca/todas/obras/autores/?`
                if (page) tempo += `page=${page}&`
                if (autor) tempo += `autor=${autor}&`
                if (obra) tempo += `titulo=${obra}&`


                return {
                    url: tempo,
                    method: 'GET',
                    
                }
            },
            providesTags: ['getAutoresObras_all']  ///////////////////////
        }),
        /////
        getListFilter_Titulos: builder.query({
            query: (titulo) => {
                return {
                    url: `/biblioteca/filtro/titulo/${titulo}/`,
                    method: 'GET',
                    headers: { Authorization: `` },
                }
            },
        }),
        /////
        getListFilter_Titulos_id: builder.query({
            query: (id) => {
                return {
                    url: `/biblioteca/filtro/titulo/id/${id}/`,
                    method: 'GET',
                    headers: { Authorization: `` },
                }
            },
        }),
        /////
        getListFilter_Autores_idObra: builder.query({
            query: (id) => {
                return {
                    url: `/biblioteca/filtro/autor_por_obra/id/${id}/`,
                    method: 'GET',
                    headers: { Authorization: `` },
                }
            },
        }),
        /////
        deleteObraEntrada: builder.mutation({  // 
            query: ({access, id}) => {
                return {
                    url: `/biblioteca/obras/obras_crud/${id}`,
                    method: 'DELETE',

                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getAutoresObras_all']


        }),
        //
        createUbicacionObra: builder.mutation({
            query: (parametros) => {
                return {
                    url: '/biblioteca/obras/ubicacion/',
                    method: 'POST',
                    body: {
                        'ubicacion': parametros[1],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags:['ubicacionesObras']
        }),
        /////
        getListUbicacionObras: builder.query({
            query: (id) => {
                return {
                    url: `/biblioteca/obras/ubicacion/`,
                    method: 'GET',
                    headers: { Authorization: `` },
                }
            },
            providesTags:['ubicacionesObras']
        }),
        //////
        putUbicacionObras: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/biblioteca/obras/ubicacion/${parametros[1]}/`,
                    method: 'PUT',
                    body: {
                        'ubicacion': parametros[2],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags:['ubicacionesObras']
        }),

        ////
        createCategoriaObra: builder.mutation({
            query: (parametros) => {
                return {
                    url: '/biblioteca/obras/categorias/',
                    method: 'POST',
                    body: {
                        'categoria': parametros[1],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getCategoriaObras_all']
        }),
        /////
        getListCategoriaObras: builder.query({
            query: (id) => {
                return {
                    url: `/biblioteca/obras/categorias/`,
                    method: 'GET',
                    headers: { Authorization: `` },
                }
            },
            providesTags: ['getCategoriaObras_all']  ///////////////////////
        }),
        //////
        putCategoriaObras: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/biblioteca/obras/categorias/${parametros[1]}/`,
                    method: 'PUT',
                    body: {
                        'categoria': parametros[2],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getCategoriaObras_all']
        }),
        ////
        createTipoObra: builder.mutation({
            query: (parametros) => {
                return {
                    url: '/biblioteca/obras/tipo_obras/',
                    method: 'POST',
                    body: {
                        'tipo': parametros[1],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getTipoObras']
        }),
        /////
        getListTipoObras: builder.query({
            query: (id) => {
                return {
                    url: `/biblioteca/obras/tipo_obras/`,
                    method: 'GET',
                    headers: { Authorization: `` },
                }
            },
            providesTags: ['getTipoObras']

        }),
        //////
        //////
        putTipoObras: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/biblioteca/obras/tipo_obras/${parametros[1]}/`,
                    method: 'PUT',
                    body: {
                        'tipo': parametros[2],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['getTipoObras']
        }),



    })
})


export const {
    useGetCategoriaObraQuery,
    useGetTipoObraQuery,
    useGetMaterialObraQuery,
    useGetEstadoObraQuery,
    useCreateObraMutation,

    useCreateAutorMutation,
    useGetListAutoresQuery,
    useGetListAutoresObras_filterQuery,
    useGetListAutoresObras_filterAbiertoQuery,
    useCreateObraAutorMutation,
    useGetListAutoresObras_todosQuery,
    usePutAutoresObrasMutation,

    useGetListFilter_TitulosQuery,
    useGetListFilter_Titulos_idQuery,
    useGetListFilter_Autores_idObraQuery,

    useDeleteObraEntradaMutation,

    useCreateUbicacionObraMutation,
    useGetListUbicacionObrasQuery,
    usePutUbicacionObrasMutation,

    useCreateCategoriaObraMutation,
    useGetListCategoriaObrasQuery,
    usePutCategoriaObrasMutation,


    useCreateTipoObraMutation,
    useGetListTipoObrasQuery,
    usePutTipoObrasMutation,




} = bibliotecaApi
